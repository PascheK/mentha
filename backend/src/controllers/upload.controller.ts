import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import multer, { MulterError, StorageEngine } from "multer";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { successResponse, errorResponse } from "../utils/apiResponse";

const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage: StorageEngine = multer.diskStorage({
  destination: (
    _req: Request,
    _file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, uploadDir);
  },
  filename: (
    _req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage }).single("image");

export const uploadImage = (
  req: Request<ParamsDictionary, any, any, ParsedQs>,
  res: Response
) => {
  upload(req, res, function (err: any) {
    if (err instanceof MulterError) {
      return res.status(400).json(errorResponse(400, "Multer error: " + err.message));
    } else if (err) {
      return res.status(500).json(errorResponse(500, "Server error: " + err.message));
    }

    const file = (req as any).file as Express.Multer.File;
    if (!file) {
      return res.status(400).json(errorResponse(400, "No file uploaded"));
    }

    const filePath = `/uploads/${file.filename}`;
    return res.status(200).json(successResponse({ path: filePath }, "Image uploaded successfully"));
  });
};
