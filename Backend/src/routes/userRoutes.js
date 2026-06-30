import express from "express";
import { getCurrentUser } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const userRouter = express.Router();
userRouter.get("/currentUser", authMiddleware, getCurrentUser);

export default userRouter;
