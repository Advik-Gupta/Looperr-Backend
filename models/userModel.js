import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  collegeId: { type: String, required: true },
  collegeIdCardImage: { type: String, default: "" },
  profileImage: { type: String, default: "" },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  currentHostel: { type: String, default: "" },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    description: { type: String, required: true },
  },
  rating: { type: Number, default: 0 },
  totalRequestsMade: { type: Number, default: 0 },
  totalRequestsFulfilled: { type: Number, default: 0 },
  joinedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

export default User;
