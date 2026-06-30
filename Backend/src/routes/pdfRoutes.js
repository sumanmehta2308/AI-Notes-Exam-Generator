import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { pdfDownload } from "../controllers/pdfController.js"; // Fixed import to point to PDF controller instead of generateController

const pdfRouter = express.Router();
pdfRouter.post("/generate-pdf", authMiddleware, pdfDownload);

export default pdfRouter;
