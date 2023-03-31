class CalculatorUtils {
  static calculate(fn) {
    try {
      const result = new Function("return " + fn)();
      if (!isFinite(result)) return "Can't Divide By Zero";
      return result;
    } catch {
      return "Syntax Error";
    }
  }
}

export default CalculatorUtils;
