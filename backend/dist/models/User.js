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
const userSchema = new mongoose_1.Schema({
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
    sites: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Site" }],
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("User", userSchema);
