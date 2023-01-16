# MASA - Rovers on Mars

---

**Welcome to MASA Mars rover control!**

This is a TypeScript project that uses Jest for testing.

It is using modern JS (ES6) features such as arrow functions and array methods such as map, filter and reduce.

### Mission

Land rovers on Mars and control them through simple orders.

Create a surface plateau represented by a 2d grid.

Next we need to create a rover placed on the plateau by x and y coordinate and a facing attribute to show which of the 4 ordinal comapss point the rover is facing (N,S,E,W).

The rovers can

> Move - 1 space

> Turn left 90 deg

> Turn right 90 deg

If we send "MMLLMM" the rover should move forward 2 spaces in the direction it's facing, turn left 180 deg (2 x 90) and then move forward 2
spaces.

### Installation

After cloning the project from *https://github.com/deemyboy/mars-rover* run

`npm install`

This should install all the dependencies.

### This is project not complete and is a test based project only!

To run tests you shold simply be able to type `npm test` and look for the result in the terminal.
