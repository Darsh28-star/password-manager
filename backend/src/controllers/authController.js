import bcrypt from "bcrypt";
import * as authService from "../services/authService.js";
import User from "../models/User.js";
import Password from "../models/Password.js";

// REGISTER
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    const user = await authService.registerUser(name, email, password);

    res.status(201).json({
      message: "User registered successfully",
      user
    });
  } catch (error) {
    next(error);
  }
};

// LOGIN
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const result = await authService.loginUser(email, password);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// GET CURRENT USER PROFILE
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// UPDATE USER PROFILE
export const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    // Check if email is already taken by another user
    const existingUser = await User.findOne({ email, _id: { $ne: req.user.id } });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already taken by another account" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.email = email;
    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
};

// CHANGE MASTER PASSWORD
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Current password and new password are required" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify current master password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect current master password" });
    }

    // Hash and update new password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Master password changed successfully" });
  } catch (error) {
    next(error);
  }
};

// DELETE USER ACCOUNT AND ALL VAULT DATA
export const deleteAccount = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Delete all passwords belonging to user
    await Password.deleteMany({ user: userId });

    // Delete user account
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "Account and vault data deleted successfully" });
  } catch (error) {
    next(error);
  }
};