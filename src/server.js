// src/server.js
const express = require("express");
const { configureMiddleware } = require("./middlewares/middleware");
const { magicMathRoutes } = require("./routes/magicMathRoutes");
const { errorHandler, notFoundHandler } = require("./middlewares/errorHandler");
const config = require("./config/config");

function createServer() {
  const app = express();

  // Apply middleware
  configureMiddleware(app);

  // Apply routes
  app.use("/", magicMathRoutes);

  // Handle 404 for any undefined routes
  app.use(notFoundHandler);

  // Apply error handling (must be after routes)
  app.use(errorHandler);

  return app;
}

function startServer() {
  const app = createServer();

  const server = app.listen(config.port, config.host, () => {
    console.log(
      `Magic Math API running at http://${config.host}:${config.port}`
    );
  });

  // Graceful shutdown
  process.on("SIGTERM", () => {
    console.log("SIGTERM signal received: closing HTTP server");
    server.close(() => {
      console.log("HTTP server closed");
      process.exit(0);
    });
  });

  return server;
}

// Only call startServer if this file is the main module
if (require.main === module) {
  startServer();
}

module.exports = { createServer, startServer };
