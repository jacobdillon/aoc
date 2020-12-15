"use strict";

// Part 1
// ======

const part1 = (input) => {
  const groups = input.split(/\n\n/).map((group) => {
    let yes = 0;
    let found = [];
    Array.from(group).forEach((c) => {
      if (c !== "\n" && found.indexOf(c) === -1) {
        yes++;
        found.push(c);
      }
    });

    return yes;
  });

  return groups.reduce((sum, n) => sum + n, 0);
};

// Part 2
// ======

const part2 = (input) => {
  const groups = input.split(/\n\n/).map((group) => {
    let found = new Set();

    Array.from(group).forEach((c) => {
      if (c !== "\n") {
        found.add(c);
      }
    });

    group.split(/\n/).forEach((person) => {
      found.forEach((c) => {
        if (!person.includes(c)) {
          found.delete(c);
        }
      });
    });

    return found.size;
  });

  return groups.reduce((sum, n) => sum + n, 0);
};

module.exports = { part1, part2 };
