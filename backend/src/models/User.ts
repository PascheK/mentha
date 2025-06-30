import mongoose, { Schema, Document } from "mongoose";

export interface Subscription {
  plan: "free" | "standard" | "pro";
  maxSites: number;
  status: "active" | "trialing" | "canceled";
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
  subscription: Subscription;
  sites: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true }, // e.g. full name
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
      maxSites: { type: Number, default: 1 },
      status: {
        type: String,
        enum: ["active", "trialing", "canceled"],
        default: "active",
      },
    },
    sites: [{ type: Schema.Types.ObjectId, ref: "Site" }],
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", userSchema);
