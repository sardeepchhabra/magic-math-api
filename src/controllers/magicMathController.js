// src/controllers/magicMathController.js
const { MagicMathService } = require("../services/magicMathService");

/**
 * Controller for Magic Math operations
 * Follows the Single Responsibility Principle by handling only HTTP concerns
 */
class MagicMathController {
  constructor() {
    this.magicMathService = new MagicMathService();
  }

  /**
   * Calculate Magic Math value for a given number
   * Using an arrow function to maintain 'this' context
   */
  calculate = (req, res, next) => {
    try {
      const { n } = req.validatedParams;
      const result = this.magicMathService.calculate(n);

      res.json({
        status: "success",
        data: {
          n,
          result,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = { MagicMathController };
