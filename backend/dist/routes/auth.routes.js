"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const verifyToken_1 = require("../middleware/verifyToken");
const router = (0, express_1.Router)();
router.post("/register", auth_controller_1.register);
router.post("/login", auth_controller_1.login);
router.get("/me", verifyToken_1.verifyToken, auth_controller_1.getMe);
router.get("/verify-email/:token", auth_controller_1.verifyEmail);
exports.default = router;
