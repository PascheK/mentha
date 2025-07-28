"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSite = exports.updateSite = exports.createSite = exports.getSiteById = exports.getAllSites = void 0;
const Site_1 = __importDefault(require("../models/Site"));
const User_1 = __importDefault(require("../models/User"));
const apiResponse_1 = require("../utils/apiResponse");
const slugify_1 = __importDefault(require("slugify"));
const getAllSites = async (req, res) => {
    const userId = req.user.id;
    try {
        const sites = await Site_1.default.find({
            $or: [{ ownerId: userId }, { collaborators: userId }],
        }).sort({ updatedAt: -1 });
        return res
            .status(200)
            .json((0, apiResponse_1.successResponse)(sites, "Sites fetched successfully"));
    }
    catch (err) {
        return res
            .status(500)
            .json((0, apiResponse_1.errorResponse)(500, "Failed to fetch sites", err));
    }
};
exports.getAllSites = getAllSites;
const getSiteById = async (req, res) => {
    const userId = req.user.id;
    const siteId = req.params.id;
    try {
        const site = await Site_1.default.findById(siteId);
        if (!site)
            return res.status(404).json((0, apiResponse_1.errorResponse)(404, "Site not found"));
        const isAuthorized = site.ownerId.toString() === userId ||
            site.collaborators.map(String).includes(userId);
        if (!isAuthorized)
            return res
                .status(403)
                .json((0, apiResponse_1.errorResponse)(403, "Not authorized to view this site"));
        return res
            .status(200)
            .json((0, apiResponse_1.successResponse)(site, "Site fetched successfully"));
    }
    catch (err) {
        return res
            .status(500)
            .json((0, apiResponse_1.errorResponse)(500, "Failed to fetch site", err));
    }
};
exports.getSiteById = getSiteById;
const createSite = async (req, res) => {
    const userId = req.user.id;
    const { name, slug: customSlug } = req.body;
    try {
        const user = await User_1.default.findById(userId);
        if (!user)
            return res.status(404).json((0, apiResponse_1.errorResponse)(404, "User not found"));
        if (user.sites.length >= user.subscription.maxSites) {
            return res
                .status(403)
                .json((0, apiResponse_1.errorResponse)(403, "Site limit reached for your current plan"));
        }
        // Générer un slug si non fourni
        let baseSlug = customSlug
            ? (0, slugify_1.default)(customSlug, { lower: true, strict: true })
            : (0, slugify_1.default)(name, { lower: true, strict: true });
        let finalSlug = baseSlug;
        let counter = 1;
        while (await Site_1.default.findOne({ slug: finalSlug })) {
            finalSlug = `${baseSlug}-${counter++}`;
        }
        const site = new Site_1.default({
            name,
            slug: finalSlug,
            ownerId: userId,
            collaborators: [],
            pages: [],
            status: "draft",
        });
        await site.save();
        user.sites.push(site._id);
        await user.save();
        return res
            .status(201)
            .json((0, apiResponse_1.successResponse)(site, "Site created successfully"));
    }
    catch (err) {
        return res
            .status(500)
            .json((0, apiResponse_1.errorResponse)(500, "Failed to create site", err));
    }
};
exports.createSite = createSite;
const updateSite = async (req, res) => {
    const userId = req.user.id;
    const siteId = req.params.id;
    const update = req.body;
    try {
        const site = await Site_1.default.findById(siteId);
        if (!site)
            return res.status(404).json((0, apiResponse_1.errorResponse)(404, "Site not found"));
        const isAuthorized = site.ownerId.toString() === userId ||
            site.collaborators.map(String).includes(userId);
        if (!isAuthorized)
            return res
                .status(403)
                .json((0, apiResponse_1.errorResponse)(403, "Only the owner or collaborators can update this site"));
        Object.assign(site, update);
        await site.save();
        return res
            .status(200)
            .json((0, apiResponse_1.successResponse)(site, "Site updated successfully"));
    }
    catch (err) {
        return res
            .status(500)
            .json((0, apiResponse_1.errorResponse)(500, "Failed to update site", err));
    }
};
exports.updateSite = updateSite;
const deleteSite = async (req, res) => {
    const userId = req.user.id;
    const siteId = req.params.id;
    try {
        const site = await Site_1.default.findById(siteId);
        if (!site)
            return res.status(404).json((0, apiResponse_1.errorResponse)(404, "Site not found"));
        if (site.ownerId.toString() !== userId)
            return res
                .status(403)
                .json((0, apiResponse_1.errorResponse)(403, "Only the owner can delete this site"));
        await site.deleteOne();
        await User_1.default.findByIdAndUpdate(userId, {
            $pull: { sites: site._id },
        });
        return res
            .status(200)
            .json((0, apiResponse_1.successResponse)({}, "Site deleted successfully"));
    }
    catch (err) {
        return res
            .status(500)
            .json((0, apiResponse_1.errorResponse)(500, "Failed to delete site", err));
    }
};
exports.deleteSite = deleteSite;
