"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePage = exports.updatePage = exports.createPage = exports.getPagesForSite = void 0;
const Page_1 = __importDefault(require("../models/Page"));
const getPagesForSite = async (req, res) => {
    try {
        const pages = await Page_1.default.find({ siteId: req.params.siteId });
        res.json(pages);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch pages", error: err });
    }
};
exports.getPagesForSite = getPagesForSite;
const createPage = async (req, res) => {
    const { title, slug, route, blocks } = req.body;
    try {
        const page = new Page_1.default({
            siteId: req.params.siteId,
            title,
            slug,
            route,
            blocks: blocks || [],
        });
        await page.save();
        res.status(201).json(page);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to create page", error: err });
    }
};
exports.createPage = createPage;
const updatePage = async (req, res) => {
    const pageId = req.params.pageId;
    const userId = req.user.id;
    const update = req.body;
    try {
        const page = await Page_1.default.findById(pageId);
        if (!page)
            return res.status(404).json({ message: "Page not found" });
        Object.assign(page, update);
        page.lastEditedBy = userId;
        page.history.push({
            userId,
            action: "edited",
            timestamp: new Date(),
        });
        await page.save();
        res.json(page);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to update page", error: err });
    }
};
exports.updatePage = updatePage;
const deletePage = async (req, res) => {
    try {
        const page = await Page_1.default.findByIdAndDelete(req.params.pageId);
        if (!page)
            return res.status(404).json({ message: "Page not found" });
        res.json({ message: "Page deleted" });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to delete page", error: err });
    }
};
exports.deletePage = deletePage;
