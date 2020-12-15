"use strict";

const navigate = (right, down, trees) => {
  var i = 0,
    j = 0,
    found = 0;

  while (j < trees.length - 1) {
    i = (i + right) % trees[j].length;
    j += down;

    if (trees[j][i]) {
      found++;
    }
  }

  return found;
};

// Part 1
// ======

const part1 = (input) => {
  const trees = input
    .split(/\r?\n/)
    .map((line) => Array.from(line).map((c) => c === "#"));

  return navigate(3, 1, trees);
};

// Part 2
// ======

const part2 = (input) => {
  const trees = input
    .split(/\r?\n/)
    .map((line) => Array.from(line).map((c) => c === "#"));

  return (
    navigate(1, 1, trees) *
    navigate(3, 1, trees) *
    navigate(5, 1, trees) *
    navigate(7, 1, trees) *
    navigate(1, 2, trees)
  );
};

module.exports = { part1, part2 };
