const { MagicMathCalculator } = require("./magicMathCalculator");

describe("MagicMathCalculator", () => {
  let calculator;

  beforeAll(() => {
    calculator = new MagicMathCalculator();
  });

  test("should calculate Magic Math value for 0", () => {
    const result = calculator.compute(0);
    expect(result).toBe(0);
  });

  test("should calculate Magic Math value for 1", () => {
    const result = calculator.compute(1);
    expect(result).toBe(1);
  });

  test("should calculate Magic Math value for 10", () => {
    const result = calculator.compute(10);
    expect(result).toBe(364);
  });

  test("should precalculate values up to a limit", () => {
    calculator.precalculate(10);
    expect(calculator.cache.get(10)).toBe(364);
  });

  
});