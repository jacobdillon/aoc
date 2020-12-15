"use strict";

// Part 1
// ======

const part1 = (input) => {
  const earliest = parseInt(input.split(/\r?\n/)[0], 10);
  const ids = input
    .split(/\r?\n/)[1]
    .split(",")
    .filter((id) => id != "x")
    .map((id) => {
      id = parseInt(id, 10);
      let new_id = id;
      while (new_id < earliest) {
        new_id += id;
      }
      return {
        original: id,
        earliest: new_id,
      };
    });
  let earliest_bus = Math.min(...ids.map((id) => id.earliest));
  let waiting_time = earliest_bus - earliest;
  return (
    waiting_time * ids.filter((id) => id.earliest === earliest_bus)[0].original
  );
};

// Part 2
// ======

const part2 = (input) => {
  const ids = input
    .split(/\r?\n/)[1]
    .split(",")
    .map((id, i) => {
      if (id !== "x") {
        return {
          id: parseInt(id),
          i: i,
        };
      } else {
        return false;
      }
    })
    .filter((id) => id);

  let step = ids[0].id;
  let time = 0;
  for (let i = 1; i < ids.length; i++) {
    let id = ids[i];
    while ((time + id.i) % id.id !== 0) {
      time += step;
    }
    step *= id.id;
  }

  return time;
};

module.exports = {
  part1,
  part2,
};
