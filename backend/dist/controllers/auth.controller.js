"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmail = exports.getMe = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
const register = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser)
            return res.status(409).json({ message: "Email already exists" });
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const verificationToken = Math.random().toString(36).substring(2, 15); // pour l’instant simple
        const user = new User_1.default({
            email,
            password: hashedPassword,
            name,
            emailVerified: false,
            verificationToken,
            subscription: {
                plan: "free",
                maxSites: 1,
                status: "active"
            }
        });
        await user.save();
        // TODO: envoyer un mail avec le lien de vérification
        res.status(201).json({ message: "User registered", userId: user._id });
    }
    catch (err) {
        res.status(500).json({ message: "Registration failed", error: err });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User_1.default.findOne({ email });
        if (!user)
            return res.status(401).json({ message: "Invalid credentials" });
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ message: "Invalid credentials" });
        if (!user.emailVerified) {
            return res.status(403).json({ message: "Email not verified" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, {
            expiresIn: "7d",
        });
        res.json({ token });
    }
    catch (err) {
        res.status(500).json({ message: "Login failed", error: err });
    }
};
exports.login = login;
const getMe = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.user.id).select("-password");
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to get user", error: err });
    }
};
exports.getMe = getMe;
const verifyEmail = async (req, res) => {
    const token = req.params.token;
    try {
        const user = await User_1.default.findOne({ verificationToken: token });
        if (!user) {
            return res.status(404).json({ message: "Invalid or expired token" });
        }
        user.emailVerified = true;
        user.verificationToken = null;
        await user.save();
        res.json({ message: "Email verified successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to verify email", error: err });
    }
};
exports.verifyEmail = verifyEmail;
