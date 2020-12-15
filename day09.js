"use strict";

const contains_two_numbers = (number, array) => {
  for (const n of array) {
    const needed = number - n;
    if (array.includes(needed)) {
      return true;
    }
  }
  return false;
};

// Part 1
// ======

const part1 = (input) => {
  const numbers = input.split(/\r?\n/).map((number) => parseInt(number, 10));
  const preamble = 25;
  const considering = 25;

  for (let i = preamble; i < numbers.length; i++) {
    if (!contains_two_numbers(numbers[i], numbers.slice(i - considering, i))) {
      return numbers[i];
    }
  }
};

// Part 2
// ======

const part2 = (input) => {
  const invalid = part1(input);
  const numbers = input.split(/\r?\n/).map((number) => parseInt(number, 10));

  for (let size = 2; ; size++) {
    for (let i = 0; i < numbers.length; i++) {
      const slice = numbers.slice(i, i + size);
      // console.log(slice);
      // console.log(invalid + " " + i + " " + size + " " + slice.reduce((acc, cur) => acc + cur, 0));
      if (slice.reduce((acc, cur) => acc + cur, 0) === invalid) {
        return Math.max(...slice) + Math.min(...slice);
      }
    }
  }
};

module.exports = { part1, part2 };
