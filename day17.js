"use strict";

const array_equals = (a, b) =>
  a.length === b.length && a.every((v, i) => v === b[i]);

const display = (cubes) => {
  let min_x = 0,
    min_y = 0,
    max_x = 0,
    max_y = 0,
    min_z = 0,
    max_z = 0;
  Object.keys(cubes)
    .filter((c) => cubes[c])
    .map((c) => c.split(",").map((x) => parseInt(x)))
    .forEach(([x, y, z]) => {
      if (x < min_x) {
        min_x = x;
      }
      if (x > max_x) {
        max_x = x;
      }
      if (y < min_y) {
        min_y = y;
      }
      if (y > max_y) {
        max_y = y;
      }
      if (z < min_z) {
        min_z = z;
      }
      if (z > max_z) {
        max_z = z;
      }
    });
  // console.log(min_x + " " + max_x + " " + min_y + " " + max_y + " " + max_z);
  for (let z = min_z; z <= max_z; z++) {
    console.log("z: " + z);
    for (let y = min_y; y <= max_y; y++) {
      let row = "";
      for (let x = min_x; x <= max_x; x++) {
        if ([x, y, z] in cubes && cubes[[x, y, z]]) {
          row += "#";
        } else {
          row += ".";
        }
      }
      console.log(row);
    }
    console.log();
  }
  console.log("--------------------\n");
};

// Part 1
// ======

const part1 = (input) => {
  let cubes = {};
  input.split(/\n/).forEach((row, y) => {
    row.split("").forEach((cube, x) => {
      cubes[[x, y, 0]] = cube === "#";
    });
  });
  // display(cubes);
  for (let i = 0; i < 6; i++) {
    let considering = new Set(
      Object.keys(cubes).map((c) => c.split(",").map((x) => parseInt(x)))
    );
    let also_considering = new Set();
    for (const [x, y, z] of considering) {
      for (let test_z = z - 1; test_z <= z + 1; test_z++) {
        for (let test_y = y - 1; test_y <= y + 1; test_y++) {
          for (let test_x = x - 1; test_x <= x + 1; test_x++) {
            also_considering.add([test_x, test_y, test_z]);
          }
        }
      }
    }
    let new_state = {};
    new Set([...considering, ...also_considering]).forEach((cube) => {
      const neighbors = ([x, y, z]) => {
        let sum = 0;
        for (let test_z = z - 1; test_z <= z + 1; test_z++) {
          for (let test_y = y - 1; test_y <= y + 1; test_y++) {
            for (let test_x = x - 1; test_x <= x + 1; test_x++) {
              const test = [test_x, test_y, test_z];
              if (
                !array_equals(test, [x, y, z]) &&
                test in cubes &&
                cubes[test]
              ) {
                sum++;
              }
            }
          }
        }
        return sum;
      };
      const n = neighbors(cube);
      if (cube in cubes && cubes[cube]) {
        if (n === 2 || n === 3) {
          new_state[cube] = true;
        } else {
          new_state[cube] = false;
        }
      } else {
        if (n === 3) {
          new_state[cube] = true;
        } else {
          new_state[cube] = false;
        }
      }
    });
    cubes = new_state;
    // display(cubes);
  }
  return Object.keys(cubes).reduce(
    (sum, cube) => (cubes[cube] ? sum + 1 : sum),
    0
  );
};

// Part 2
// ======

const part2 = (input) => {
  let cubes = {};
  input.split(/\n/).forEach((row, y) => {
    row.split("").forEach((cube, x) => {
      cubes[[x, y, 0, 0]] = cube === "#";
    });
  });
  // display(cubes);
  for (let i = 0; i < 6; i++) {
    let considering = new Set(
      Object.keys(cubes).map((c) => c.split(",").map((x) => parseInt(x)))
    );
    let also_considering = new Set();
    for (const [x, y, z, w] of considering) {
      for (let test_w = w - 1; test_w <= w + 1; test_w++) {
        for (let test_z = z - 1; test_z <= z + 1; test_z++) {
          for (let test_y = y - 1; test_y <= y + 1; test_y++) {
            for (let test_x = x - 1; test_x <= x + 1; test_x++) {
              also_considering.add([test_x, test_y, test_z, test_w]);
            }
          }
        }
      }
    }
    let new_state = {};
    new Set([...considering, ...also_considering]).forEach((cube) => {
      const neighbors = ([x, y, z, w]) => {
        let sum = 0;
        for (let test_w = w - 1; test_w <= w + 1; test_w++) {
          for (let test_z = z - 1; test_z <= z + 1; test_z++) {
            for (let test_y = y - 1; test_y <= y + 1; test_y++) {
              for (let test_x = x - 1; test_x <= x + 1; test_x++) {
                const test = [test_x, test_y, test_z, test_w];
                if (
                  !array_equals(test, [x, y, z, w]) &&
                  test in cubes &&
                  cubes[test]
                ) {
                  sum++;
                }
              }
            }
          }
        }
        return sum;
      };
      const n = neighbors(cube);
      if (cube in cubes && cubes[cube]) {
        if (n === 2 || n === 3) {
          new_state[cube] = true;
        } else {
          new_state[cube] = false;
        }
      } else {
        if (n === 3) {
          new_state[cube] = true;
        } else {
          new_state[cube] = false;
        }
      }
    });
    cubes = new_state;
    // display(cubes);
  }
  return Object.keys(cubes).reduce(
    (sum, cube) => (cubes[cube] ? sum + 1 : sum),
    0
  );
};

module.exports = { part1, part2 };
