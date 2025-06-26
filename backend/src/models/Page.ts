import mongoose, { Schema, Document } from "mongoose";

export interface Block {
  type: string;
  props: Record<string, any>;
}

export interface PageHistoryEntry {
  userId: mongoose.Types.ObjectId;
  action: "created" | "edited" | "deleted" | "restored";
  timestamp: Date;
}

export interface IPage extends Document {
  siteId: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  route: string;
  blocks: Block[];
  lastEditedBy: mongoose.Types.ObjectId | null;
  history: PageHistoryEntry[];
  createdAt: Date;
  updatedAt: Date;
}

const blockSchema = new Schema<Block>(
  {
    type: { type: String, required: true },
    props: { type: Schema.Types.Mixed, required: true },
  },
  { _id: false }
);

const historyEntrySchema = new Schema<PageHistoryEntry>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    action: {
      type: String,
      enum: ["created", "edited", "deleted", "restored"],
      required: true,
    },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const pageSchema = new Schema<IPage>(
  {
    siteId: { type: Schema.Types.ObjectId, ref: "Site", required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    route: { type: String, required: true },
    blocks: { type: [blockSchema], default: [] },
    lastEditedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
    history: { type: [historyEntrySchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model<IPage>("Page", pageSchema);
