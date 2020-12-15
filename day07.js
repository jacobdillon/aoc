"use strict";

// Part 1
// ======

const part1 = (input) => {
  const bags = input.split(/\r?\n/).map((rule) => {
    const r = rule.split(" ");
    let bag = {
      color: r[0] + " " + r[1],
      contains: [],
    };

    if (r.length !== 7) {
      for (let i = 4; i < r.length; i += 4) {
        bag.contains.push(r[i + 1] + " " + r[i + 2]);
      }
    }

    return bag;
  });

  let sum = 0;
  let found = [];

  const find_recurse = (wanted_bag) => {
    for (const bag of bags) {
      if (bag.contains.includes(wanted_bag) && !found.includes(bag.color)) {
        sum++;
        found.push(bag.color);
        find_recurse(bag.color);
      }
    }
  };

  find_recurse("shiny gold");

  return sum;
};

// Part 2
// ======

const part2 = (input) => {
  const bags = input.split(/\r?\n/).map((rule) => {
    const r = rule.split(" ");
    let bag = {
      color: r[0] + " " + r[1],
      contains: [],
    };

    if (r.length !== 7) {
      for (let i = 4; i < r.length; i += 4) {
        bag.contains.push({
          color: r[i + 1] + " " + r[i + 2],
          number: parseInt(r[i]),
        });
      }
    }

    return bag;
  });

  let found = {};

  const find_recurse = (wanted_bag) => {
    const bag = bags.filter((b) => b.color === wanted_bag)[0];
    if (!(bag.color in found)) {
      found[bag.color] = 0;
      for (const contained_bag of bag.contains) {
        find_recurse(contained_bag.color);
        found[bag.color] +=
          contained_bag.number +
          contained_bag.number * found[contained_bag.color];
      }
    }
  };

  find_recurse("shiny gold");

  return found["shiny gold"];
};

module.exports = { part1, part2 };
