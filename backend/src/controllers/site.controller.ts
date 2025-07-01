import { Request, Response } from "express";
import Site from "../models/Site";
import { successResponse, errorResponse } from "../utils/apiResponse";

export const getAllSites = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  try {
    const sites = await Site.find({
      $or: [{ ownerId: userId }, { collaborators: userId }],
    }).sort({ updatedAt: -1 });

    return res.status(200).json(successResponse(sites, "Sites fetched successfully"));
  } catch (err) {
   return res.status(500).json(errorResponse(500, "Failed to fetch sites", err));
  }
};

export const createSite = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { name, slug } = req.body;

  try {
    const existing = await Site.findOne({ slug });
    if (existing) return res.status(409).json(errorResponse(409, "Site with this slug already exists"));

    const site = new Site({
      name,
      slug,
      ownerId: userId,
      collaborators: [],
      pages: [],
      status: "draft",
    });

    await site.save();
    return res.status(201).json(successResponse(site, "Site created successfully"));
  } catch (err) {
    return res.status(500).json(errorResponse(500, "Failed to create site", err));
  }
};

export const updateSite = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const siteId = req.params.id;
  const update = req.body;

  try {
    const site = await Site.findById(siteId);
    if (!site) return res.status(404).json(errorResponse(404, "Site not found"));

    const isAuthorized =
      site.ownerId.toString() === userId ||
      site.collaborators.map(String).includes(userId);

    if (!isAuthorized) return res.status(403).json(errorResponse(403, "Only the owner or collaborators can update this site"));

    Object.assign(site, update);
    await site.save();
    return res.status(200).json(successResponse(site, "Site updated successfully"));
  } catch (err) {
    return res.status(500).json(errorResponse(500, "Failed to update site", err));
  }
};

export const deleteSite = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const siteId = req.params.id;

  try {
    const site = await Site.findById(siteId);
    if (!site) return res.status(404).json(errorResponse(404, "Site not found"));

    if (site.ownerId.toString() !== userId)
      return res.status(403).json(errorResponse(403, "Only the owner can delete this site"));

    await site.deleteOne();
    return res.status(200).json(successResponse({}, "Site deleted successfully"));
  } catch (err) {
    return res.status(500).json(errorResponse(500, "Failed to delete site", err));
  }
};
