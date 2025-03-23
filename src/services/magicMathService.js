// src/services/magicMathService.js
const config = require("../config/config");
const { MagicMathCalculator } = require("../utils/magicMathCalculator");

/**
 * Service layer for Magic Math operations
 * Follows the Single Responsibility Principle by handling business logic
 */
class MagicMathService {
  constructor() {
    this.calculator = new MagicMathCalculator();

    // Pre-calculate common values
    this.precalculateValues();
  }

  /**
   * Pre-calculate common Magic Math values
   */
  precalculateValues() {
    const size = config.precalculationSize;
    this.calculator.precalculate(size);
    console.log(
      `Precalculated ${size} Magic Math values for performance optimization`
    );
  }

  /**
   * Calculate Magic Math value for a given number
   */
  calculate(n) {
    return this.calculator.compute(n);
  }
}

module.exports = { MagicMathService };
