"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSite = exports.updateSite = exports.createSite = exports.getAllSites = void 0;
const Site_1 = __importDefault(require("../models/Site"));
const getAllSites = async (req, res) => {
    const userId = req.user.id;
    try {
        const sites = await Site_1.default.find({
            $or: [{ ownerId: userId }, { collaborators: userId }],
        }).sort({ updatedAt: -1 });
        res.json(sites);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch sites", error: err });
    }
};
exports.getAllSites = getAllSites;
const createSite = async (req, res) => {
    const userId = req.user.id;
    const { name, slug } = req.body;
    try {
        const existing = await Site_1.default.findOne({ slug });
        if (existing)
            return res.status(409).json({ message: "Slug already used" });
        const site = new Site_1.default({
            name,
            slug,
            ownerId: userId,
            collaborators: [],
            pages: [],
            status: "draft",
        });
        await site.save();
        res.status(201).json(site);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to create site", error: err });
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
            return res.status(404).json({ message: "Site not found" });
        const isAuthorized = site.ownerId.toString() === userId ||
            site.collaborators.map(String).includes(userId);
        if (!isAuthorized)
            return res.status(403).json({ message: "Unauthorized" });
        Object.assign(site, update);
        await site.save();
        res.json(site);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to update site", error: err });
    }
};
exports.updateSite = updateSite;
const deleteSite = async (req, res) => {
    const userId = req.user.id;
    const siteId = req.params.id;
    try {
        const site = await Site_1.default.findById(siteId);
        if (!site)
            return res.status(404).json({ message: "Site not found" });
        if (site.ownerId.toString() !== userId)
            return res.status(403).json({ message: "Only the owner can delete this site" });
        await site.deleteOne();
        res.json({ message: "Site deleted" });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to delete site", error: err });
    }
};
exports.deleteSite = deleteSite;
