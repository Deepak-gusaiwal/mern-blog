import express from "express";
import cors from "cors";
import { config } from "dotenv"; // OR import dotenv from "dotenv/config";
config();
import { connectDb } from "./db/connection.js";
import userRouter from "./routes/user.routes.js";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

//connection to db
connectDb();
app.use("/", userRouter);

app.listen(PORT, () => {
  console.log("server is runing on port", PORT);
});
