"use strict";

// Part 1
// ======

const part1 = (input) => {
  const passwords = input.split(/\r?\n/).map((line) => {
    const elements = line.split(/-|: | /);
    return {
      letter: elements[2],
      lower_bound: elements[0],
      upper_bound: elements[1],
      password: elements[3],
    };
  });
  var count = 0;

  for (const password of passwords) {
    const found = (
      password.password.match(new RegExp(password.letter, "g")) || []
    ).length;
    if (found <= password.upper_bound && found >= password.lower_bound) {
      count++;
    }
  }

  return count;
};

// Part 2
// ======

const part2 = (input) => {
  const passwords = input.split(/\r?\n/).map((line) => {
    const elements = line.split(/-|: | /);
    return {
      letter: elements[2],
      positions: [elements[0] - 1, elements[1] - 1],
      password: elements[3],
    };
  });
  var count = 0;

  for (const password of passwords) {
    if (
      (password.password[password.positions[0]] === password.letter &&
        password.password[password.positions[1]] !== password.letter) ||
      (password.password[password.positions[1]] === password.letter &&
        password.password[password.positions[0]] !== password.letter)
    ) {
      count++;
    }
  }

  return count;
};

module.exports = { part1, part2 };
