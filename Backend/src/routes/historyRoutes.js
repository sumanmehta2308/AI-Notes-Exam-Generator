import express from "express";
import { getUserHistory,deleteHistory} from "../controllers/historyController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const historyRouter = express.Router();
historyRouter.get("/my-notes", authMiddleware, getUserHistory);
historyRouter.delete("/delete/:id", authMiddleware, deleteHistory);
export default historyRouter;
