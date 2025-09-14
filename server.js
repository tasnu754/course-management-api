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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
