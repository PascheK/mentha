import express, { Router } from "express";



import { verifyToken } from "../middleware/verifyToken";
import {
  checkout,
  webhookHandler,
  getCurrentSubscription,
  createCustomerPortalSession,
} from "../controllers/subscription.controller";
const router = Router();

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  webhookHandler
);

router.use(verifyToken);
router.post("/checkout", checkout);
router.get("/current", getCurrentSubscription);
router.post("/portal", createCustomerPortalSession);

export default router;
