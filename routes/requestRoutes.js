import express from "express";
const router = express.Router();

import { createRequest } from "../controllers/requestsController.js";

router.post("/", createRequest);

export default router;
