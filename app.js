// app.js
const express = require('express');
const app = express();
const port = 5000;

// Memoization cache for the magic_math function
const cache = new Map();

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
    // Check if result is already in cache
    if (cache.has(n)) {
        return cache.get(n);
    }
    
    // Base cases
    if (n === 0) return 0;
    if (n === 1) return 1;
    
    // Recursive case with memoization
    const result = magic_math(n - 1) + magic_math(n - 2) + n;
    cache.set(n, result);
    return result;
}

// Define API endpoint
app.get('/:n', (req, res) => {
    const n = parseInt(req.params.n);
    
    // Input validation
    if (isNaN(n) || n < 0) {
        return res.status(400).json({ error: "Input must be a non-negative integer" });
    }
    
    const result = magic_math(n);
    res.json({ n, result });
});

// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log(`Magic Math API running at http://0.0.0.0:${port}`);
});