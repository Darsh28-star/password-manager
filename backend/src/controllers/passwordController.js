import Password from "../models/Password.js";
import { encrypt, decrypt } from "../services/encryptionService.js";

// Helper to calculate password strength
const calculateStrength = (pwd) => {
  if (!pwd) return "Weak";
  let score = 0;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 12) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  if (score >= 4) return "Strong";
  if (score >= 2) return "Medium";
  return "Weak";
};

// GET all passwords for authenticated user
export const getPasswords = async (req, res, next) => {
  try {
    const passwords = await Password.find({ user: req.user.id }).sort({ createdAt: -1 });

    const decryptedPasswords = passwords.map((item) => ({
      id: item._id,
      _id: item._id,
      website: item.website,
      username: item.username,
      password: decrypt(item.password),
      category: item.category || "Other",
      notes: item.notes || "",
      strength: item.strength || calculateStrength(decrypt(item.password)),
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }));

    res.status(200).json(decryptedPasswords);
  } catch (error) {
    next(error);
  }
};

// CREATE a new password
export const createPassword = async (req, res, next) => {
  try {
    const { website, username, password, category, notes } = req.body;

    if (!website || !username || !password) {
      return res.status(400).json({
        message: "Website, username and password are required"
      });
    }

    const encryptedPassword = encrypt(password);
    const strength = calculateStrength(password);

    const newPassword = await Password.create({
      user: req.user.id,
      website,
      username,
      password: encryptedPassword,
      category: category || "Other",
      notes: notes || "",
      strength
    });

    res.status(201).json({
      message: "Password saved successfully",
      password: {
        id: newPassword._id,
        _id: newPassword._id,
        website: newPassword.website,
        username: newPassword.username,
        password: password,
        category: newPassword.category,
        notes: newPassword.notes,
        strength: newPassword.strength,
        createdAt: newPassword.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE password by ID
export const updatePassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { website, username, password, category, notes } = req.body;

    const existingPassword = await Password.findOne({ _id: id, user: req.user.id });
    if (!existingPassword) {
      return res.status(404).json({ message: "Password entry not found" });
    }

    if (website) existingPassword.website = website;
    if (username) existingPassword.username = username;
    if (category) existingPassword.category = category;
    if (notes !== undefined) existingPassword.notes = notes;
    if (password) {
      existingPassword.password = encrypt(password);
      existingPassword.strength = calculateStrength(password);
    }

    await existingPassword.save();

    res.status(200).json({
      message: "Password updated successfully",
      password: {
        id: existingPassword._id,
        _id: existingPassword._id,
        website: existingPassword.website,
        username: existingPassword.username,
        password: password ? password : decrypt(existingPassword.password),
        category: existingPassword.category,
        notes: existingPassword.notes,
        strength: existingPassword.strength
      }
    });
  } catch (error) {
    next(error);
  }
};

// DELETE password by ID
export const deletePassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Password.findOneAndDelete({ _id: id, user: req.user.id });

    if (!result) {
      return res.status(404).json({ message: "Password entry not found" });
    }

    res.status(200).json({ message: "Password deleted successfully" });
  } catch (error) {
    next(error);
  }
};
