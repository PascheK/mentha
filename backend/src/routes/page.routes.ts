import { Router } from "express";
import {
  getPagesForSite,
  createPage,
  updatePage,
  deletePage,
} from "../controllers/page.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.use(verifyToken);

router.get("/:siteId", getPagesForSite);
router.post("/:siteId", createPage);
router.put("/:pageId", updatePage);
router.delete("/:pageId", deletePage);

export default router;
