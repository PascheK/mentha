import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import multer, { MulterError, StorageEngine } from "multer";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

// Définir le dossier d'upload
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
      return res.status(400).json({ message: "Multer error", error: err.message });
    } else if (err) {
      return res.status(500).json({ message: "Upload failed", error: err.message });
    }

    const file = (req as any).file as Express.Multer.File;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = `/uploads/${file.filename}`;
    return res.status(200).json({ message: "Upload successful", path: filePath });
  });
};
