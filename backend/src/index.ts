import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import siteRoutes from "./routes/site.routes";
import pageRoutes from "./routes/page.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Mentha CMS API is running 🚀");
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

app.use("/api/auth", authRoutes);
app.use("/api/sites", siteRoutes);
app.use("/api/pages", pageRoutes);

