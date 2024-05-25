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
  passwordRegex,
  emailRegex,
  verifyAuthToken,
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
    // Validate the email and password
    if (!emailRegex.test(email)) {
      return apiResponse(res, {
        status: 400,
        error: "Invalid email format",
      });
    }

    if (!passwordRegex.test(password)) {
      return apiResponse(res, {
        status: 400,
        error:
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
      });
    }
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

//3. get user
app.get("/user/get", async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return apiResponse(res, {
      status: 404,
      error: "Auth Token not found",
    });
  }
  try {
    const decoded = verifyAuthToken(token);
    const user = await User.findById(decoded.userId).select("-password"); // Exclude the password
    if (!user) {
      return apiResponse(res, {
        status: 404,
        error: "User not found",
      });
    }
    return apiResponse(res, {
      status: 200,
      result: user,
    });
  } catch (error) {
    console.log("B - Error while get user data ::", error);
    return apiResponse(res, {
      status: 401,
      error: "Invalid token",
    });
  }
});
app.listen(PORT, () => {
  console.log("server is runing on port", PORT);
});
