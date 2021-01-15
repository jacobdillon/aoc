"use strict";

// Part 1
// ======

const part1 = (input) => {
  const solve = (stack) => {
    while (stack.length !== 1) {
      let n1 = stack.shift();
      if (/\d/.test(n1)) {
        n1 = parseInt(n1);
        const operator = stack.pop();
        let n2 = stack.pop();
        if (n2 === "(") {
          let open_counter = 0,
            complete = false,
            new_stack = [];
          while (!complete) {
            let current = stack.pop();
            if (current === ")") {
              if (open_counter == 0) {
                complete = true;
              } else {
                open_counter--;
                new_stack.push(current);
              }
            } else {
              new_stack.push(current);
            }
          }
          n2 = solve(new_stack);
        }
        n2 = parseInt(n2);
        if (operator === "+") {
          stack.push(n1 + n2);
        } else if (operator === "*") {
          stack.push(n1 * n2);
        }
      } else if (n1 === "(") {
        let open_counter = 0,
          complete = false,
          new_stack = [];
        while (!complete) {
          let current = stack.pop();
          if (current === ")") {
            if (open_counter == 0) {
              complete = true;
            } else {
              open_counter--;
              new_stack.push(current);
            }
          } else {
            new_stack.push(current);
          }
        }
        stack.push(solve(new_stack));
      }
    }
    return stack[0];
  };
  return input
    .split(/\n/)
    .map((eqn) => eqn.replace(/\s+/g, "").split(""))
    .map(solve)
    .reduce((sum, cur) => sum + cur, 0);
};

// Part 2
// ======

const part2 = (input) => {
  return input;
};

module.exports = { part1, part2 };
