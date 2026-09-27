const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

// ======================
// REGISTER
// ======================
const registerUser = async (
  name,
  email,
  password
) => {
  console.log("REGISTER SERVICE CALLED");

  // Check if user already exists
  const existingUser = await User.findOne({
    email
  });

  if (existingUser) {
    throw new Error(
      "Email already registered"
    );
  }

  // Hash password
  const hashedPassword =
    await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email
  };
};


// ======================
// LOGIN
// ======================
const loginUser = async (
  email,
  password
) => {
  console.log("LOGIN SERVICE CALLED");

  // Find user by email
  const user = await User.findOne({
    email
  });

  console.log(
    "USER FOUND:",
    !!user
  );

  // User does not exist
  if (!user) {
    throw new Error(
      "Invalid email or password"
    );
  }

  // Compare entered password
  // with hashed password in database
  const isPasswordCorrect =
    await bcrypt.compare(
      password,
      user.password
    );

  console.log(
    "PASSWORD CORRECT:",
    isPasswordCorrect
  );

  // Wrong password
  if (!isPasswordCorrect) {
    throw new Error(
      "Invalid email or password"
    );
  }

  // Create JWT
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h"
    }
  );

  // Send response
  return {
    message: "Login successful",

    token,

    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  };
};


module.exports = {
  registerUser,
  loginUser
};