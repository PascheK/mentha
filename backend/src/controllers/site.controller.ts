import { Request, Response } from "express";
import Site from "../models/Site";

export const getAllSites = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  try {
    const sites = await Site.find({
      $or: [{ ownerId: userId }, { collaborators: userId }],
    }).sort({ updatedAt: -1 });

    res.json(sites);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch sites", error: err });
  }
};

export const createSite = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { name, slug } = req.body;

  try {
    const existing = await Site.findOne({ slug });
    if (existing) return res.status(409).json({ message: "Slug already used" });

    const site = new Site({
      name,
      slug,
      ownerId: userId,
      collaborators: [],
      pages: [],
      status: "draft",
    });

    await site.save();
    res.status(201).json(site);
  } catch (err) {
    res.status(500).json({ message: "Failed to create site", error: err });
  }
};

export const updateSite = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const siteId = req.params.id;
  const update = req.body;

  try {
    const site = await Site.findById(siteId);
    if (!site) return res.status(404).json({ message: "Site not found" });

    const isAuthorized =
      site.ownerId.toString() === userId ||
      site.collaborators.map(String).includes(userId);

    if (!isAuthorized) return res.status(403).json({ message: "Unauthorized" });

    Object.assign(site, update);
    await site.save();

    res.json(site);
  } catch (err) {
    res.status(500).json({ message: "Failed to update site", error: err });
  }
};

export const deleteSite = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const siteId = req.params.id;

  try {
    const site = await Site.findById(siteId);
    if (!site) return res.status(404).json({ message: "Site not found" });

    if (site.ownerId.toString() !== userId)
      return res.status(403).json({ message: "Only the owner can delete this site" });

    await site.deleteOne();
    res.json({ message: "Site deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete site", error: err });
  }
};
