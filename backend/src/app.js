import "dotenv/config"; // setup env variable
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
export const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true, // Allow credentials (cookies)
  })
);
app.use(express.json({ limit: "16kb", extended: true }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(cookieParser());

// ------------------------------------routes
import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users", userRouter);
