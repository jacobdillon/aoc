'use strict'

// Part 1
// ======

const part1 = input => {
  let spoken = input.split(',').map(i => parseInt(i));
  for (let i = spoken.length - 1; i <= 2020 - 1; i++) {
    const v = spoken[i];
    if (spoken.length - 1 === spoken.indexOf(v)) {
      spoken.push(0);
    } else {
      spoken.push(spoken.length - 1 - spoken.slice(0, -1).lastIndexOf(v));
    }
  }
  return spoken[2020 - 1];
}

// Part 2
// ======

const part2 = input => {
  let spoken = {};
  input.split(',').forEach((v, i) => spoken[parseInt(v)] = [i + 1]);
  const initial_length = input.split(',').length;
  let last = input.split(',').map((v) => parseInt(v))[initial_length - 1];
  for (let i = initial_length; i < 30000000; i++) {
    if (spoken[last].length === 1) {
      last = 0;
    } else {
      last = i - spoken[last][spoken[last].length - 2];
    }
    if (!(last in spoken)) {
      spoken[last] = [];
    }
    spoken[last].push(i + 1);
  }
  return(last);
}

module.exports = {
  part1,
  part2
}