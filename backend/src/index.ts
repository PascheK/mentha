import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.routes";
import siteRoutes from "./routes/site.routes";
import pageRoutes from "./routes/page.routes";
import uploadRoutes from "./routes/upload.routes";
import transporter from "./utils/mailer"; 
import subscriptionRoutes from "./routes/subscription.routes";

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.NODE_ENV === "production"
  ? process.env.MONGO_URI || ""
  : process.env.MONGO_URI_DEV || "";


// Middleware
app.use(cors());
app.use((req, res, next) => {
  if (req.originalUrl === "/api/subscriptions/webhook") {
    next(); 
  } else {
    express.json()(req, res, next);
  }
});
// Static files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sites", siteRoutes);
app.use("/api/pages", pageRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api", uploadRoutes);

// Base route
app.get("/", (_req, res) => {
  res.send("Mentha CMS API is running 🚀");
});

// Startup
const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    // Vérification du mailer
    transporter.verify((error, success) => {
      if (error) {
        console.error("❌ Mailer setup error:", error);
      } else {
        console.log("✅ Mailer is ready to send emails");
      }
    });

    // Démarrer le serveur après tout est prêt
    app.listen(PORT, () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};

startServer();
