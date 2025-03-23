const { MagicMathService } = require("./magicMathService");

describe("MagicMathService", () => {
  let service;

  beforeAll(() => {
    service = new MagicMathService();
  });

  test("should calculate Magic Math value for 0", () => {
    const result = service.calculate(0);
    expect(result).toBe(0);
  });

  test("should calculate Magic Math value for 1", () => {
    const result = service.calculate(1);
    expect(result).toBe(1);
  });

  test("should calculate Magic Math value for 10", () => {
    const result = service.calculate(10);
    expect(result).toBe(364);
  });
});
