/* eslint-disable no-undef */
const authService = require("../services/authService");

// REGISTER
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    const user = await authService.registerUser(
      name,
      email,
      password
    );

    res.status(201).json({
      message: "User registered successfully",
      user
    });
  } catch (error) {
    next(error);
  }
};

// LOGIN
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const result = await authService.loginUser(
      email,
      password
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser
};