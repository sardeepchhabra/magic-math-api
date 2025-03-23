// src/routes/magicMathRoutes.js
const express = require("express");
const { MagicMathController } = require("../controllers/magicMathController");
const { validateInput } = require("../middlewares/inputValidator");

const router = express.Router();
const magicMathController = new MagicMathController();

// GET calculation for a number
router.get("/:n", validateInput, magicMathController.calculate);

// Health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Handle 404 for any undefined routes within this router
router.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint not found",
  });
});

module.exports = { magicMathRoutes: router };
