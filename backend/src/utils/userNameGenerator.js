import { nanoid } from "nanoid";
import User from "../models/user.model.js";

export const userNameGenerator = async ({ email = null, name = null }) => {
  let userName;
  if (email) {
    userName = email.split("@")[0];
  } else {
    userName = name;
  }
  let isUserNameExits = await User.findOne({ name: userName });
  // make user name unique
  while (isUserNameExits) {
    userName = `${userName}_${nanoid().substring(0, 5)}`;
    isUserNameExits = await User.findOne({ name: userName });
  }

  return userName;
};
