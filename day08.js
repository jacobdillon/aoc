"use strict";

const does_terminate = (program) => {
  let pc = 0;
  let accumulator = 0;
  let ran_instructions = [];

  while (pc < program.length) {
    if (!ran_instructions.includes(pc)) {
      ran_instructions.push(pc);
      let instruction = program[pc];
      switch (instruction.operation) {
        case "nop":
          pc++;
          break;
        case "acc":
          accumulator += instruction.argument;
          pc++;
          break;
        case "jmp":
          pc += instruction.argument;
          break;
      }
    } else {
      return [false, accumulator];
    }
  }

  return [true, accumulator];
};

// Part 1
// ======

const part1 = (input) => {
  const program = input.split(/\r?\n/).map((instruction) => {
    return {
      operation: instruction.split(" ")[0],
      argument: parseInt(instruction.split(" ")[1]),
    };
  });

  return does_terminate(program)[1];
};

// Part 2
// ======

const part2 = (input) => {
  const program = input.split(/\r?\n/).map((instruction) => {
    return {
      operation: instruction.split(" ")[0],
      argument: parseInt(instruction.split(" ")[1]),
    };
  });

  let last_tested = 0;

  while (true) {
    for (let i = last_tested; i < program.length; i++) {
      if (program[i].operation === "nop" || program[i].operation === "jmp") {
        program[i].operation = program[i].operation === "nop" ? "jmp" : "nop";
        const result = does_terminate(program);
        if (result[0]) {
          return result[1];
        } else {
          last_tested = i;
          program[i].operation = program[i].operation === "nop" ? "jmp" : "nop";
        }
      }
    }
  }
};

module.exports = { part1, part2 };
