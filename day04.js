"use strict";

// Part 1
// ======

const part1 = (input) => {
  const passports = input.split(/\n\n/).map((line) => {
    var passport = {};
    for (let kv of line.split(/[\n ]/)) {
      kv = kv.split(/:/);
      passport[kv[0]] = kv[1];
    }
    return passport;
  });

  var count = 0;

  for (const passport of passports) {
    if (
      "byr" in passport &&
      "iyr" in passport &&
      "eyr" in passport &&
      "hgt" in passport &&
      "hcl" in passport &&
      "ecl" in passport &&
      "pid" in passport
    ) {
      count++;
    }
  }

  return count;
};

// Part 2
// ======

const part2 = (input) => {
  const passports = input.split(/\n\n/).map((line) => {
    var passport = {};
    for (let kv of line.split(/[\n ]/)) {
      kv = kv.split(/:/);
      passport[kv[0]] = kv[1];
    }
    return passport;
  });

  var count = 0;

  for (const passport of passports) {
    if (
      "byr" in passport &&
      "iyr" in passport &&
      "eyr" in passport &&
      "hgt" in passport &&
      "hcl" in passport &&
      "ecl" in passport &&
      "pid" in passport &&
      passport["byr"] >= 1920 &&
      passport["byr"] <= 2002 &&
      passport["iyr"] >= 2010 &&
      passport["iyr"] <= 2020 &&
      passport["eyr"] >= 2020 &&
      passport["eyr"] <= 2030 &&
      passport["hcl"].match(/#([0-9]|[a-f]){6}/) &&
      passport["ecl"].match(/amb|blu|brn|gry|grn|hzl|oth/) &&
      passport["pid"].match(/\d{9}/) &&
      ((passport["hgt"].match(/\d{3}cm/) &&
        parseInt(passport["hgt"].replace("cm", "")) >= 150 &&
        parseInt(passport["hgt"].replace("cm", "")) <= 193) ||
        (passport["hgt"].match(/\d{2}in/) &&
          parseInt(passport["hgt"].replace("in", "")) >= 59 &&
          parseInt(passport["hgt"].replace("in", "")) <= 76))
    ) {
      count++;
    }
  }

  return count;
};

module.exports = { part1, part2 };
