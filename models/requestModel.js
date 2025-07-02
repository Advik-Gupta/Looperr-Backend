import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: {
    type: String,
    enum: ["pickup", "dropoff", "buy", "custom"],
    required: true,
  },
  status: {
    type: String,
    enum: ["open", "accepted", "completed", "cancelled", "expired"],
    default: "open",
  },
  //   requesterId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //     required: true,
  //   },
  //   fulfillerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  acceptedAt: { type: Date },
  fulfilledAt: { type: Date },
  fromLocation: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    description: { type: String, required: true },
  },
  toLocation: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    description: { type: String, required: true },
  },
  reward: { type: Number, default: 0 },
  isUrgent: { type: Boolean, default: false },
  images: [{ type: String }],
  tags: [{ type: String }],
});

const Request = mongoose.model("Request", requestSchema);

export default Request;
