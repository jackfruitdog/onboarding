import * as temperature from "./lib/temperature.js";
import * as distance from "./lib/distance.js";
import * as weight from "./lib/weight.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const defaults = JSON.parse(
  readFileSync(join(__dirname, "../config/defaults.json"), "utf-8")
);

// Valid unit codes for each conversion type
const VALID_UNITS = {
  temperature: ["C", "F", "K"],
  distance: ["km", "mi", "m"],
  weight: ["g", "oz", "lb"]
};

export function convert(type, value, from, to) {
  // Validate that value is a valid number
  const numValue = Number(value);
  if (isNaN(numValue) || typeof value === "boolean") {
    throw new Error("Invalid numeric value provided");
  }

  // Validate conversion type
  if (!VALID_UNITS[type]) {
    throw new Error("Unknown type " + type);
  }

  // Validate unit codes
  const validUnits = VALID_UNITS[type];
  if (from && !validUnits.includes(from)) {
    throw new Error(`Invalid unit code '${from}' for ${type} conversion`);
  }
  if (to && !validUnits.includes(to)) {
    throw new Error(`Invalid unit code '${to}' for ${type} conversion`);
  }

  switch (type) {
    case "temperature":
      return temperature.convertTemperature(
        numValue,
        from || defaults.temperature.defaultFrom,
        to || defaults.temperature.defaultTo
      );
    case "distance":
      return distance.convertDistance(numValue, from, to);
    case "weight":
      return weight.convertWeight(numValue, from, to);
    default:
      throw new Error("Unknown type " + type);
  }
}
