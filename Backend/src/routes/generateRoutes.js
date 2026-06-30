import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import generateController from "../controllers/generateController.js";
import { getMyNotes, getSingleNotes } from "../controllers/notesController.js";

const notesRouter = express.Router();

notesRouter.post("/generate-notes", authMiddleware, generateController);
notesRouter.get("/getnotes", authMiddleware, getMyNotes);
notesRouter.get("/:id", authMiddleware, getSingleNotes);

export default notesRouter;
