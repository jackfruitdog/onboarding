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

// Helper function to determine conversion type from a unit
function getTypeFromUnit(unit) {
  for (const [type, units] of Object.entries(VALID_UNITS)) {
    if (units.includes(unit)) {
      return type;
    }
  }
  return null;
}

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
      const tempResult = temperature.convertTemperature(
        numValue,
        from || defaults.temperature.defaultFrom,
        to || defaults.temperature.defaultTo
      );
      return Number.parseFloat(tempResult.toFixed(defaults.precision));
    case "distance":
      const distanceResult = distance.convertDistance(numValue, from, to);
      return Number.parseFloat(distanceResult.toFixed(defaults.precision));
    case "weight":
      const weightResult = weight.convertWeight(numValue, from, to);
      return Number.parseFloat(weightResult.toFixed(defaults.precision));
    default:
      throw new Error("Unknown type " + type);
  }
}

export function compare(value1, unit1, value2, unit2) {
  // Validate inputs
  const numValue1 = Number(value1);
  const numValue2 = Number(value2);
  
  if (isNaN(numValue1) || typeof value1 === "boolean") {
    throw new Error("Invalid numeric value provided for first value");
  }
  if (isNaN(numValue2) || typeof value2 === "boolean") {
    throw new Error("Invalid numeric value provided for second value");
  }

  // Determine conversion type from units
  const type1 = getTypeFromUnit(unit1);
  const type2 = getTypeFromUnit(unit2);

  if (!type1) {
    throw new Error(`Unknown unit: ${unit1}`);
  }
  if (!type2) {
    throw new Error(`Unknown unit: ${unit2}`);
  }
  if (type1 !== type2) {
    throw new Error(`Cannot compare ${unit1} (${type1}) with ${unit2} (${type2})`);
  }

  // Convert both values to the second unit for comparison
  const converted1 = convert(type1, numValue1, unit1, unit2);
  const converted2 = numValue2; // Already in unit2

  // Calculate difference
  const difference = Math.abs(converted1 - converted2);
  const differenceFormatted = Number.parseFloat(difference.toFixed(defaults.precision));

  // Determine which is larger
  let comparison;
  if (converted1 > converted2) {
    comparison = "greater";
  } else if (converted1 < converted2) {
    comparison = "less";
  } else {
    comparison = "equal";
  }

  return {
    value1: converted1,
    value2: converted2,
    unit: unit2,
    difference: differenceFormatted,
    comparison
  };
}
