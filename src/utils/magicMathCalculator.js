// src/utils/magicMathCalculator.js
/**
 * Calculator for Magic Math sequence
 * Follows the Single Responsibility Principle by focusing only on calculation logic
 */
class MagicMathCalculator {
  constructor() {
    // Cache for storing previously calculated values
    this.cache = new Map();

    // Initialize with base cases
    this.cache.set(0, 0);
    this.cache.set(1, 1);
  }

  /**
   * Pre-calculate Magic Math values up to a certain limit
   */
  precalculate(limit) {
    // Ensure base cases are set
    this.cache.set(0, 0);
    this.cache.set(1, 1);

    for (let i = 2; i <= limit; i++) {
      const result = this.cache.get(i - 1) + this.cache.get(i - 2) + i;
      this.cache.set(i, result);
    }
  }

  /**
   * Compute Magic Math value for any non-negative integer
   * Uses different strategies based on input size
   */
  compute(n) {
    // Base cases or cached values
    if (this.cache.has(n)) {
      return this.cache.get(n);
    }

    // If n is small enough, use dynamic programming approach
    if (n < 1000) {
      return this.computeWithDynamicProgramming(n);
    }

    // For very large values, use iterative approach starting from highest cached value
    return this.computeIteratively(n);
  }

  /**
   * Compute using dynamic programming
   * Efficient for smaller values
   */
  computeWithDynamicProgramming(n) {
    // Find the highest value we already have cached
    let highestCached = 0;

    for (let i = n; i >= 0; i--) {
      if (this.cache.has(i)) {
        highestCached = i;
        break;
      }
    }

    // Calculate from highest cached value up to n
    for (let i = highestCached + 1; i <= n; i++) {
      const result = this.cache.get(i - 1) + this.cache.get(i - 2) + i;
      this.cache.set(i, result);
    }

    return this.cache.get(n);
  }

  /**
   * Compute large values using iteration from highest cached values
   * Avoids excessive memory usage
   */
  computeIteratively(n) {
    // Find highest cached values to start from
    let highestCached = 0;

    for (let i = n - 1; i >= 0; i--) {
      if (this.cache.has(i)) {
        highestCached = i;
        break;
      }
    }

    // We need two consecutive values to continue the sequence
    if (!this.cache.has(highestCached - 1)) {
      this.computeWithDynamicProgramming(highestCached - 1);
    }

    let n1 = this.cache.get(highestCached);
    let n2 = this.cache.get(highestCached - 1);

    for (let i = highestCached + 1; i <= n; i++) {
      const result = n1 + n2 + i;

      // Update iterators
      n2 = n1;
      n1 = result;

      // Selectively cache to avoid memory issues
      if (i % 100 === 0 || i === n) {
        this.cache.set(i, result);
      }
    }

    return n1;
  }
}

module.exports = { MagicMathCalculator };
