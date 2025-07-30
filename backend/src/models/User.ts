import mongoose, { Schema, Document } from "mongoose";

export interface BillingAddress {
  line1: string;
  line2?: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  username: string;
  name: string;
  email: string;
  password: string;
  photo?: string;
  emailVerified: boolean;
  verificationToken: string | null;
  termsAccepted: boolean;
  role: "user" | "admin";

  // Subscription info
  subscription: {
    plan: "free" | "standard" | "pro";
    status:
      | "active"
      | "trialing"
      | "canceled"
      | "past_due"
      | "unpaid"
      | "incomplete"
      | "incomplete_expired";
    stripeSubscriptionId: string | null;
  };

  stripeCustomerId: string | null;
  billingAddress: BillingAddress;
  phoneNumber?: string;
  language: string;
  hasUsedTrial: boolean;
  newsletterSubscribed: boolean;
  resetPasswordToken: string | null;
  resetPasswordExpires: Date | null;
  sites: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: { type: String, default: "" },
    emailVerified: { type: Boolean, default: false },
    verificationToken: { type: String, default: null },
    termsAccepted: { type: Boolean, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },

    subscription: {
      plan: {
        type: String,
        enum: ["free", "standard", "pro"],
        default: "free",
      },
      status: {
        type: String,
        enum: [
          "active",
          "trialing",
          "canceled",
          "past_due",
          "unpaid",
          "incomplete",
          "incomplete_expired",
        ],
        default: "active",
      },
      stripeSubscriptionId: { type: String, default: null },
    },

    stripeCustomerId: { type: String, default: null },

    billingAddress: {
      line1: { type: String, default: "" },
      line2: { type: String, default: "" },
      city: { type: String, default: "" },
      postalCode: { type: String, default: "" },
      country: { type: String, default: "" },
    },

    phoneNumber: { type: String, default: "" },
    language: { type: String, default: "fr" },
    hasUsedTrial: { type: Boolean, default: false },
    newsletterSubscribed: { type: Boolean, default: false },

    sites: [{ type: Schema.Types.ObjectId, ref: "Site" }],
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", userSchema);
