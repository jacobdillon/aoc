"use strict";

const copy_array = (arr) => {
  let new_arr = [];
  for (const line of arr) {
    new_arr.push([...line]);
  }
  return new_arr;
};

const compare_2d_arrays = (a1, a2) => {
  for (let y = 0; y < a1.length; y++) {
    for (let x = 0; x < a1[0].length; x++) {
      if (a1[y][x] !== a2[y][x]) {
        return false;
      }
    }
  }
  return true;
};

// Part 1
// ======

const part1 = (input) => {
  const occupied_adjacent = (x, y, seats) => {
    let sum = 0;
    for (let test_x = x - 1; test_x <= x + 1; test_x++) {
      for (let test_y = y - 1; test_y <= y + 1; test_y++) {
        if (
          test_y >= 0 &&
          test_x >= 0 &&
          test_y < seats.length &&
          test_x < seats[0].length &&
          !(test_x === x && test_y === y) &&
          seats[test_y][test_x] === "#"
        ) {
          sum++;
        }
      }
    }
    return sum;
  };

  const simulate = (s) => {
    let new_s = copy_array(s);
    for (let y = 0; y < s.length; y++) {
      for (let x = 0; x < s[y].length; x++) {
        if (s[y][x] === "#") {
          if (occupied_adjacent(x, y, s) >= 4) {
            new_s[y][x] = "L";
          }
        } else if (s[y][x] === "L") {
          if (occupied_adjacent(x, y, s) === 0) {
            new_s[y][x] = "#";
          }
        }
      }
    }
    return new_s;
  };

  let old_seats = input.split(/\r?\n/).map((line) => line.split(""));
  let new_seats = simulate(old_seats);

  while (!compare_2d_arrays(old_seats, new_seats)) {
    old_seats = new_seats;
    new_seats = simulate(old_seats);
  }

  let occupied = 0;
  for (let y = 0; y < new_seats.length; y++) {
    for (let x = 0; x < new_seats[y].length; x++) {
      if (new_seats[y][x] === "#") {
        occupied++;
      }
    }
  }
  return occupied;
};

// Part 2
// ======

const part2 = (input) => {
  const occupied_adjacent_directional = (x, y, seats) => {
    let sum = 0;
    for (const x_modifier of [-1, 0, 1]) {
      for (const y_modifier of [-1, 0, 1]) {
        let test_x = x + x_modifier;
        let test_y = y + y_modifier;
        while (
          test_x >= 0 &&
          test_y >= 0 &&
          test_x < seats[0].length &&
          test_y < seats.length &&
          seats[test_y][test_x] === "."
        ) {
          test_x += x_modifier;
          test_y += y_modifier;
        }
        if (
          test_x >= 0 &&
          test_y >= 0 &&
          test_x < seats[0].length &&
          test_y < seats.length &&
          !(test_x === x && test_y === y) &&
          seats[test_y][test_x] === "#"
        ) {
          sum++;
        }
      }
    }
    return sum;
  };

  const simulate = (s) => {
    let new_s = copy_array(s);
    for (let y = 0; y < s.length; y++) {
      for (let x = 0; x < s[y].length; x++) {
        if (s[y][x] === "#") {
          if (occupied_adjacent_directional(x, y, s) >= 5) {
            new_s[y][x] = "L";
          }
        } else if (s[y][x] === "L") {
          if (occupied_adjacent_directional(x, y, s) === 0) {
            new_s[y][x] = "#";
          }
        }
      }
    }
    return new_s;
  };

  let old_seats = input.split(/\r?\n/).map((line) => line.split(""));
  let new_seats = simulate(old_seats);

  while (!compare_2d_arrays(old_seats, new_seats)) {
    old_seats = new_seats;
    new_seats = simulate(old_seats);
  }

  let occupied = 0;
  for (let y = 0; y < new_seats.length; y++) {
    for (let x = 0; x < new_seats[y].length; x++) {
      if (new_seats[y][x] === "#") {
        occupied++;
      }
    }
  }

  return occupied;
};

module.exports = { part1, part2 };
