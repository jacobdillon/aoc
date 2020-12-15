"use strict";

// Part 1
// ======

const part1 = (input) => {
  const adapters = input.split(/\r?\n/).map((adapter) => parseInt(adapter, 10));
  let differences = { one: [], three: [22] };
  let current = 0,
    max_rating = Math.max(...adapters);

  while (current !== max_rating) {
    if (adapters.includes(current + 1)) {
      differences.one.push(current + 1);
      current++;
    } else if (adapters.includes(current + 3)) {
      differences.three.push(current + 3);
      current += 3;
    }
  }

  return differences.one.length * differences.three.length;
};

// Part 2
// ======

const part2 = (input) => {
  const adapters = input
    .split(/\r?\n/)
    .map((adapter) => parseInt(adapter, 10))
    .sort((a, b) => a - b);
  adapters.unshift(0);
  let cache = {};

  const solutions = (current, index) => {
    if (current === adapters[adapters.length - 1]) {
      return 1;
    } else if (current in cache) {
      return cache[current];
    } else {
      let sum = 0;
      for (let i = index; i < adapters.length; i++) {
        const adapter = adapters[i];
        if (adapter - current <= 3 && adapter - current >= 1) {
          sum += solutions(adapter, i + 1);
        }
      }
      cache[current] = sum;
      return sum;
    }
  };

  return solutions(adapters[0], 0);
};

module.exports = { part1, part2 };
