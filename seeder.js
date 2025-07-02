import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/userModel.js";
import Request from "./models/requestModel.js";

import { usersSampleData, requestsSampleData } from "./data/sampleData.js";

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB ✅");

    // Clear existing data
    await User.deleteMany({});
    await Request.deleteMany({});

    // Sample Users
    const users = await User.insertMany(usersSampleData);

    const userIds = users.map((user) => user._id);

    // Sample Requests
    await Request.insertMany(
      requestsSampleData.map((request) => ({
        ...request,
        requesterId: userIds[Math.floor(Math.random() * userIds.length)], // Assign random requester
      }))
    );

    console.log("✅ Sample data inserted!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

seed();
