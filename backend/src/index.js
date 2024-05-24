import express from "express";
import cors from "cors";
import { config } from "dotenv"; // OR import dotenv from "dotenv/config";
config();
import { connectDb } from "./db/connection.js";
import User from "./models/user.model.js";
import {
  apiResponse,
  useNameGenerator,
  authTokenGenerator,
} from "./constats/constat.js";
import bcrypt from "bcryptjs";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

//connection to db
connectDb();

// 1. Signup
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // hashing the password
    let hashedPassword = await bcrypt.hash(
      password + process.env.BCRYPT_STR,
      10
    );
    // if there has no name means user signup using google auth
    let userName;
    name
      ? (userName = await useNameGenerator({ name }))
      : (userName = await useNameGenerator({ email }));

    const user = await new User({
      name: userName,
      email,
      password: hashedPassword,
    });
    const result = await user.save();
    //  Generating Auth Token
    return apiResponse(res, {
      result: authTokenGenerator(result._id),
      status: 200,
    });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      if (error.keyValue.email) {
        return apiResponse(res, {
          status: 400,
          error: "this email is already exits",
        });
      }
      if (error.keyValue.name) {
        return apiResponse(res, {
          status: 400,
          error: "this name is already exits",
        });
      }
    }
    return apiResponse(res, { status: 400, error });
  }
});

//2. login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user;
    const isEmailExits = await User.findOne({ email });
    if (!isEmailExits) {
      return apiResponse(res, { status: 404, error: "Invalid Credentials" });
    } else {
      user = isEmailExits;
    }
    const isPasswordMatch = await bcrypt.compare(
      password + process.env.BCRYPT_STR,
      user.password
    );
    return isPasswordMatch
      ? apiResponse(res, { status: 200, result: authTokenGenerator(user._id) })
      : apiResponse(res, { status: 404, error: "Invalid Credentials" });
  } catch (error) {
    return apiResponse(res, { status: 400, error });
  }
});

app.listen(PORT, () => {
  console.log("server is runing on port", PORT);
});
