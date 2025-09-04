import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { connectDb } from "./src/config/dbConfig.js";
import movieRoutes from "./src/routes/movieRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true,
}));
app.set("trust proxy", 1);

// ✅ Body parsers (must be before routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rate limiter (only for login route)
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again after an hour",
});
app.use("/api/users/v1/login", limiter);

// Movie routes
app.use("/api/movies", movieRoutes);

// Test route
app.get("/", (req, res) => res.send("Server is running"));

// Start server
async function startServer() {
  try {
    await connectDb();
    app.listen(port, () => console.log(`✅ Server running on port ${port}`));
  } catch (error) {
    console.error("❌ Failed to start the server:", error);
  }
}

startServer();
