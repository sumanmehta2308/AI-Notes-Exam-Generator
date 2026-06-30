import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createCreditsOrder,
  verifyPayment,
  getTransactionHistory,
} from "../controllers/creditsController.js";

const creditRouter = express.Router();

creditRouter.post("/order", authMiddleware, createCreditsOrder);
creditRouter.post("/verify", authMiddleware, verifyPayment); // New verification route
creditRouter.get("/history", authMiddleware, getTransactionHistory);
export default creditRouter;
