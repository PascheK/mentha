"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const site_routes_1 = __importDefault(require("./routes/site.routes"));
const page_routes_1 = __importDefault(require("./routes/page.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (_req, res) => {
    res.send("Mentha CMS API is running 🚀");
});
mongoose_1.default
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
app.use("/api/auth", auth_routes_1.default);
app.use("/api/sites", site_routes_1.default);
app.use("/api/pages", page_routes_1.default);
