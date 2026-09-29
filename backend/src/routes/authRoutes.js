import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  changePassword,
  deleteAccount
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getMe);
router.put("/profile", authMiddleware, updateProfile);
router.put("/change-password", authMiddleware, changePassword);
router.delete("/account", authMiddleware, deleteAccount);

export default router;