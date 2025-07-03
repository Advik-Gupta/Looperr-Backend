import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";

const app = express();
const server = http.createServer(app);
dotenv.config();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});
app.set("io", io);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;

connectDB();

// ______________________________________________________________________________________________

import requestRoutes from "./routes/requestRoutes.js";

// ______________________________________________________________________________________________

app.get("/test", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

app.use("/api/requests", requestRoutes);

// ______________________________________________________________________________________________

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("✅ Socket connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
