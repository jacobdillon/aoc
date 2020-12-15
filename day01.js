"use strict";

// Part 1
// ======

const part1 = (input) => {
  const arr = input.split(/\r?\n/).map((x) => parseInt(x, 10));

  for (const i of arr) {
    const needed = 2020 - i;
    if (arr.includes(needed)) {
      return needed * i;
    }
  }
};

// Part 2
// ======

const part2 = (input) => {
  const arr = input.split(/\r?\n/).map((x) => parseInt(x, 10));

  for (const i of arr) {
    const needed = 2020 - i;
    for (const j of arr) {
      const needed2 = needed - j;
      if (arr.includes(needed2)) {
        return needed2 * j * i;
      }
    }
  }
};

module.exports = { part1, part2 };
