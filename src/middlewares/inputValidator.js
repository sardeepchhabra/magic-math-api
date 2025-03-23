// src/middlewares/inputValidator.js
/**
 * Validates that the input parameter is a non-negative integer
 */
function validateInput(req, res, next) {
  const n = parseInt(req.params.n);

  if (isNaN(n)) {
    return res.status(400).json({
      status: "error",
      message: "Input must be a number",
    });
  }

  if (n < 0) {
    return res.status(400).json({
      status: "error",
      message: "Input must be a non-negative integer",
    });
  }

  // Add validated parameter to the request
  req.validatedParams = { n };

  next();
}

module.exports = { validateInput };
