import { Request, Response } from "express";
import Page from "../models/Page";

export const getPagesForSite = async (req: Request, res: Response) => {
  try {
    const pages = await Page.find({ siteId: req.params.siteId });
    res.json(pages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch pages", error: err });
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
    res.status(201).json(page);
  } catch (err) {
    res.status(500).json({ message: "Failed to create page", error: err });
  }
};

export const updatePage = async (req: Request, res: Response) => {
  const pageId = req.params.pageId;
  const userId = (req as any).user.id;
  const update = req.body;

  try {
    const page = await Page.findById(pageId);
    if (!page) return res.status(404).json({ message: "Page not found" });

    Object.assign(page, update);
    page.lastEditedBy = userId;
    page.history.push({
      userId,
      action: "edited",
      timestamp: new Date(),
    });

    await page.save();
    res.json(page);
  } catch (err) {
    res.status(500).json({ message: "Failed to update page", error: err });
  }
};


export const deletePage = async (req: Request, res: Response) => {
  try {
    const page = await Page.findByIdAndDelete(req.params.pageId);
    if (!page) return res.status(404).json({ message: "Page not found" });
    res.json({ message: "Page deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete page", error: err });
  }
};
