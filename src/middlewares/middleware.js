// src/middlewares/middleware.js
const { errorHandler } = require("./errorHandler");
const { requestLogger } = require("./requestLogger");

/**
 * Configure all middleware for the application
 */
function configureMiddleware(app) {
  // Request logging
  app.use(requestLogger);
  app.use(errorHandler);
  // Could add other middleware like:
  // - CORS
  // - JSON body parser
  // - Rate limiting
  // - Authentication
}

module.exports = { configureMiddleware };
