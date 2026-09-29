import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

import logger from "./middleware/logger.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

import authRoutes from "./routes/authRoutes.js";
import passwordRoutes from "./routes/passwordRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(logger);

// Serve browser extension static files
app.use("/extension", express.static(path.join(__dirname, "../../extension")));

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Password Manager Backend Running",
    extensionUrl: `http://localhost:${PORT}/extension/manifest.json`
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/passwords", passwordRoutes);

// Error middleware
app.use(errorMiddleware);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});