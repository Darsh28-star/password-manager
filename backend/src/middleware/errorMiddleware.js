/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: "Email already registered"
  });
};

module.exports = errorMiddleware;