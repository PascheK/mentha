import { Router } from "express";
import { register, login, getMe, verifyEmail } from "../controllers/auth.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyToken, getMe);
router.get("/verify-email/:token", verifyEmail);

export default router;
