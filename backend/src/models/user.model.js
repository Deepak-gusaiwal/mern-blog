
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
// ---------------------------------------------------------------------------
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//bcrypting password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
//check password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
//sign jwt
userSchema.methods.generateJWT = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.AUTH_TOKEN_EXPIRY,
  });
};
//verify jwt
userSchema.methods.verifyJWT = function (token) {
  return jwt.verify(token, process.env.JWT_SECRET);
};
const User = new model("User", userSchema);
export default User;
