import express from "express";
const router = express.Router();

import {
  getRequests,
  createRequest,
} from "../controllers/requestsController.js";

router
  .route("/")
  .get(getRequests) // Get all requests
  .post(createRequest); // Create a new request

export default router;
