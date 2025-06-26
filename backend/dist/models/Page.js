"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const blockSchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    props: { type: mongoose_1.Schema.Types.Mixed, required: true },
}, { _id: false });
const historyEntrySchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    action: {
        type: String,
        enum: ["created", "edited", "deleted", "restored"],
        required: true,
    },
    timestamp: { type: Date, default: Date.now },
}, { _id: false });
const pageSchema = new mongoose_1.Schema({
    siteId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Site", required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    route: { type: String, required: true },
    blocks: { type: [blockSchema], default: [] },
    lastEditedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", default: null },
    history: { type: [historyEntrySchema], default: [] },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Page", pageSchema);
