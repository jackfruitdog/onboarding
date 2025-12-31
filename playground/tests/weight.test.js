import { test } from "node:test";
import { strictEqual } from "node:assert";
import { convertWeight } from "../src/lib/weight.js";

test("converts pounds to grams", () => {
  strictEqual(convertWeight(1, "lb", "g"), 453.592);
  strictEqual(convertWeight(2, "lb", "g"), 907.184);
});

test("converts grams to pounds", () => {
  strictEqual(convertWeight(453.592, "g", "lb"), 1);
  strictEqual(convertWeight(907.184, "g", "lb"), 2);
});

test("converts pounds to ounces", () => {
  strictEqual(convertWeight(1, "lb", "oz"), 16);
  strictEqual(convertWeight(2.5, "lb", "oz"), 40);
  strictEqual(convertWeight(0.5, "lb", "oz"), 8);
});

test("converts ounces to pounds", () => {
  strictEqual(convertWeight(16, "oz", "lb"), 1);
  strictEqual(convertWeight(32, "oz", "lb"), 2);
  strictEqual(convertWeight(8, "oz", "lb"), 0.5);
});

test("converts grams to ounces", () => {
  strictEqual(convertWeight(28.3495, "g", "oz"), 1);
});

test("converts ounces to grams", () => {
  strictEqual(convertWeight(1, "oz", "g"), 28.3495);
  strictEqual(convertWeight(2, "oz", "g"), 56.699);
});
