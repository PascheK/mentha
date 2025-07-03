import { Router } from "express";
import {
  getAllSites,
  getSiteById,
  createSite,
  updateSite,
  deleteSite,
} from "../controllers/site.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.use(verifyToken);

router.get("/", getAllSites);
router.get("/:id", getSiteById); 
router.post("/", createSite);
router.put("/:id", updateSite);
router.delete("/:id", deleteSite);

export default router;
