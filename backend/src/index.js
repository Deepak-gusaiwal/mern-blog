import { config } from "dotenv"; // OR import dotenv from "dotenv/config";
config();
import { connectDb } from "./db/connection.js";
import { app } from "./app.js";

connectDb()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log("Server is Listen On Port ::", process.env.PORT || 4000);
    });
  })
  .catch((error) => {
    console.log("MongoDb Connection Failed ::", error);
  });
