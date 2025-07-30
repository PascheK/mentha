import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { sendVerificationEmail, sendPasswordResetEmail } from "../utils/mailer";
import { successResponse, errorResponse } from "../utils/apiResponse";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export const register = async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    photo,
    termsAccepted,
    language = "fr",
    phoneNumber = "",
    billingAddress = {
      line1: "",
      line2: "",
      city: "",
      postalCode: "",
      country: "",
    },
  } = req.body;

  if (!termsAccepted) {
    return res.status(400).json(errorResponse(400, "Terms must be accepted"));
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json(errorResponse(409, "Email or username already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.random().toString(36).substring(2, 15);

    const user = new User({
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

    await sendVerificationEmail(email, verificationToken);
    return res.status(200).json(
      successResponse(
        { userId: user._id },
        "User registered successfully. Please check your email to verify your account."
      )
    );
  } catch (err) {
    return res.status(500).json(errorResponse(500, "Registration failed", err));
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json(errorResponse(401, "Invalid credentials"));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json(errorResponse(401, "Invalid credentials"));

    if (!user.emailVerified) {
      return res.status(403).json(errorResponse(403, "Email not verified. Please check your inbox for the verification email."));
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role, plan: user.subscription.plan },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json(successResponse({ token }, "Login successful"));
  } catch (err) {
    return res.status(500).json(errorResponse(500, "Login failed", err));
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    
    const user = await User.findById((req as any).user.id).select("-password");
    if (!user) return res.status(404).json(errorResponse(404, "User not found"));
    return res.status(200).json(successResponse(user, "User retrieved successfully"));
  } catch (err) {
    return res.status(500).json(errorResponse(500, "Failed to retrieve user", err));
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  const token = req.params.token;

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(404).json(errorResponse(404, "Invalid or expired verification token"));
    }

    user.emailVerified = true;
    user.verificationToken = null;
    await user.save();
    return res.status(200).json(successResponse({}, "Email verified successfully"));
  } catch (err) {
    return res.status(500).json(errorResponse(500, "Failed to verify email", err));
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.emailVerified) {
      return res.status(404).json(errorResponse(404, "User not found"));
    }

    const resetToken = Math.random().toString(36).substring(2, 15);
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour expiration
    await user.save();

    await sendPasswordResetEmail(email, resetToken);
    return res.status(200).json(successResponse({}, "Password reset email sent"));
  } catch (err) {
    return res.status(500).json(errorResponse(500, "Failed to send password reset email", err));
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json(errorResponse(400, "Invalid or expired password reset token"));
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    return res.status(200).json(successResponse({}, "Password reset successfully"));
  } catch (err) {
    return res.status(500).json(errorResponse(500, "Failed to reset password", err));
  }
}

export const update = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { firstName, lastName, username, photo, phoneNumber, billingAddress } = req.body;

  try {
    const user = await User.findById(userId); 
    if (!user) return res.status(404).json(errorResponse(404, "User not found"));
    console.log("Updating user:", userId, firstName, lastName, username, photo, phoneNumber, billingAddress);
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.username = username || user.username;
    user.photo = photo || user.photo;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.billingAddress = billingAddress || user.billingAddress;

    await user.save();
    return res.status(200).json(successResponse({}, "User updated successfully"));
  } catch (err) {
    return res.status(500).json(errorResponse(500, "Failed to update user", err));
  }
};
