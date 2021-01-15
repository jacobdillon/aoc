'use strict'

// Part 1
// ======

const part1 = input => {
  const rules = input.split(/\n\n/)[0].split(/\n/).map((line) => {
    let rules = [];
    const unparsed_rules = line.split('').filter(c => c !== ' ').slice(2);

    return {
      number: line.split(':')[0],
      rules: 
    }
  });
}

// Part 2
// ======

const part2 = input => {
  return input
}

module.exports = { part1, part2 }
