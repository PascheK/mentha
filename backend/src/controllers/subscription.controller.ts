import { Request, Response } from "express";
import User from "../models/User";
import { successResponse, errorResponse } from "../utils/apiResponse";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

const PRICE_IDS = {
  standard: "price_1XXX_STANDARD",
  pro: "price_1XXX_PRO",
};

const APP_URL = process.env.NODE_ENV === "production"
  ? process.env.APP_URL || ""
  : process.env.APP_URL_DEV || "http://localhost:3000"


const allowedStatuses = [
  "active",
  "trialing",
  "canceled",
  "past_due",
  "unpaid",
  "incomplete",
  "incomplete_expired",
] as const;

type AllowedStatus = typeof allowedStatuses[number];

const allowedPlans = ["free", "standard", "pro"] as const;
type AllowedPlan = typeof allowedPlans[number];

const sanitizeStatus = (status: string): AllowedStatus => {
  return allowedStatuses.includes(status as AllowedStatus)
    ? (status as AllowedStatus)
    : "incomplete";
};

const sanitizePlan = (nickname: string | null | undefined): AllowedPlan => {
  const normalized = nickname?.toLowerCase();
  return allowedPlans.includes(normalized as AllowedPlan)
    ? (normalized as AllowedPlan)
    : "standard";
};



  export const checkout = async (req: Request, res: Response) => {
  const { plan } = req.body as { plan: 'standard' | 'pro' };

  try {
    if (!['standard', 'pro'].includes(plan)) {
      return res.status(400).json(errorResponse(400, 'Invalid plan selected'));
    }



    try {
  const user = await User.findById((req as any).user.id).select("-password");
       if (!user) {
        return res.status(404).json(errorResponse(404, "User not found"));
      }

      if (!user.stripeCustomerId) {
        const customer = await stripe.customers.create({
          email: user.email,
          name: user.name,
        });
        user.stripeCustomerId = customer.id;
        await user.save();
      }
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        customer: user.stripeCustomerId,
        line_items: [
          {
            price: PRICE_IDS[plan],
            quantity: 1,
          },
        ],
        success_url: `${APP_URL}/dashboard/billing?success=true`,
        cancel_url: `${APP_URL}/dashboard/billing?canceled=true`,

      });
      return res.status(200).json(successResponse(session.url, "Checkout session created"));

    } catch (err) {
      return res.status(400).json(errorResponse(400, "Failed to create Stripe customer", err));
    }
  } catch (err) {
    return res.status(500).json(errorResponse(500, "Failed to create checkout session", err));
  }
};


export const webhookHandler = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"];
  if (!sig) return res.status(400).send("Missing Stripe signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("❌ Invalid Stripe webhook signature", err);
    return res.status(400).send("Webhook Error");
  }

  const log = (...args: any[]) => {
    if (process.env.NODE_ENV !== "production") {
      console.log("[🔔 Stripe Webhook]", ...args);
    }
  };

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );
        const customerId = session.customer as string;

        const user = await User.findOne({ stripeCustomerId: customerId });
        if (!user) return res.status(404).send("User not found");

        user.subscription = {
          plan: sanitizePlan(subscription.items.data[0].price.nickname),
          status: sanitizeStatus(subscription.status),
          stripeSubscriptionId: subscription.id,
        };
        await user.save();

        log("✔️ checkout.session.completed", {
          email: user.email,
          plan: user.subscription.plan,
          status: user.subscription.status,
        });
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;

        const user = await User.findOne({
          "subscription.stripeSubscriptionId": subscription.id,
        });
        if (!user) return res.status(404).send("User not found");

        user.subscription.status = sanitizeStatus(subscription.status);
        user.subscription.plan = sanitizePlan(
          subscription.items.data[0].price.nickname
        );
        await user.save();

        log("🔄 subscription.updated", {
          email: user.email,
          plan: user.subscription.plan,
          status: user.subscription.status,
        });
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        const user = await User.findOne({
          "subscription.stripeSubscriptionId": subscription.id,
        });
        if (!user) return res.status(404).send("User not found");

        user.subscription.status = "canceled";
        user.subscription.plan = "free";
        user.subscription.stripeSubscriptionId = null;
        await user.save();

        log("⛔ subscription.deleted", {
          email: user.email,
        });
        break;
      }

      default:
        log("Unhandled event type:", event.type);
    }

    return res.status(200).send("Webhook received");
  } catch (error) {
    console.error("❌ Webhook internal error:", error);
    return res.status(500).send("Internal server error");
  }
};

export const getCurrentSubscription = async (req: Request, res: Response) => {
  try {
      const user = await User.findById((req as any).user.id).select("subscription email");

    if (!user) {
      return res.status(404).json(errorResponse(404, "User not found"));
    }

    const plan = user.subscription?.plan || "free";
    const status = user.subscription?.status || "active";

    return res.status(200).json(
      successResponse({ plan, status }, "Current subscription retrieved")
    );
  } catch (error) {
    return res
      .status(500)
      .json(errorResponse(500, "Failed to retrieve subscription", error));
  }
};

export const createCustomerPortalSession = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const user = await User.findById(userId);

    if (!user || !user.stripeCustomerId) {
      return res.status(404).json(errorResponse(404, "User or Stripe customer not found"));
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${APP_URL}/dashboard/billing`,
    });

    return res.status(200).json(successResponse(session.url, "Stripe portal session created"));
  } catch (err) {
    console.error("Stripe portal error:", err);
    return res.status(500).json(errorResponse(500, "Failed to create Stripe portal session", err));
  }
};