// src/middlewares/errorHandler.js
const config = require("../config/config");

/**
 * Global error handling middleware
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  // Log the error
  console.error(`Error processing ${req.method} ${req.originalUrl}:`, err);

  // Send appropriate response based on environment
  const isDevelopment = config.environment === "development";

  const response = {
    status: "error",
    message: isDevelopment ? err.message : "An unexpected error occurred",
  };

  // Include stack trace in development
  if (isDevelopment) {
    response.stack = err.stack;
  }

  res.status(err.status || 500).json(response);
}

/**
 * Middleware to handle 404 errors
 */
function notFoundHandler(req, res) {
  res.status(404).json({
    status: "error",
    message: "Endpoint not found",
  });
}

module.exports = {
  errorHandler,
  notFoundHandler,
};
