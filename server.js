import express from "express";
import cors from "cors";
import { config } from "dotenv";

config(); // Load environment variables from .env file

const app = express();

connectDB();

app.use(cors()); // Enable Cross-Origin Resource Sharing to allow requests from different domains

app.use(express.json()); // Parse incoming JSON data in requests

app.use(express.urlencoded({ extended: true })); // Parse incoming form data in requests

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next(); // Pass control to the next middleware/route handler
});

// basic routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/purchases", purchaseRoutes);

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
