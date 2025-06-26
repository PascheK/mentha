import { Router } from "express";
import {
  getAllSites,
  createSite,
  updateSite,
  deleteSite,
} from "../controllers/site.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.use(verifyToken);

router.get("/", getAllSites);
router.post("/", createSite);
router.put("/:id", updateSite);
router.delete("/:id", deleteSite);

export default router;
