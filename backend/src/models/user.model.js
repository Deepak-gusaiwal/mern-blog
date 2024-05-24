import { Schema, model } from "mongoose";
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "Invalid Email"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    avtar: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const User = new model("User", userSchema);
export default User;
