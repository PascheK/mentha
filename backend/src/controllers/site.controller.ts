import { Request, Response } from "express";
import Site from "../models/Site";
import User from "../models/User";
import { successResponse, errorResponse } from "../utils/apiResponse";
import slugify from "slugify";
import { generateSubdomain } from "../utils/generateSubdomain";
import { getMaxSitesForPlan } from "../utils/subscriptionLimits";
async function generateUniqueSubdomain() {
  let attempts = 0;
  let subdomain = "";
  while (attempts < 10) {
    subdomain = (await generateSubdomain()) as string;
    const existingSite = await Site.findOne({ subdomain });
    if (!existingSite) break;
    attempts++;

  }
  if (attempts === 10) {
    subdomain = `site-${Math.random().toString(36).substring(2, 8)}`;
  }
  return subdomain;
}


export const getAllSites = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  try {
    const sites = await Site.find({
      $or: [{ ownerId: userId }, { collaborators: userId }],
    }).sort({ updatedAt: -1 });

    return res
      .status(200)
      .json(successResponse(sites, "Sites fetched successfully"));
  } catch (err) {
    return res
      .status(500)
      .json(errorResponse(500, "Failed to fetch sites", err));
  }
};

export const getSiteById = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const siteId = req.params.id;

  try {
    const site = await Site.findById(siteId);

    if (!site)
      return res.status(404).json(errorResponse(404, "Site not found"));

    const isAuthorized =
      site.ownerId.toString() === userId ||
      site.collaborators.map(String).includes(userId);

    if (!isAuthorized)
      return res
        .status(403)
        .json(errorResponse(403, "Not authorized to view this site"));

    return res
      .status(200)
      .json(successResponse(site, "Site fetched successfully"));
  } catch (err) {
    return res
      .status(500)
      .json(errorResponse(500, "Failed to fetch site", err));
  }
};

export const createSite = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { name, slug: customSlug } = req.body;
  console.log("Creating site:", { name, customSlug });
  try {
    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json(errorResponse(404, "User not found"));
    const maxSites = getMaxSitesForPlan(user.subscription.plan);

    if (user.sites.length >= maxSites) {
      return res
        .status(403)
        .json(
          errorResponse(403, "Site limit reached for your current plan")
        );
    }

    // Générer un slug si non fourni
    let baseSlug = customSlug
      ? slugify(customSlug, { lower: true, strict: true })
      : slugify(name, { lower: true, strict: true });

    let finalSlug = baseSlug;
    let counter = 1;

    while (await Site.findOne({ slug: finalSlug })) {
      finalSlug = `${baseSlug}-${counter++}`;
    }
      const subdomain = await generateUniqueSubdomain();

    const site = new Site({
      name,
      slug: finalSlug,
      subdomain,
      ownerId: userId,
      collaborators: [],
      pages: [],
      status: "draft",
    });

    await site.save();

    user.sites.push(site._id as typeof user.sites[0]);
    await user.save();

    return res
      .status(201)
      .json(successResponse(site, "Site created successfully"));
  } catch (err) {
    return res
      .status(500)
      .json(errorResponse(500, "Failed to create site", err));
  }
};

export const updateSite = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const siteId = req.params.id;
  const update = req.body;

  try {
    const site = await Site.findById(siteId);
    if (!site)
      return res.status(404).json(errorResponse(404, "Site not found"));

    const isAuthorized =
      site.ownerId.toString() === userId ||
      site.collaborators.map(String).includes(userId);

    if (!isAuthorized)
      return res
        .status(403)
        .json(
          errorResponse(403, "Only the owner or collaborators can update this site")
        );

    Object.assign(site, update);
    await site.save();

    return res
      .status(200)
      .json(successResponse(site, "Site updated successfully"));
  } catch (err) {
    return res
      .status(500)
      .json(errorResponse(500, "Failed to update site", err));
  }
};

export const deleteSite = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const siteId = req.params.id;

  try {
    const site = await Site.findById(siteId);
    if (!site)
      return res.status(404).json(errorResponse(404, "Site not found"));

    if (site.ownerId.toString() !== userId)
      return res
        .status(403)
        .json(errorResponse(403, "Only the owner can delete this site"));

    await site.deleteOne();

    await User.findByIdAndUpdate(userId, {
      $pull: { sites: site._id },
    });

    return res
      .status(200)
      .json(successResponse({}, "Site deleted successfully"));
  } catch (err) {
    return res
      .status(500)
      .json(errorResponse(500, "Failed to delete site", err));
  }
};


