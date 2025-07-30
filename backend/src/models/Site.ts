import mongoose, { Schema, Document } from "mongoose";

export interface ISite extends Document {
  name: string;
  slug: string;
  subdomain: string;
  status: "draft" | "published" | "archived";
  ownerId: mongoose.Types.ObjectId;
  collaborators: mongoose.Types.ObjectId[];
  pages: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const siteSchema = new Schema<ISite>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    subdomain: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (v: string) => /^[a-z0-9-]+$/.test(v),
        message: "Invalid subdomain format",
      },
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    collaborators: [{ type: Schema.Types.ObjectId, ref: "User" }],
    pages: {
      type: [Schema.Types.ObjectId],
      ref: "Page",
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model<ISite>("Site", siteSchema);
