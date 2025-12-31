#!/usr/bin/env node
import { convert, compare } from "../src/convert.js";

const [,, command, ...args] = process.argv;

if (!command) {
  console.error("Usage: convert <type> <value> [from] [to]");
  console.error("   or: convert compare <value1> <unit1> <value2> <unit2>");
  process.exit(1);
}

if (command === "compare") {
  // Format: convert compare <value1> <unit1> <value2> <unit2>
  const [value1, unit1, value2, unit2] = args;
  
  if (!value1 || !unit1 || !value2 || !unit2) {
    console.error("Usage: convert compare <value1> <unit1> <value2> <unit2>");
    console.error("Example: convert compare 5 km 3 mi");
    process.exit(1);
  }

  try {
    const result = compare(value1, unit1, value2, unit2);
    
    // Format output
    const value1Converted = Number.parseFloat(result.value1.toFixed(2));
    const value2Converted = Number.parseFloat(result.value2.toFixed(2));
    
    if (result.comparison === "equal") {
      console.log(`${value1} ${unit1} equals ${value2} ${unit2}`);
      console.log(`Both are ${value1Converted} ${result.unit}`);
    } else if (result.comparison === "greater") {
      console.log(`${value1} ${unit1} is greater than ${value2} ${unit2}`);
      console.log(`${value1Converted} ${result.unit} > ${value2Converted} ${result.unit} (difference: ${result.difference} ${result.unit})`);
    } else {
      console.log(`${value1} ${unit1} is less than ${value2} ${unit2}`);
      console.log(`${value1Converted} ${result.unit} < ${value2Converted} ${result.unit} (difference: ${result.difference} ${result.unit})`);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
} else {
  // Original convert command: convert <type> <value> [from] [to]
  const [type, value, from, to] = [command, ...args];
  
  if (!type || !value) {
    console.error("Usage: convert <type> <value> [from] [to]");
    console.error("   or: convert compare <value1> <unit1> <value2> <unit2>");
    process.exit(1);
  }

  try {
    const result = convert(type, Number(value), from, to);
    console.log(result);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}
