"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const page_controller_1 = require("../controllers/page.controller");
const verifyToken_1 = require("../middleware/verifyToken");
const router = (0, express_1.Router)();
router.use(verifyToken_1.verifyToken);
router.get("/:siteId", page_controller_1.getPagesForSite);
router.post("/:siteId", page_controller_1.createPage);
router.put("/:pageId", page_controller_1.updatePage);
router.delete("/:pageId", page_controller_1.deletePage);
exports.default = router;
