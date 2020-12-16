"use strict";

// Part 1
// ======

const part1 = (input) => {
  const categories = input.split(/\n\n/);
  const fields = categories[0]
    .split(/\n| /)
    .filter((s) => /\d/.test(s))
    .map((s) => {
      const values = s.split("-").map((i) => parseInt(i));
      return {
        lb: values[0],
        ub: values[1],
      };
    });
  return categories[2]
    .split(/\n|,/)
    .slice(1)
    .map((i) => parseInt(i))
    .filter((i) => {
      for (const { lb, ub } of fields) {
        if (i >= lb && i <= ub) {
          return false;
        }
      }
      return true;
    })
    .reduce((sum, i) => sum + i, 0);
};

// Part 2
// ======

const part2 = (input) => {
  const categories = input.split(/\n\n/);
  const fields = {};
  categories[0].split(/\n/).forEach((line) => {
    const values = line
      .split(" ")
      .filter((l) => /\d/.test(l))
      .map((v) => {
        return {
          lb: parseInt(v.split("-")[0]),
          ub: parseInt(v.split("-")[1]),
        };
      });
    fields[line.split(":")[0]] = [values[0], values[1]];
  });
  const nearby = categories[2]
    .split(/\n/)
    .slice(1)
    .map((row) => {
      return row.split(",").map((i) => {
        return {
          i: i,
          possible: Object.keys(fields),
        };
      });
    });
  nearby.forEach((row) => {
    row.forEach((i) => {
      i.possible = i.possible.filter(
        (p) =>
          (i.i >= fields[p][0].lb && i.i <= fields[p][0].ub) ||
          (i.i >= fields[p][1].lb && i.i <= fields[p][1].ub)
      );
    });
  });
  const tickets = categories[1]
    .split(/\n/)[1]
    .split(",")
    .map((i) => {
      return {
        i: i,
        possible: Object.keys(fields),
      };
    });
  tickets.forEach((v, i) => {
    nearby.forEach((row) => {
      if (row[i].possible.length > 0) {
        v.possible = v.possible.filter((p) => row[i].possible.includes(p));
      }
    });
  });

  let complete = false;
  while (!complete) {
    complete = true;
    tickets.forEach((v, i) => {
      if (v.possible.length === 1) {
        tickets.forEach((other_v, other_i) => {
          if (other_i !== i) {
            other_v.possible = other_v.possible.filter(
              (p) => p !== v.possible[0]
            );
          }
        });
      } else {
        complete = false;
      }
    });
  }

  return tickets
    .filter((v) => v.possible[0].includes("departure"))
    .reduce((product, current) => product * current.i, 1);
};

module.exports = { part1, part2 };
