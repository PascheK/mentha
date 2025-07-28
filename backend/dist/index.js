"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const site_routes_1 = __importDefault(require("./routes/site.routes"));
const page_routes_1 = __importDefault(require("./routes/page.routes"));
const upload_routes_1 = __importDefault(require("./routes/upload.routes"));
const mailer_1 = __importDefault(require("./utils/mailer"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Static files
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
// Routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/sites", site_routes_1.default);
app.use("/api/pages", page_routes_1.default);
app.use("/api", upload_routes_1.default);
// Base route
app.get("/", (_req, res) => {
    res.send("Mentha CMS API is running 🚀");
});
// Startup
const startServer = async () => {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log("✅ MongoDB connected");
        // Vérification du mailer
        mailer_1.default.verify((error, success) => {
            if (error) {
                console.error("❌ Mailer setup error:", error);
            }
            else {
                console.log("✅ Mailer is ready to send emails");
            }
        });
        // Démarrer le serveur après tout est prêt
        app.listen(PORT, () => {
            console.log(`✅ Server is running on http://localhost:${PORT}`);
        });
    }
    catch (err) {
        console.error("❌ MongoDB connection error:", err);
    }
};
startServer();
