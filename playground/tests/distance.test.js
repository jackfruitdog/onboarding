import { test } from "node:test";
import { strictEqual } from "node:assert";
import { convertDistance } from "../src/lib/distance.js";

test("converts meters to kilometers", () => {
  strictEqual(convertDistance(1000, "m", "km"), 1);
  strictEqual(convertDistance(500, "m", "km"), 0.5);
  strictEqual(convertDistance(2500, "m", "km"), 2.5);
});

test("converts kilometers to meters", () => {
  strictEqual(convertDistance(1, "km", "m"), 1000);
  strictEqual(convertDistance(5, "km", "m"), 5000);
  strictEqual(convertDistance(0.5, "km", "m"), 500);
});

test("converts meters to miles", () => {
  strictEqual(convertDistance(1609.344, "m", "mi"), 1);
});

test("converts miles to meters", () => {
  strictEqual(convertDistance(1, "mi", "m"), 1609.344);
  strictEqual(convertDistance(2, "mi", "m"), 3218.688);
});

test("converts kilometers to miles", () => {
  strictEqual(convertDistance(1, "km", "mi"), 0.621371);
});

test("converts miles to kilometers", () => {
  strictEqual(convertDistance(1, "mi", "km"), 1 / 0.621371);
});
