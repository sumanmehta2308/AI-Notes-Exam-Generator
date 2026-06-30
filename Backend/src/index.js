import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDb from "./utils/connectDb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import notesRouter from "./routes/generateRoutes.js";
import historyRouter from "./routes/historyRoutes.js";
import pdfRouter from "./routes/pdfRoutes.js";
import creditRouter from "./routes/creditsRoutes.js";

const app = express();

// 1. ADD THIS MIDDLEWARE to fix the window.close() COOP errors
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
  next();
});

app.use(express.json());
app.use(cookieParser());

// CORS configuration remains the same
app.use(
  cors({
    origin: [
      "https://ai-notes-exam-generator.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

const startServer = async () => {
  try {
    await connectDb();
    const port = process.env.PORT || 8000;

    app.get("/", (req, res) => {
      res.json({ message: "ExamNotes AI Backend Running" });
    });

    app.use("/auth", authRouter);
    app.use("/user", userRouter);
    app.use("/notes", notesRouter);
    app.use("/history", historyRouter);
    app.use("/pdf", pdfRouter);
    app.use("/credit", creditRouter);

    app.listen(port, () => {
      console.log(
        `[SK-SUMAN-NITR-2026-B10] Server running smoothly on port: ${port}`
      );
    });
  } catch (error) {
    console.error("Startup Failed", error);
  }
};
startServer();
