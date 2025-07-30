      import Cookies from "js-cookie";
      import { ApiResponse } from "@/types/api";
      import { Subscription } from "@/types/subscription";
import Stripe from "stripe";

      
  const API_URL = process.env.NODE_ENV === "production"
  ? process.env.NEXT_PUBLIC_API_URL || "https://api.m3ntha.ch"
  : process.env.NEXT_PUBLIC_API_URL_DEV || "http://localhost:5000";


      export const createSubscription = async (payload: {
    stripeSubscriptionId: string;
    userId: string;
    currentPeriodStart: number;
    currentPeriodEnd: number | null;
    status: Stripe.Subscription.Status;
    planId: string;
    interval: Stripe.Price.Recurring.Interval;
      }): Promise<ApiResponse<Subscription>> => {

          const token = Cookies.get("token");
  if (!token)
    return {
      success: false,
      error: { code: 401, message: "No token found" },
    };


        try {

        const res = await fetch(`${API_URL}/api/subscription/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
            const data = await res.json();

       if (!res.ok || !data.success) {
      return {
        success: false,
        error: {
          code: res.status,
          message: data?.error?.message || "Subscription failed",
        },
      };
    }
   return {
      success: true,
      data: data.data,
    };
      } catch (err: unknown) {
    const error = err as Error;
    return {
      success: false,
      error: {
        code: 500,
        message: error.message || "Login exception",
      },
    };
  }
};