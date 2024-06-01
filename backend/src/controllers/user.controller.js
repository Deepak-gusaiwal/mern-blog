import { emailRegex, passwordRegex } from "../utils/constat.js";
import { apiResponse, userNameGenerator, BCRYPT, JWT } from "../utils/index.js";
import User from "../models/user.model.js";
//1 .signup user
export const signup = async (req, res) => {
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
    let hashedPassword = await BCRYPT.hashPassword(password);
    // if there has no name means user signup using google auth
    let userName;
    name
      ? (userName = await userNameGenerator({ name }))
      : (userName = await userNameGenerator({ email }));

    const user = await new User({
      name: userName,
      email,
      password: hashedPassword,
    });
    const result = await user.save();
    //  Generating Auth Token
    return apiResponse(res, {
      result: JWT.authTokenGenerator(result._id),
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
    console.log("error", error);
    return apiResponse(res, { status: 500, error });
  }
};
//2. login user
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user;
    const isEmailExits = await User.findOne({ email });
    if (!isEmailExits) {
      return apiResponse(res, { status: 404, error: "Invalid Credentials" });
    } else {
      user = isEmailExits;
    }
    const isPasswordMatch = await BCRYPT.comparePassword(
      password,
      user.password
    );
    return isPasswordMatch
      ? apiResponse(res, {
          status: 200,
          result: JWT.authTokenGenerator(user._id),
        })
      : apiResponse(res, { status: 404, error: "Invalid Credentials" });
  } catch (error) {
    return apiResponse(res, { status: 500, error });
  }
};
//3. get user detail
export const getUser = async (req, res) => {
  const { userId } = req.params;
  const token = req.headers["authorization"];
  console.log(userId);
  return;
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
};