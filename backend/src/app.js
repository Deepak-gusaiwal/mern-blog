import express from "express";
import cors from "cors";
export const app = express();

app.use(cors()); //CORS_ORIGIN
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb" }));

// ------------------------------------routes
import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users", userRouter);
