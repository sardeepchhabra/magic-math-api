// app.js
const express = require("express");
const app = express();
const port = 5000;

// Pre-calculate common values for better startup performance
const PRECALCULATED_SIZE = 100;
const precalculatedResults = new Map();

/**
 * Calculate the Magic Math value for a given number
 * magic_math(0) = 0
 * magic_math(1) = 1
 * magic_math(N) = magic_math(N−1) + magic_math(N−2) + N
 *
 * @param {Number} n - non-negative integer
 * @returns {Number} - the Magic Math value
 */
function magic_math(n) {
  // Base cases
  if (n === 0) return 0;
  if (n === 1) return 1;

  if (precalculatedResults.has(n)) {
    return precalculatedResults.get(n);
  }

  if (n < PRECALCULATED_SIZE) {
    return calculateWithDP(n);
  }

  // For very large values, use the optimized iterative approach
  // with the highest precalculated values as a starting point
  let n1 = precalculatedResults.get(PRECALCULATED_SIZE - 1);
  let n2 = precalculatedResults.get(PRECALCULATED_SIZE - 2);

  for (let i = PRECALCULATED_SIZE; i <= n; i++) {
    const result = n1 + n2 + i;
    n2 = n1;
    n1 = result;

    // Will cache only if it's a commonly accessed value or
    // moderately sized number to prevent memory issues
    if (i % 100 === 0 || i < 1000) {
      precalculatedResults.set(i, result);
    }
  }

  return n1;
}

function calculateWithDP(n) {
  const dp = [0, 1];

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2] + i;
    precalculatedResults.set(i, dp[i]);
  }

  return dp[n];
}

// Initialize precalculated values at startup
(function initializeCache() {
  calculateWithDP(PRECALCULATED_SIZE - 1);
  console.log(
    `Precalculated ${PRECALCULATED_SIZE} Magic Math values for performance optimization`
  );
})();

app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`
    );
  });
  next();
});

// Define API endpoint
app.get("/:n", (req, res) => {
  const n = parseInt(req.params.n);

  // Input validation
  if (isNaN(n) || n < 0) {
    return res
      .status(400)
      .json({ error: "Input must be a non-negative integer" });
  }

  const result = magic_math(n);
  res.json({ n, result });
});

//for invalid endpoints
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Start the server
app.listen(port, "0.0.0.0", () => {
  console.log(`Magic Math API running at http://127.0.0.1:${port}`);
});
