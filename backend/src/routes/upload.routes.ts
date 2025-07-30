import { Router } from "express";
import { uploadImage, cleanupUnusedFiles } from "../controllers/upload.controller";

const router = Router();

router.post("/uploads", uploadImage);
router.delete("/cleanup", cleanupUnusedFiles);

export default router;