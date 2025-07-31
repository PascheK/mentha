"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.resetPassword = exports.forgotPassword = exports.verifyEmail = exports.getMe = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const mailer_1 = require("../utils/mailer");
const apiResponse_1 = require("../utils/apiResponse");
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
const register = async (req, res) => {
    const { firstName, lastName, username, email, password, photo, termsAccepted, language = "fr", phoneNumber = "", billingAddress = {
        line1: "",
        line2: "",
        city: "",
        postalCode: "",
        country: "",
    }, } = req.body;
    if (!termsAccepted) {
        return res.status(400).json((0, apiResponse_1.errorResponse)(400, "Terms must be accepted"));
    }
    try {
        const existingUser = await User_1.default.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(409).json((0, apiResponse_1.errorResponse)(409, "Email or username already exists"));
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const verificationToken = Math.random().toString(36).substring(2, 15);
        const user = new User_1.default({
            firstName,
            lastName,
            username,
            name: `${firstName} ${lastName}`,
            email,
            password: hashedPassword,
            photo: photo || "",
            emailVerified: false,
            verificationToken,
            termsAccepted,
            role: "user",
            subscription: {
                plan: "free",
                status: "active",
                stripeSubscriptionId: null,
            },
            stripeCustomerId: '',
            billingAddress,
            phoneNumber,
            language,
            hasUsedTrial: false,
            newsletterSubscribed: false,
        });
        await user.save();
        await (0, mailer_1.sendVerificationEmail)(email, verificationToken);
        return res.status(200).json((0, apiResponse_1.successResponse)({ userId: user._id }, "User registered successfully. Please check your email to verify your account."));
    }
    catch (err) {
        return res.status(500).json((0, apiResponse_1.errorResponse)(500, "Registration failed", err));
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User_1.default.findOne({ email });
        if (!user)
            return res.status(401).json((0, apiResponse_1.errorResponse)(401, "Invalid credentials"));
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json((0, apiResponse_1.errorResponse)(401, "Invalid credentials"));
        if (!user.emailVerified) {
            return res.status(403).json((0, apiResponse_1.errorResponse)(403, "Email not verified. Please check your inbox for the verification email."));
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email, role: user.role, plan: user.subscription.plan }, JWT_SECRET, { expiresIn: "7d" });
        return res.status(200).json((0, apiResponse_1.successResponse)({ token }, "Login successful"));
    }
    catch (err) {
        return res.status(500).json((0, apiResponse_1.errorResponse)(500, "Login failed", err));
    }
};
exports.login = login;
const getMe = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.user.id).select("-password");
        if (!user)
            return res.status(404).json((0, apiResponse_1.errorResponse)(404, "User not found"));
        return res.status(200).json((0, apiResponse_1.successResponse)(user, "User retrieved successfully"));
    }
    catch (err) {
        return res.status(500).json((0, apiResponse_1.errorResponse)(500, "Failed to retrieve user", err));
    }
};
exports.getMe = getMe;
const verifyEmail = async (req, res) => {
    const token = req.params.token;
    try {
        const user = await User_1.default.findOne({ verificationToken: token });
        if (!user) {
            return res.status(404).json((0, apiResponse_1.errorResponse)(404, "Invalid or expired verification token"));
        }
        user.emailVerified = true;
        user.verificationToken = null;
        await user.save();
        return res.status(200).json((0, apiResponse_1.successResponse)({}, "Email verified successfully"));
    }
    catch (err) {
        return res.status(500).json((0, apiResponse_1.errorResponse)(500, "Failed to verify email", err));
    }
};
exports.verifyEmail = verifyEmail;
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User_1.default.findOne({ email });
        if (!user || !user.emailVerified) {
            return res.status(404).json((0, apiResponse_1.errorResponse)(404, "User not found"));
        }
        const resetToken = Math.random().toString(36).substring(2, 15);
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour expiration
        await user.save();
        await (0, mailer_1.sendPasswordResetEmail)(email, resetToken);
        return res.status(200).json((0, apiResponse_1.successResponse)({}, "Password reset email sent"));
    }
    catch (err) {
        return res.status(500).json((0, apiResponse_1.errorResponse)(500, "Failed to send password reset email", err));
    }
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const user = await User_1.default.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: new Date() },
        });
        if (!user) {
            return res.status(400).json((0, apiResponse_1.errorResponse)(400, "Invalid or expired password reset token"));
        }
        user.password = await bcrypt_1.default.hash(newPassword, 10);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();
        return res.status(200).json((0, apiResponse_1.successResponse)({}, "Password reset successfully"));
    }
    catch (err) {
        return res.status(500).json((0, apiResponse_1.errorResponse)(500, "Failed to reset password", err));
    }
};
exports.resetPassword = resetPassword;
const update = async (req, res) => {
    const userId = req.user.id;
    const { firstName, lastName, username, photo, phoneNumber, billingAddress } = req.body;
    try {
        const user = await User_1.default.findById(userId);
        if (!user)
            return res.status(404).json((0, apiResponse_1.errorResponse)(404, "User not found"));
        console.log("Updating user:", userId, firstName, lastName, username, photo, phoneNumber, billingAddress);
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.username = username || user.username;
        user.photo = photo || user.photo;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.billingAddress = billingAddress || user.billingAddress;
        await user.save();
        return res.status(200).json((0, apiResponse_1.successResponse)({}, "User updated successfully"));
    }
    catch (err) {
        return res.status(500).json((0, apiResponse_1.errorResponse)(500, "Failed to update user", err));
    }
};
exports.update = update;
