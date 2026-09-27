require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB =
  require("./config/db");

const logger =
  require("./middleware/logger");

const errorMiddleware =
  require("./middleware/errorMiddleware");

const authRoutes =
  require("./routes/authRoutes");


const app = express();

const PORT =
  process.env.PORT || 5000;


// ==========================
// DATABASE
// ==========================

connectDB();


// ==========================
// MIDDLEWARE
// ==========================

app.use(express.json());

app.use(cors());

app.use(logger);


// ==========================
// HOME
// ==========================

app.get("/", (req, res) => {

  res.json({
    message:
      "Password Manager Backend Running"
  });

});


// ==========================
// AUTH ROUTES
// ==========================

app.use(
  "/api/auth",
  authRoutes
);


// ==========================
// ERROR MIDDLEWARE
// ==========================

app.use(errorMiddleware);


// ==========================
// SERVER
// ==========================

app.listen(
  PORT,
  () => {

    console.log(
      `Server running on http://localhost:${PORT}`
    );

  }
);