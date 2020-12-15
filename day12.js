"use strict";

// Part 1
// ======

const part1 = (input) => {
  const directions = input.split(/\r?\n/).map((line) => {
    return {
      direction: line.split("")[0],
      magintude: parseInt(line.match(/\d+/)[0]),
    };
  });

  let x = 0,
    y = 0,
    degree = 90;

  for (const d of directions) {
    switch (d.direction) {
      case "N":
        y += d.magintude;
        break;
      case "S":
        y -= d.magintude;
        break;
      case "E":
        x += d.magintude;
        break;
      case "W":
        x -= d.magintude;
        break;
      case "L":
        degree -= d.magintude;
        break;
      case "R":
        degree += d.magintude;
        break;
      case "F":
        degree = degree >= 0 ? degree % 360 : 360 - (Math.abs(degree) % 360);
        if (degree === 0) {
          y += d.magintude;
        } else if (degree === 90) {
          x += d.magintude;
        } else if (degree === 180) {
          y -= d.magintude;
        } else if (degree === 270) {
          x -= d.magintude;
        }
        console.log(degree);
        break;
    }
  }

  return Math.abs(x) + Math.abs(y);
};

// Part 2
// ======

const part2 = (input) => {
  const directions = input.split(/\r?\n/).map((line) => {
    return {
      direction: line.split("")[0],
      magintude: parseInt(line.match(/\d+/)[0]),
    };
  });

  let ship = { x: 0, y: 0 };
  let waypoint = { x: 10, y: 1 };

  for (const d of directions) {
    let old_x = waypoint.x,
      old_y = waypoint.y;
    switch (d.direction) {
      case "N":
        waypoint.y += d.magintude;
        break;
      case "S":
        waypoint.y -= d.magintude;
        break;
      case "E":
        waypoint.x += d.magintude;
        break;
      case "W":
        waypoint.x -= d.magintude;
        break;
      case "L":
        for (let times = d.magintude / 90; times > 0; times--) {
          waypoint.x = -old_y;
          waypoint.y = old_x;
          old_x = waypoint.x;
          old_y = waypoint.y;
        }
        break;
      case "R":
        for (let times = d.magintude / 90; times > 0; times--) {
          waypoint.x = old_y;
          waypoint.y = -old_x;
          old_x = waypoint.x;
          old_y = waypoint.y;
        }
        break;
      case "F":
        ship.x += waypoint.x * d.magintude;
        ship.y += waypoint.y * d.magintude;
        break;
    }
  }

  return Math.abs(ship.x) + Math.abs(ship.y);
};

module.exports = { part1, part2 };
