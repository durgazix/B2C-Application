import express from "express";
import { registerUser, loginUser, getProfile, deleteUser, postUserData } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.delete("/logoutProfile", protect, deleteUser);
router.post("/contact", postUserData);


export default router;
