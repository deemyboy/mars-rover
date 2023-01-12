import { makeTheSurfaceOfMars, addNewRover } from "./index";
import { createPlateau } from "./modules/plateau";
import { createMarsRover, Rover } from "./modules/rover";

const X_MAX = 100;
const Y_MAX = 100;
describe("mars rover is created facing north at x6,y0", () => {
    const myRover = createMarsRover("North", 6, 0);
    test("a Mars rover is created facing North", () => {
        expect(myRover.facing).toBe("North");
    });
    test("a Mars rover x-coord to be 6", () => {
        expect(myRover.x).toBe(6);
    });
    test("a Mars rover y-coord to be 0", () => {
        expect(myRover.y).toBe(0);
    });
});
describe("testing plateau dimensions", () => {
    const plateau = createPlateau(X_MAX, Y_MAX);
    test(`a plateau is created with x-axis length = ${X_MAX}`, () => {
        expect(plateau.xAxisLength).toBe(X_MAX);
    });
    test(`a plateau is created with y-axis length = ${Y_MAX}`, () => {
        expect(plateau.yAxisLength).toBe(Y_MAX);
    });
    test("a plateau is created with area 60x60=3600", () => {
        expect(plateau.xAxisLength * plateau.yAxisLength).toBe(X_MAX * Y_MAX);
    });
});
describe("testing area of plateau", () => {
    const rovers = [];
    const myRover = createMarsRover("West", 53, 21);
    rovers.push(myRover);
    const surface = makeTheSurfaceOfMars(X_MAX, Y_MAX, rovers);
    test(`surface plateau is ${X_MAX} x ${Y_MAX}`, () => {
        expect(surface.plateau.xAxisLength * surface.plateau.yAxisLength).toBe(
            X_MAX * Y_MAX
        );
    });
});
describe("testing createMarsRover", () => {
    test("a Mars rover is created facing West at 53,21", () => {
        expect(createMarsRover("West", 53, 21).facing).toBe("West");
        expect(createMarsRover("West", 53, 21).x).toBe(53);
        expect(createMarsRover("West", 53, 21).y).toBe(21);
    });
});

