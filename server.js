import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;

connectDB();

// ______________________________________________________________________________________________

import requestRoutes from "./routes/requestRoutes.js";

// ______________________________________________________________________________________________

app.use("/api/requests", requestRoutes);

// ______________________________________________________________________________________________

// Example route
app.get("/test", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
