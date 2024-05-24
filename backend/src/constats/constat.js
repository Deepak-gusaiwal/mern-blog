import User from "../models/user.model.js";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
// 1. Api Response Function
export const apiResponse = (res, { result, status, error = false }) => {
  if (error) {
    const errorMessage = error instanceof Error ? error.message : error;
    return res.status(status).json({ success: false, error: errorMessage });
  }
  return res.status(status).json({ success: true, result });
};
// 2. email to unique name
export const useNameGenerator = async ({ email = null, name = null }) => {
  let userName;
  if (email) {
    userName = email.split("@")[0];
  } else {
    userName = name;
  }
  let isUserNameExits = await User.findOne({ name: userName });
  isUserNameExits ? (userName += `_${nanoid().substring(0, 5)}`) : "";
  return userName;
};
// 3. authToken Generator
export const authTokenGenerator = (
  data = null,
  options = { expiresIn: "1h" }
) => {
  if (!data) throw new Error("Error In AuthTokenGenerator :: Auth Data is Not Passed");
  return jwt.sign({ userId: data }, process.env.JWT_STR, {
    ...options,
  });
};
