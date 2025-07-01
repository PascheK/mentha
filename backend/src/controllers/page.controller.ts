import { Request, Response } from "express";
import Page from "../models/Page";
import { successResponse, errorResponse } from "../utils/apiResponse";

export const getPagesForSite = async (req: Request, res: Response) => {
  try {
    const pages = await Page.find({ siteId: req.params.siteId });
    return res.status(200).json(successResponse(pages, "Pages fetched successfully"));
  } catch (err) {
    return res.status(500).json(errorResponse(500, "Failed to fetch pages", err));
  }
};

export const createPage = async (req: Request, res: Response) => {
  const { title, slug, route, blocks } = req.body;
  try {
    const page = new Page({
      siteId: req.params.siteId,
      title,
      slug,
      route,
      blocks: blocks || [],
    });
    await page.save();
    return res.status(200).json(successResponse(page, "Page created successfully"));
  } catch (err) {
    return res.status(500).json(errorResponse(500, "Failed to create page", err));
  }
};

export const updatePage = async (req: Request, res: Response) => {
  const pageId = req.params.pageId;
  const userId = (req as any).user.id;
  const update = req.body;

  try {
    const page = await Page.findById(pageId);
    if (!page) return res.status(404).json(errorResponse(404, "Page not found"));

    Object.assign(page, update);
    page.lastEditedBy = userId;
    page.history.push({
      userId,
      action: "edited",
      timestamp: new Date(),
    });

    await page.save();
    return res.status(200).json(successResponse(page, "Page updated successfully"));
  } catch (err) {
    return res.status(500).json(errorResponse(500, "Failed to update page", err));
  }
};


export const deletePage = async (req: Request, res: Response) => {
  try {
    const page = await Page.findByIdAndDelete(req.params.pageId);
    if (!page) return res.status(404).json(errorResponse(404, "Page not found"));
    return res.status(200).json(successResponse({}, "Page deleted successfully"));
  } catch (err) {
    return res.status(500).json(errorResponse(500, "Failed to delete page", err));
  }
};
