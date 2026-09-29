import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getPasswords,
  createPassword,
  updatePassword,
  deletePassword
} from "../controllers/passwordController.js";

const router = express.Router();

router.get("/", authMiddleware, getPasswords);
router.post("/", authMiddleware, createPassword);
router.put("/:id", authMiddleware, updatePassword);
router.delete("/:id", authMiddleware, deletePassword);

export default router;