describe("testing adding legal and illegal rovers to the surface", () => {
    const rovers: Rover[] = [];
    const surface0 = makeTheSurfaceOfMars(X_MAX, Y_MAX, rovers);
    test("empty rovers array will be empty", () => {
        expect(surface0.marsRoversOnTheSurface).toEqual([]);
    });
    const myRover0 = createMarsRover("West", 0 - Y_MAX - 1, 10);
    const myRover1 = createMarsRover("West", X_MAX - 1, Y_MAX + 35);
    const myRover2 = createMarsRover("West", X_MAX - 1, Y_MAX - 1);
    const surface1 = makeTheSurfaceOfMars(X_MAX, Y_MAX, rovers);
    surface1.marsRoversOnTheSurface = addNewRover(
        myRover0,
        surface1.marsRoversOnTheSurface,
        surface1.plateau
    );
    surface1.marsRoversOnTheSurface = addNewRover(
        myRover1,
        surface1.marsRoversOnTheSurface,
        surface1.plateau
    );
    surface1.marsRoversOnTheSurface = addNewRover(
        myRover2,
        surface1.marsRoversOnTheSurface,
        surface1.plateau
    );
    test(`myRover0 will not fit on plateau  ${X_MAX} x ${Y_MAX}`, () => {
        expect(surface1.marsRoversOnTheSurface).not.toContain(myRover0);
    });
    test(`myRover1 will not fit on plateau  ${X_MAX} x ${Y_MAX}`, () => {
        expect(surface1.marsRoversOnTheSurface).not.toContain(myRover1);
    });
    test(`myRover2 will fit on plateau  ${X_MAX} x ${Y_MAX}`, () => {
        expect(surface1.marsRoversOnTheSurface).toContain(myRover2);
    });
});
describe("testing building the surface of mars with a mix of legal and illegal rovers", () => {
    const myRover0 = createMarsRover("West", 0 - 99, 10);
    const myRover1 = createMarsRover("West", X_MAX - 1, Y_MAX + 35);
    const myRover2 = createMarsRover("West", X_MAX - 1, Y_MAX - 1);
    const rovers = [];
    rovers.push(myRover0, myRover1, myRover2);
    const surface = makeTheSurfaceOfMars(X_MAX, Y_MAX, rovers);
    test(`myRover0 will not fit on plateau  ${X_MAX} x ${Y_MAX}`, () => {
        expect(surface.marsRoversOnTheSurface).not.toContain(myRover0);
    });
    test(`myRover1 will not fit on plateau  ${X_MAX} x ${Y_MAX}`, () => {
        expect(surface.marsRoversOnTheSurface).not.toContain(myRover1);
    });
    test(`myRover2 will fit on plateau  ${X_MAX} x ${Y_MAX}`, () => {
        expect(surface.marsRoversOnTheSurface).toContain(myRover2);
    });
});
describe(`testing adding rovers on the edge cases 0,0 and ${X_MAX},${Y_MAX} to ${X_MAX}x${Y_MAX} plateau`, () => {
    const myRover3 = createMarsRover("West", 0, 0);
    const myRover4 = createMarsRover("South", X_MAX, Y_MAX);
    const rovers = [];
    rovers.push(myRover3, myRover4);
    const surface = makeTheSurfaceOfMars(X_MAX, Y_MAX, rovers);

    test(`myRover3 will fit on plateau  ${X_MAX} x ${Y_MAX}`, () => {
        expect(surface.marsRoversOnTheSurface).toContain(myRover3);
    });
    test(`myRover4 will fit on plateau  ${X_MAX} x ${Y_MAX}`, () => {
        expect(surface.marsRoversOnTheSurface).toContain(myRover4);
    });
});
describe("testing turn left ", () => {
    let myRover = createMarsRover("North", 0, 0);
    myRover = { ...myRover, facing: myRover.turnLeft() };
    test("myRover should face West", () => {
        expect(myRover.getFacing()).toBe("West");
    });
});
describe("testing turn left ", () => {
    let myRover = createMarsRover("West", 0, 0);
    myRover = { ...myRover, facing: myRover.turnLeft() };
    test("myRover should face South", () => {
        expect(myRover.getFacing()).toBe("South");
    });
});
describe("testing turn left ", () => {
    let myRover = createMarsRover("South", 0, 0);
    myRover = { ...myRover, facing: myRover.turnLeft() };
    test("myRover should face East", () => {
        expect(myRover.getFacing()).toBe("East");
    });
});
describe("testing turn left ", () => {
    let myRover = createMarsRover("East", 0, 0);
    myRover = { ...myRover, facing: myRover.turnLeft() };
    test("myRover should face North", () => {
        expect(myRover.getFacing()).toBe("North");
    });
});
describe("testing turn right ", () => {
    let myRover2 = createMarsRover("West", 0, 0);
    myRover2.facing = myRover2.turnRight();
    test("myRover2 should face North", () => {
        expect(myRover2.getFacing()).toBe("North");
    });
});
describe("testing turn right ", () => {
    let myRover3 = createMarsRover("North", 0, 0);
    myRover3.facing = myRover3.turnRight();
    test("myRover3 should face East", () => {
        expect(myRover3.getFacing()).toBe("East");
    });
});
describe("testing turn right ", () => {
    let myRover3 = createMarsRover("East", 0, 0);
    myRover3.facing = myRover3.turnRight();
    test("myRover3 should face South", () => {
        expect(myRover3.getFacing()).toBe("South");
    });
});
describe("testing turn right ", () => {
    let myRover3 = createMarsRover("South", 0, 0);
    myRover3.facing = myRover3.turnRight();
    test("myRover3 should face West", () => {
        expect(myRover3.getFacing()).toBe("West");
    });
});
// const myRover3 = myRover2.turnRight();
// test("myRover3 should face east", () => {
//     expect(myRover3.getFacing()).toBe("East");
// });
// const myRover4 = myRover3.turnRight();
// test("myRover should face south", () => {
//     expect(myRover4.getFacing()).toBe("South");
// });
// const myRover5 = myRover4.turnRight();
// test("myRover5 should face west", () => {
//     expect(myRover5.getFacing()).toBe("West");
// });
// });
describe("testing move ", () => {
    test("myRover should move along the x-axis to 9", () => {
        let myRover = createMarsRover("West", 10, 10);
        let rovers = [];
        rovers.push(myRover);
        const surface = makeTheSurfaceOfMars(X_MAX, Y_MAX, rovers);
        const myMovingRover = surface.marsRoversOnTheSurface[0];
        const myMovedRover = myMovingRover.move(surface.plateau);
        expect(myMovedRover.x).toBe(9);
    });
    test("myRover should move along the y-axis to 9", () => {
        let myRover = createMarsRover("South", 10, 10);
        let rovers = [];
        rovers.push(myRover);
        const surface = makeTheSurfaceOfMars(X_MAX, Y_MAX, rovers);
        const myMovingRover = surface.marsRoversOnTheSurface[0];
        const myMovedRover = myMovingRover.move(surface.plateau);
        expect(myMovedRover.y).toBe(9);
    });
    test("myRover should move along the x-axis to 11", () => {
        let myRover = createMarsRover("East", 10, 10);
        let rovers = [];
        rovers.push(myRover);
        const surface = makeTheSurfaceOfMars(X_MAX, Y_MAX, rovers);
        const myMovingRover = surface.marsRoversOnTheSurface[0];
        const myMovedRover = myMovingRover.move(surface.plateau);
        expect(myMovedRover.x).toBe(11);
    });
    test("myRover should move along the y-axis to 11", () => {
        let myRover = createMarsRover("North", 10, 10);
        let rovers = [];
        rovers.push(myRover);
        const surface = makeTheSurfaceOfMars(X_MAX, Y_MAX, rovers);
        const myMovingRover = surface.marsRoversOnTheSurface[0];
        const myMovedRover = myMovingRover.move(surface.plateau);
        expect(myMovedRover.y).toBe(11);
    });
    test("myRover should NOT move along the x-axis to -1 and stay at 0", () => {
        let myRover = createMarsRover("West", 0, 10);
        let rovers = [];
        rovers.push(myRover);
        const surface = makeTheSurfaceOfMars(X_MAX, Y_MAX, rovers);
        const myMovingRover = surface.marsRoversOnTheSurface[0];
        const myMovedRover = myMovingRover.move(surface.plateau);
        expect(myMovedRover.x).toBe(0);
    });
    test("myRover should NOT move along the y-axis to -1 and stay at 0", () => {
        let myRover = createMarsRover("South", 10, 0);

        let rovers = [];
        rovers.push(myRover);
        const surface = makeTheSurfaceOfMars(X_MAX, Y_MAX, rovers);
        const myMovingRover = surface.marsRoversOnTheSurface[0];
        const myMovedRover = myMovingRover.move(surface.plateau);
        expect(myMovedRover.y).toBe(0);
    });
    test(`myRover should NOT move along the x-axis to xMax +1 === ${
        X_MAX + 1
    } and stay at ${X_MAX}`, () => {
        let myRover = createMarsRover("East", X_MAX, 10);
        let rovers = [];
        rovers.push(myRover);
        const surface = makeTheSurfaceOfMars(X_MAX, Y_MAX, rovers);
        const myMovingRover = surface.marsRoversOnTheSurface[0];
        const myMovedRover = myMovingRover.move(surface.plateau);
        expect(myMovedRover.x).toBe(X_MAX);
    });
    test(`myRover should NOT move along the y-axis to yMax +1 === ${
        Y_MAX + 1
    } and stay at ${Y_MAX}`, () => {
        let myRover = createMarsRover("North", 10, Y_MAX);
        let rovers = [];
        rovers.push(myRover);
        const surface = makeTheSurfaceOfMars(X_MAX, Y_MAX, rovers);
        const myMovingRover = surface.marsRoversOnTheSurface[0];
        const myMovedRover = myMovingRover.move(surface.plateau);
        expect(myMovedRover.y).toBe(Y_MAX);
    });
});
// testing rover can accept a single command
describe("test if rover can accept M (move) commands", () => {
    let myRover = createMarsRover("East", 10, 10);
    let myRover2 = createMarsRover("North", 10, 10);
    let myRover3 = createMarsRover("West", 10, 10);
    let myRove4 = createMarsRover("South", 10, 10);
    let rovers = [];
    rovers.push(myRover, myRover2, myRover3, myRove4);
    const surface = makeTheSurfaceOfMars(X_MAX, Y_MAX, rovers);
    let myMovingRover = surface.marsRoversOnTheSurface[0];
    let myMovedRover = myMovingRover.followOrders("M", surface.plateau);
    test("send 'M' and it should move forward (+1) on the x-axis", () => {
        expect(myMovedRover.x).toBe(11);
    });
    let myMovingRover2 = surface.marsRoversOnTheSurface[1];
    let myMovedRover2 = myMovingRover2.followOrders("M", surface.plateau);
    test("send 'M' and it should move upward (+1) on the y-axis", () => {
        expect(myMovedRover2.y).toBe(11);
    });
    let myMovingRover3 = surface.marsRoversOnTheSurface[2];
    let myMovedRover3 = myMovingRover3.followOrders("M", surface.plateau);
    test("send 'M' and it should move backward (-1) on the x-axis", () => {
        expect(myMovedRover3.x).toBe(9);
    });
    let myMovingRover4 = surface.marsRoversOnTheSurface[3];
    let myMovedRover4 = myMovingRover4.followOrders("M", surface.plateau);
    test("send 'M' and it should move downward (-1) on the y-axis", () => {
        expect(myMovedRover4.y).toBe(9);
    });
});
// testing rover command edge cases
describe("test if rover can accept M (move) commands", () => {
    let myRover = createMarsRover("East", X_MAX, 10);
    let myRover2 = createMarsRover("North", 10, Y_MAX);
    let myRover3 = createMarsRover("West", 0, 10);
    let myRove4 = createMarsRover("South", 10, 0);
    let rovers = [];
    rovers.push(myRover, myRover2, myRover3, myRove4);
    const surface = makeTheSurfaceOfMars(X_MAX, Y_MAX, rovers);
    let myMovingRover = surface.marsRoversOnTheSurface[0];
    let myMovedRover = myMovingRover.followOrders("M", surface.plateau);
    test("send 'M' and it stay put", () => {
        expect(myMovedRover.x).toBe(X_MAX);
    });
    let myMovingRover2 = surface.marsRoversOnTheSurface[1];
    let myMovedRover2 = myMovingRover2.followOrders("M", surface.plateau);
    test("send 'M' and it stay put", () => {
        expect(myMovedRover2.y).toBe(Y_MAX);
    });
    let myMovingRover3 = surface.marsRoversOnTheSurface[2];
    let myMovedRover3 = myMovingRover3.followOrders("M", surface.plateau);
    test("send 'M' and it stay put", () => {
        expect(myMovedRover3.x).toBe(0);
    });
    let myMovingRover4 = surface.marsRoversOnTheSurface[3];
    let myMovedRover4 = myMovingRover4.followOrders("M", surface.plateau);
    test("send 'M' and it stay put", () => {
        expect(myMovedRover4.y).toBe(0);
    });
});
// testing rover mutiple commands
describe("test if rover can accept M (move) commands", () => {
    let myRover = createMarsRover("East", 0, 10);
    let myRover2 = createMarsRover("North", 10, 0);
    let myRover3 = createMarsRover("West", X_MAX, 10);
    let myRove4 = createMarsRover("South", 10, 10);
    // edge tests
    let myRover5 = createMarsRover("East", X_MAX, 10);
    let myRover6 = createMarsRover("North", 10, Y_MAX);
    let myRover7 = createMarsRover("West", 0, 10);
    let myRover8 = createMarsRover("South", 10, 0);

    let rovers = [];
    rovers.push(
        myRover,
        myRover2,
        myRover3,
        myRove4,
        myRover5,
        myRover6,
        myRover7,
        myRover8
    );
    const surface = makeTheSurfaceOfMars(X_MAX, Y_MAX, rovers);
    let myMovingRover = surface.marsRoversOnTheSurface[0];
    let myMovedRover = myMovingRover.followOrders("MMMMLL", surface.plateau);
    test("send 'MMMMLL' to East, 0, 10 -> x=4, facing=West", () => {
        expect(myMovedRover.x).toBe(4);
        expect(myMovedRover.facing).toBe("West");
    });
    test("send 'LL' to East, 0 -> facing=West", () => {});
    let myMovingRover2 = surface.marsRoversOnTheSurface[1];
    let myMovedRover2 = myMovingRover2.followOrders("MMMMMMR", surface.plateau);
    test("send 'MMMMMMR' to 'North', 10, 0 -> y=6, facing=East", () => {
        expect(myMovedRover2.y).toBe(6);
        expect(myMovedRover2.facing).toBe("East");
    });
    let myMovingRover3 = surface.marsRoversOnTheSurface[2];
    let myMovedRover3 = myMovingRover3.followOrders(
        "MLMMRMMR",
        surface.plateau
    );
    test(`send 'MLMMRMMR'  to 'West', ${X_MAX}, 10 -> x=${
        X_MAX - 3
    }, facing=North, y=8 `, () => {
        expect(myMovedRover3.x).toBe(X_MAX - 3);
        expect(myMovedRover3.facing).toBe("North");
        expect(myMovedRover3.y).toBe(8);
    });
    let myMovingRover4 = surface.marsRoversOnTheSurface[3];
    let myMovedRover4 = myMovingRover4.followOrders(
        "LLMMLLMMLL",
        surface.plateau
    );
    test("send 'LLMMLLMMLL' to South, 10, 10 -> y=10, facing=North ", () => {
        expect(myMovedRover4.y).toBe(10);
        expect(myMovedRover4.facing).toBe("North");
    });
    let myMovingRover5 = surface.marsRoversOnTheSurface[0];
    let myMovedRover5 = myMovingRover5.followOrders("MMMMLL", surface.plateau);
    test("send 'MMMMLL' to East, 0, 10 -> x=4, facing=West", () => {
        expect(myMovedRover5.x).toBe(4);
        expect(myMovedRover5.facing).toBe("West");
    });
    test("send 'LL' to East, 0 -> facing=West", () => {});
    let myMovingRover6 = surface.marsRoversOnTheSurface[1];
    let myMovedRover6 = myMovingRover6.followOrders("MMMMMMR", surface.plateau);
    test("send 'MMMMMMR' to 'North', 10, 0 -> y=6, facing=East", () => {
        expect(myMovedRover6.y).toBe(6);
        expect(myMovedRover6.facing).toBe("East");
    });
    let myMovingRover7 = surface.marsRoversOnTheSurface[2];
    let myMovedRover7 = myMovingRover7.followOrders(
        "MLMMRMMR",
        surface.plateau
    );
    test(`send 'MLMMRMMR'  to 'West', ${X_MAX}, 10 -> x=97, facing=North, y=8 `, () => {
        expect(myMovedRover7.x).toBe(X_MAX - 3);
        expect(myMovedRover7.facing).toBe("North");
        expect(myMovedRover7.y).toBe(8);
    });
    let myMovingRover8 = surface.marsRoversOnTheSurface[3];
    let myMovedRover8 = myMovingRover8.followOrders(
        "LLMMLLMMLL",
        surface.plateau
    );
    test("send 'LLMMLLMMLL' to South, 10, 10 -> y=10, facing=North ", () => {
        expect(myMovedRover8.y).toBe(10);
        expect(myMovedRover8.facing).toBe("North");
    });
});

import * as marsProgram1 from "./program/nasaProgram1.json";

describe("using json file to send in a program ", () => {
    test("is the file imported succesfully", () => {
        expect(marsProgram1.plateau).toBe("5 5");
    });
});
describe("create a plateau from imported data", () => {
    expect(marsProgram1.plateau).toBe("5 5");
    const X_MAX = +marsProgram1.plateau.split(" ")[0];
    const Y_MAX = +marsProgram1.plateau.split(" ")[1];
    const plateau = createPlateau(X_MAX, Y_MAX);
    test(`a plateau is created with x-axis length = ${X_MAX}`, () => {
        expect(plateau.xAxisLength).toBe(X_MAX);
    });
    test(`a plateau is created with y-axis length = ${Y_MAX}`, () => {
        expect(plateau.yAxisLength).toBe(Y_MAX);
    });
    test(`a plateau is created with area ${X_MAX} x ${Y_MAX}=${
        X_MAX * Y_MAX
    }`, () => {
        expect(plateau.xAxisLength * plateau.yAxisLength).toBe(X_MAX * Y_MAX);
    });
});

// test boilerplate
describe(" desciption ", () => {
    // test("specific test details", () => {
    //     //
    // });
});
