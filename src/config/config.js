// src/config/config.js
const config = {
  port: process.env.PORT || 5000,
  host: process.env.HOST || "0.0.0.0",
  precalculationSize: process.env.PRECALCULATION_SIZE || 100,
  environment: process.env.NODE_ENV || "development",
  logLevel: process.env.LOG_LEVEL || "info",
};

module.exports = config;
