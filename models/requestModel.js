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
  requesterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fulfillerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  acceptedAt: { type: Date },
  fulfilledAt: { type: Date },
  fromLocation: {
    locationReferenceId: { type: String, required: true },
    locationName: { type: String, required: true },
  },
  toLocation: {
    locationReferenceId: { type: String, required: true },
    locationName: { type: String, required: true },
  },
  price: { type: Number, default: 0 },
  isUrgent: { type: Boolean, default: false },
  image: { type: String },
  tags: [{ type: String }],
  bidLimit: { type: Number, default: 0 },
});

const Request = mongoose.model("Request", requestSchema);

export default Request;
