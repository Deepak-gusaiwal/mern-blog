import express from "express";
import { getUser, login, signup } from "../controllers/user.controller.js";
const router = express.Router();
// 1. Signup
router.post("/signup", signup);
//2. login
router.post("/login", login);
//3. get user
router.get("/:userId", getUser);

export default router;
