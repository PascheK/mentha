import mongoose, { Schema, Document } from "mongoose";

export interface Subscription {
  plan: "free" | "standard" | "pro";
  maxSites: number;
  status: "active" | "trialing" | "canceled";
}

export interface IUser extends Document {
  authId: string;           // L’ID provenant de Better Auth
  email: string;
  password: string;
  name: string;
  emailVerified: boolean;
  verificationToken: string | null;
  role: "user" | "admin";
  subscription: Subscription;
  sites: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    authId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    emailVerified: { type: Boolean, default: false },
    verificationToken: { type: String, default: null },
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

