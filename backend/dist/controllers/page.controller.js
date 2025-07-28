"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePage = exports.updatePage = exports.createPage = exports.getPagesForSite = void 0;
const Page_1 = __importDefault(require("../models/Page"));
const apiResponse_1 = require("../utils/apiResponse");
const getPagesForSite = async (req, res) => {
    try {
        const pages = await Page_1.default.find({ siteId: req.params.siteId });
        return res.status(200).json((0, apiResponse_1.successResponse)(pages, "Pages fetched successfully"));
    }
    catch (err) {
        return res.status(500).json((0, apiResponse_1.errorResponse)(500, "Failed to fetch pages", err));
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
        return res.status(200).json((0, apiResponse_1.successResponse)(page, "Page created successfully"));
    }
    catch (err) {
        return res.status(500).json((0, apiResponse_1.errorResponse)(500, "Failed to create page", err));
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
            return res.status(404).json((0, apiResponse_1.errorResponse)(404, "Page not found"));
        Object.assign(page, update);
        page.lastEditedBy = userId;
        page.history.push({
            userId,
            action: "edited",
            timestamp: new Date(),
        });
        await page.save();
        return res.status(200).json((0, apiResponse_1.successResponse)(page, "Page updated successfully"));
    }
    catch (err) {
        return res.status(500).json((0, apiResponse_1.errorResponse)(500, "Failed to update page", err));
    }
};
exports.updatePage = updatePage;
const deletePage = async (req, res) => {
    try {
        const page = await Page_1.default.findByIdAndDelete(req.params.pageId);
        if (!page)
            return res.status(404).json((0, apiResponse_1.errorResponse)(404, "Page not found"));
        return res.status(200).json((0, apiResponse_1.successResponse)({}, "Page deleted successfully"));
    }
    catch (err) {
        return res.status(500).json((0, apiResponse_1.errorResponse)(500, "Failed to delete page", err));
    }
};
exports.deletePage = deletePage;
