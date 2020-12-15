"use strict";

// Part 1
// ======

const part1 = (input) => {
  const seat_ids = input.split(/\r?\n/).map((code) => {
    let lbr = 0,
      ubr = 128,
      lbc = 0,
      ubc = 8;
    let row, col;
    Array.from(code).forEach((c, i) => {
      switch (c) {
        case "F":
          ubr -= (ubr - lbr) / 2;
          if (code[i + 1].match(/R|L/)) {
            row = ubr - 1;
          }
          break;
        case "B":
          lbr += (ubr - lbr) / 2;
          if (code[i + 1].match(/R|L/)) {
            row = lbr;
          }
          break;
        case "L":
          ubc -= (ubc - lbc) / 2;
          if (i + 1 === code.length) {
            col = ubc - 1;
          }
          break;
        case "R":
          lbc += (ubc - lbc) / 2;
          if (i + 1 === code.length) {
            col = lbc;
          }
          break;
      }
    });
    return row * 8 + col;
  });
  return Math.max(...seat_ids);
};

// Part 2
// ======

const part2 = (input) => {
  let plane = Array.from({ length: 128 }, () =>
    Array.from({ length: 8 }, () => false)
  );

  input.split(/\r?\n/).forEach((code) => {
    let lbr = 0,
      ubr = 128,
      lbc = 0,
      ubc = 8;
    let row, col;
    Array.from(code).forEach((c, i) => {
      switch (c) {
        case "F":
          ubr -= (ubr - lbr) / 2;
          if (code[i + 1].match(/R|L/)) {
            row = ubr - 1;
          }
          break;
        case "B":
          lbr += (ubr - lbr) / 2;
          if (code[i + 1].match(/R|L/)) {
            row = lbr;
          }
          break;
        case "L":
          ubc -= (ubc - lbc) / 2;
          if (i + 1 === code.length) {
            col = ubc - 1;
          }
          break;
        case "R":
          lbc += (ubc - lbc) / 2;
          if (i + 1 === code.length) {
            col = lbc;
          }
          break;
      }
    });

    plane[row][col] = true;
  });

  for (let i = 1; i < 127; i++) {
    const col = plane[i].indexOf(false);
    let mine = true;
    if (col > -1) {
      for (let j = 0; j < 8; j++) {
        if (!plane[i - 1][j] || !plane[i + 1][j]) {
          mine = false;
        }
      }
      if (mine) {
        return i * 8 + col;
      }
    }
  }
};

module.exports = { part1, part2 };
