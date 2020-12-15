"use strict";

// Part 1
// ======

const part1 = (input) => {
  let mem = [];
  let current_mask = [];
  input.split(/\r?\n/).forEach((line) => {
    if (line.length === 43) {
      current_mask = line
        .split(" ")[2]
        .split("")
        .map((value, i) => {
          if (value !== "X") {
            return {
              i: i,
              value: value,
            };
          } else {
            return false;
          }
        })
        .filter((mask) => mask);
    } else {
      let values = [...line.matchAll(/\d+/g)].map((arr) => parseInt(arr[0]));
      for (const rule of current_mask) {
        let bin = values[1].toString(2).padStart(36, "0").split("");
        bin[rule.i] = rule.value;
        values[1] = parseInt(bin.join(""), 2);
      }
      mem[values[0]] = values[1];
    }
  });
  return mem.reduce((sum, cur) => sum + cur, 0);
};

// Part 2
// ======

const part2 = (input) => {
  let mem = {};
  let current_mask = [];
  input.split(/\r?\n/).forEach((line) => {
    if (line.length === 43) {
      current_mask = line
        .split(" ")[2]
        .split("")
        .map((value, i) => {
          if (value !== "0") {
            return {
              i: i,
              value: value,
            };
          } else {
            return false;
          }
        })
        .filter((mask) => mask);
    } else {
      let [address, value] = [...line.matchAll(/\d+/g)].map((arr) =>
        parseInt(arr[0])
      );
      let bin = address.toString(2).padStart(36, "0").split("");
      current_mask.forEach((rule) => {
        bin[rule.i] = rule.value;
      });
      let incomplete_addresses = [bin];
      let addresses = [];
      while (incomplete_addresses.length !== 0) {
        let current = incomplete_addresses.pop();
        let i = current.indexOf("X");
        if (i === -1) {
          addresses.push(parseInt(current.join(""), 2));
        } else {
          let a1 = [...current],
            a2 = [...current];
          a1[i] = "1";
          a2[i] = "0";
          incomplete_addresses.push(a1, a2);
        }
      }
      addresses.forEach((a) => (mem[a] = value));
    }
  });
  return Object.values(mem).reduce((sum, cur) => sum + cur, 0);
};

// 4603112714

module.exports = {
  part1,
  part2,
};
