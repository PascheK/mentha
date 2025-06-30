import { Router } from "express";
import { uploadImage } from "../controllers/upload.controller";

const router = Router();

router.post("/uploads", uploadImage);

export default router;