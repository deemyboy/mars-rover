import {
    createMartianLandscape,
    createMarsRoverCollection,
    MartianLandscape,
    addNewRovers,
    addNewRoversToExisting,
} from "./modules/martian-landscape";
import { createPlateau } from "./modules/plateau";
import { createMarsRover, Rover, RoverCreationData } from "./modules/rover";

// tests would break when hardcoded - this 2 constants save the headache if the plateua is resized
const X_MAX = 100;
const Y_MAX = 100;

describe("15: testing plateau dimensions", () => {
    const plateau = createPlateau(X_MAX, Y_MAX);
    test(`a plateau is created with x-axis length = ${X_MAX}`, () => {
        expect(plateau.xMax).toBe(X_MAX);
    });
    test(`a plateau is created with y-axis length = ${Y_MAX}`, () => {
        expect(plateau.yMax).toBe(Y_MAX);
    });
    test(`a plateau is created with area ${X_MAX} * ${Y_MAX}=${
        X_MAX * Y_MAX
    }`, () => {
        expect(plateau.xMax * plateau.yMax).toBe(X_MAX * Y_MAX);
    });
});

describe("30: testing createMarsRover", () => {
    test("a Mars rover is created facing West at 53,21", () => {
        const rover = createMarsRover("West", 53, 21);
        expect(rover.facing).toBe("West");
        expect(rover.x).toBe(53);
        expect(rover.y).toBe(21);
    });
});

describe("39: testing createMarsRover using createMarsRoverCollection", () => {
    test("a Mars rovers collection is created with 3x rovers facing: 'West', x: 3, y: 45. The length is 3", () => {
        const roversCollection = createMarsRoverCollection([
            { facing: "West", x: 3, y: 45 },
            { facing: "West", x: 3, y: 45 },
            { facing: "West", x: 3, y: 45 },
        ]);

        expect(roversCollection[0].facing).toBe("West");
        expect(roversCollection[0].x).toBe(3);
        expect(roversCollection[0].y).toBe(45);
        expect(roversCollection.length).toBe(3);
    });
});

describe("54: testing createMartianLandscape to see if non-landing (coord/s off the plateau) and pancaking rovers are not deployed. Should give 4 legal rovers", () => {
    const roverCollectionData: RoverCreationData[] = [
        // 4 legal rovers
        { facing: "West", x: 53, y: -2 }, // not landing
        { facing: "North", x: 53, y: 2 },
        { facing: "East", x: 53, y: 200 }, // not landing
        { facing: "South", x: 53, y: 21 },
        { facing: "North", x: 53, y: 24 },
        { facing: "West", x: 53, y: 24 }, // pancaker
        { facing: "North", x: 3, y: 24 },
    ];

    const surface: MartianLandscape = createMartianLandscape(
        createMarsRoverCollection(roverCollectionData),
        createPlateau(X_MAX, Y_MAX)
    );

    test(`71: count rovers deployed (4) , last one [3] has an x = 3`, () => {
        expect(surface.roversOnMars.length).toBe(4);
        expect(surface.roversOnMars[3].x).toBe(3);
    });
});

describe("77: testing adding more rovers to existing surface", () => {
    const roverCollectionData: RoverCreationData[] = [
        // 4/7 legal rovers
        { facing: "West", x: 53, y: -2 }, // not landing
        { facing: "North", x: 53, y: 2 },
        { facing: "East", x: 53, y: 200 }, // not landing
        { facing: "South", x: 53, y: 21 },
        { facing: "North", x: 53, y: 24 },
        { facing: "West", x: 53, y: 24 }, // pancaker
        { facing: "North", x: 3, y: 24 },
    ];

    let surface: MartianLandscape = createMartianLandscape(
        createMarsRoverCollection(roverCollectionData),
        createPlateau(X_MAX, Y_MAX)
    );
    test(`93: count first rovers deployed `, () => {
        expect(surface.roversOnMars.length).toBe(4);
    });

    const myRover5 = createMarsRover("North", 99, 10);
    const myRover6 = createMarsRover("North", 99, 10); // pancaker
    const myRover7 = createMarsRover("North", 99, 1000); // pancaker
    const rovers2: Rover[] = [];
    rovers2.push(myRover5, myRover6, myRover7);
    const surface2 = {
        ...addNewRoversToExisting(rovers2, surface),
    };
    test(`test addNewRovers (2 rovers but 1 is a pancaker and the other is a floater) - see if new rovers deployed 5`, () => {
        expect(surface2.roversOnMars.length).toBe(5);
    });
});

describe("110: testing creating a collection of mars rovers using createMarsRoverCollection and RoverCreationData for rover data type and  ", () => {
    test("a Mars rover is created facing West at 53,21", () => {
        const roverCollectionCreationData: RoverCreationData[] = [
            { facing: "West", x: 53, y: 21 },
            { facing: "West", x: 53, y: 21 },
            { facing: "West", x: 53, y: 21 },
        ];
        const roverCollection = createMarsRoverCollection(
            roverCollectionCreationData
        );
        expect(roverCollection.length).toBe(3);
        expect(createMarsRover("West", 53, 21).toString()).toEqual(
            roverCollection[0].toString()
        );
    });
});

// describe("testing adding legal and illegal rovers to the surface", () => {
//     const rovers: Rover[] = [];
//     const surface0 = makeTheSurfaceOfMars(X_MAX, Y_MAX, rovers);
//     test("empty rovers array will be empty", () => {
//         expect(surface0.marsRoversOnTheSurface).toEqual([]);
//     });
//     const myRover0 = createMarsRover("West", -10, 10); // illegal
//     const myRover1 = createMarsRover("West", X_MAX - 1, Y_MAX + 35); // illegal
//     const myRover2 = createMarsRover("West", X_MAX - 1, Y_MAX - 1); // legal
//     const myRover3 = createMarsRover("West", X_MAX - 1, Y_MAX - 1); // legal
//     const myRover4 = createMarsRover("West", X_MAX - 1, Y_MAX - 1); // legal
//     const myRoverCollection = [
//         myRover0,
//         myRover1,
//         myRover2,
//         myRover3,
//         myRover4,
//     ];
//     const surface1 = makeTheSurfaceOfMars(X_MAX, Y_MAX, myRoverCollection);

//     test(`myRover0 will not fit on plateau  ${X_MAX} x ${Y_MAX}`, () => {
//         expect(surface1.marsRoversOnTheSurface).not.toContain(myRover0);
//     });
//     test(`myRover1 will not fit on plateau  ${X_MAX} x ${Y_MAX}`, () => {
//         expect(surface1.marsRoversOnTheSurface).not.toContain(myRover1);
//     });
//     test(`myRover2 will fit on plateau  ${X_MAX} x ${Y_MAX}`, () => {
//         expect(surface1.marsRoversOnTheSurface).toContain(myRover2);
//     });
// });
// describe("testing building the surface of mars with a mix of legal and illegal rovers", () => {
//     const myRover0 = createMarsRover("West", 0 - 99, 10);
//     const myRover1 = createMarsRover("West", X_MAX - 1, Y_MAX + 35);
//     const myRover2 = createMarsRover("West", X_MAX - 1, Y_MAX - 1);
//     const rovers = [];
//     rovers.push(myRover0, myRover1, myRover2);
//     const surface = makeTheSurfaceOfMars(X_MAX, Y_MAX, rovers);
//     test(`myRover0 will not fit on plateau  ${X_MAX} x ${Y_MAX}`, () => {
//         expect(surface.marsRoversOnTheSurface).not.toContain(myRover0);
//     });
//     test(`myRover1 will not fit on plateau  ${X_MAX} x ${Y_MAX}`, () => {
//         expect(surface.marsRoversOnTheSurface).not.toContain(myRover1);
//     });
//     test(`myRover2 will fit on plateau  ${X_MAX} x ${Y_MAX}`, () => {
//         expect(surface.marsRoversOnTheSurface).toContain(myRover2);
//     });
// });
// describe(`testing adding rovers on the edge cases 0,0 and ${X_MAX},${Y_MAX} to ${X_MAX}x${Y_MAX} plateau`, () => {
//     const myRover3 = createMarsRover("West", 0, 0);
//     const myRover4 = createMarsRover("South", X_MAX, Y_MAX);
//     const rovers = [];
//     rovers.push(myRover3, myRover4);
//     const surface = makeTheSurfaceOfMars(X_MAX, Y_MAX, rovers);

//     test(`myRover3 will fit on plateau  ${X_MAX} x ${Y_MAX}`, () => {
//         expect(surface.marsRoversOnTheSurface).toContain(myRover3);
//     });
//     test(`myRover4 will fit on plateau  ${X_MAX} x ${Y_MAX}`, () => {
//         expect(surface.marsRoversOnTheSurface).toContain(myRover4);
//     });
// });
// describe("testing turn left ", () => {
//     let myRover = createMarsRover("North", 0, 0);
//     myRover = { ...myRover, facing: myRover.turnLeft() };
//     test("myRover should face West", () => {
//         expect(myRover.getFacing()).toBe("West");
//     });
// });
// describe("testing turn left ", () => {
//     let myRover = createMarsRover("West", 0, 0);
//     myRover = { ...myRover, facing: myRover.turnLeft() };
//     test("myRover should face South", () => {
//         expect(myRover.getFacing()).toBe("South");
//     });
// });
// describe("testing turn left ", () => {
//     let myRover = createMarsRover("South", 0, 0);
//     myRover = { ...myRover, facing: myRover.turnLeft() };
//     test("myRover should face East", () => {
//         expect(myRover.getFacing()).toBe("East");
//     });
// });
// describe("testing turn left ", () => {
//     let myRover = createMarsRover("East", 0, 0);
//     myRover = { ...myRover, facing: myRover.turnLeft() };
//     test("myRover should face North", () => {
//         expect(myRover.getFacing()).toBe("North");
//     });
// });
// describe("testing turn right ", () => {
//     let myRover2 = createMarsRover("West", 0, 0);
//     myRover2.facing = myRover2.turnRight();
//     test("myRover2 should face North", () => {
//         expect(myRover2.getFacing()).toBe("North");
//     });
// });
// describe("testing turn right ", () => {
//     let myRover3 = createMarsRover("North", 0, 0);
//     myRover3.facing = myRover3.turnRight();
//     test("myRover3 should face East", () => {
//         expect(myRover3.getFacing()).toBe("East");
//     });
// });
// describe("testing turn right ", () => {
//     let myRover3 = createMarsRover("East", 0, 0);
//     myRover3.facing = myRover3.turnRight();
//     test("myRover3 should face South", () => {
//         expect(myRover3.getFacing()).toBe("South");
//     });
// });
// describe("testing turn right ", () => {
//     let myRover3 = createMarsRover("South", 0, 0);
//     myRover3.facing = myRover3.turnRight();
//     test("myRover3 should face West", () => {
//         expect(myRover3.getFacing()).toBe("West");
//     });
// });
// // const myRover3 = myRover2.turnRight();
// // test("myRover3 should face east", () => {
// //     expect(myRover3.getFacing()).toBe("East");
// // });
// // const myRover4 = myRover3.turnRight();
// // test("myRover should face south", () => {
// //     expect(myRover4.getFacing()).toBe("South");
// // });
// // const myRover5 = myRover4.turnRight();
// // test("myRover5 should face west", () => {
// //     expect(myRover5.getFacing()).toBe("West");
// // });
// // });
// describe("testing move ", () => {
//     test("myRover should move along the x-axis to 9", () => {
//         let myRover = createMarsRover("West", 10, 10);
//         let rovers = [];
//         rovers.push(myRover);
//         const surface = makeTheSurfaceOfMars(X_MAX, Y_MAX, rovers);
//         const myMovingRover = surface.marsRoversOnTheSurface[0];
//         const myMovedRover = myMovingRover.move(surface.plateau);
//         expect(myMovedRover.x).toBe(9);
//     });
//     test("myRover should move along the y-axis to 9", () => {
//         let myRover = createMarsRover("South", 10, 10);
//         let rovers = [];
//         rovers.push(myRover);
//         const surface = makeTheSurfaceOfMars(X_MAX, Y_MAX, rovers);
//         const myMovingRover = surface.marsRoversOnTheSurface[0];
//         const myMovedRover = myMovingRover.move(surface.plateau);
//         expect(myMovedRover.y).toBe(9);
//     });
//     test("myRover should move along the x-axis to 11", () => {
//         let myRover = createMarsRover("East", 10, 10);
//         let rovers = [];
//         rovers.push(myRover);
//         const surface = makeTheSurfaceOfMars(X_MAX, Y_MAX, rovers);
//         const myMovingRover = surface.marsRoversOnTheSurface[0];
//         const myMovedRover = myMovingRover.move(surface.plateau);
//         expect(myMovedRover.x).toBe(11);
//     });
//     test("myRover should move along the y-axis to 11", () => {
//         let myRover = createMarsRover("North", 10, 10);
//         let rovers = [];
//         rovers.push(myRover);
//         const surface = makeTheSurfaceOfMars(X_MAX, Y_MAX, rovers);
//         const myMovingRover = surface.marsRoversOnTheSurface[0];
//         const myMovedRover = myMovingRover.move(surface.plateau);
//         expect(myMovedRover.y).toBe(11);
//     });
//     test("myRover should NOT move along the x-axis to -1 and stay at 0", () => {
//         let myRover = createMarsRover("West", 0, 10);
//         let rovers = [];
//         rovers.push(myRover);
//         const surface = makeTheSurfaceOfMars(X_MAX, Y_MAX, rovers);
//         const myMovingRover = surface.marsRoversOnTheSurface[0];
//         const myMovedRover = myMovingRover.move(surface.plateau);
//         expect(myMovedRover.x).toBe(0);
//     });
//     test("myRover should NOT move along the y-axis to -1 and stay at 0", () => {
//         let myRover = createMarsRover("South", 10, 0);

//         let rovers = [];
//         rovers.push(myRover);
//         const surface = makeTheSurfaceOfMars(X_MAX, Y_MAX, rovers);
//         const myMovingRover = surface.marsRoversOnTheSurface[0];
//         const myMovedRover = myMovingRover.move(surface.plateau);
//         expect(myMovedRover.y).toBe(0);
//     });
//     test(`myRover should NOT move along the x-axis to xMax +1 === ${
//         X_MAX + 1
//     } and stay at ${X_MAX}`, () => {
//         let myRover = createMarsRover("East", X_MAX, 10);
//         let rovers = [];
//         rovers.push(myRover);
//         const surface = makeTheSurfaceOfMars(X_MAX, Y_MAX, rovers);
//         const myMovingRover = surface.marsRoversOnTheSurface[0];
//         const myMovedRover = myMovingRover.move(surface.plateau);
//         expect(myMovedRover.x).toBe(X_MAX);
//     });
//     test(`myRover should NOT move along the y-axis to yMax +1 === ${
//         Y_MAX + 1
//     } and stay at ${Y_MAX}`, () => {
//         let myRover = createMarsRover("North", 10, Y_MAX);
//         let rovers = [];
//         rovers.push(myRover);
//         const surface = makeTheSurfaceOfMars(X_MAX, Y_MAX, rovers);
//         const myMovingRover = surface.marsRoversOnTheSurface[0];
//         const myMovedRover = myMovingRover.move(surface.plateau);
//         expect(myMovedRover.y).toBe(Y_MAX);
//     });
// });
// // testing rover can accept a single command
// describe("test if rover can accept M (move) commands", () => {
//     let myRover = createMarsRover("East", 10, 10);
//     let myRover2 = createMarsRover("North", 10, 10);
//     let myRover3 = createMarsRover("West", 10, 10);
//     let myRover4 = createMarsRover("South", 10, 10);
//     let rovers = [];
//     rovers.push(myRover, myRover2, myRover3, myRover4);
//     const surface = makeTheSurfaceOfMars(X_MAX, Y_MAX, rovers);
//     let myMovingRover = surface.marsRoversOnTheSurface[0];
//     let myMovedRover = myMovingRover.followOrders("M", surface.plateau);
//     test("send 'M' and it should move forward (+1) on the x-axis", () => {
//         expect(myMovedRover.x).toBe(11);
//     });
//     let myMovingRover2 = surface.marsRoversOnTheSurface[1];
//     let myMovedRover2 = myMovingRover2.followOrders("M", surface.plateau);
//     test("send 'M' and it should move upward (+1) on the y-axis", () => {
//         expect(myMovedRover2.y).toBe(11);
//     });
//     let myMovingRover3 = surface.marsRoversOnTheSurface[2];
//     let myMovedRover3 = myMovingRover3.followOrders("M", surface.plateau);
//     test("send 'M' and it should move backward (-1) on the x-axis", () => {
//         expect(myMovedRover3.x).toBe(9);
//     });
//     let myMovingRover4 = surface.marsRoversOnTheSurface[3];
//     let myMovedRover4 = myMovingRover4.followOrders("M", surface.plateau);
//     test("send 'M' and it should move downward (-1) on the y-axis", () => {
//         expect(myMovedRover4.y).toBe(9);
//     });
// });
// // testing rover command edge cases
// describe("test if rover can accept M (move) commands", () => {
//     let myRover = createMarsRover("East", X_MAX, 10);
//     let myRover2 = createMarsRover("North", 10, Y_MAX);
//     let myRover3 = createMarsRover("West", 0, 10);
//     let myRover4 = createMarsRover("South", 10, 0);
//     let rovers = [];
//     rovers.push(myRover, myRover2, myRover3, myRover4);
//     const surface = makeTheSurfaceOfMars(X_MAX, Y_MAX, rovers);
//     let myMovingRover = surface.marsRoversOnTheSurface[0];
//     let myMovedRover = myMovingRover.followOrders("M", surface.plateau);
//     test("send 'M' and it stay put", () => {
//         expect(myMovedRover.x).toBe(X_MAX);
//     });
//     let myMovingRover2 = surface.marsRoversOnTheSurface[1];
//     let myMovedRover2 = myMovingRover2.followOrders("M", surface.plateau);
//     test("send 'M' and it stay put", () => {
//         expect(myMovedRover2.y).toBe(Y_MAX);
//     });
//     let myMovingRover3 = surface.marsRoversOnTheSurface[2];
//     let myMovedRover3 = myMovingRover3.followOrders("M", surface.plateau);
//     test("send 'M' and it stay put", () => {
//         expect(myMovedRover3.x).toBe(0);
//     });
//     let myMovingRover4 = surface.marsRoversOnTheSurface[3];
//     let myMovedRover4 = myMovingRover4.followOrders("M", surface.plateau);
//     test("send 'M' and it stay put", () => {
//         expect(myMovedRover4.y).toBe(0);
//     });
// });
// // testing rover mutiple commands
// describe("test if rover can accept M (move) commands", () => {
//     let myRover = createMarsRover("East", 0, 10);
//     let myRover2 = createMarsRover("North", 10, 0);
//     let myRover3 = createMarsRover("West", X_MAX, 10);
//     let myRover4 = createMarsRover("South", 10, 10);
//     // edge tests
//     let myRover5 = createMarsRover("East", X_MAX, 10);
//     let myRover6 = createMarsRover("North", 10, Y_MAX);
//     let myRover7 = createMarsRover("West", 0, 10);
//     let myRover8 = createMarsRover("South", 10, 0);

//     let rovers = [];
//     rovers.push(
//         myRover,
//         myRover2,
//         myRover3,
//         myRover4,
//         myRover5,
//         myRover6,
//         myRover7,
//         myRover8
//     );
//     const surface = makeTheSurfaceOfMars(X_MAX, Y_MAX, rovers);
//     let myMovingRover = surface.marsRoversOnTheSurface[0];
//     let myMovedRover = myMovingRover.followOrders("MMMMLL", surface.plateau);
//     test("send 'MMMMLL' to East, 0, 10 -> x=4, facing=West", () => {
//         expect(myMovedRover.x).toBe(4);
//         expect(myMovedRover.facing).toBe("West");
//     });
//     test("send 'LL' to East, 0 -> facing=West", () => {});
//     let myMovingRover2 = surface.marsRoversOnTheSurface[1];
//     let myMovedRover2 = myMovingRover2.followOrders("MMMMMMR", surface.plateau);
//     test("send 'MMMMMMR' to 'North', 10, 0 -> y=6, facing=East", () => {
//         expect(myMovedRover2.y).toBe(6);
//         expect(myMovedRover2.facing).toBe("East");
//     });
//     let myMovingRover3 = surface.marsRoversOnTheSurface[2];
//     let myMovedRover3 = myMovingRover3.followOrders(
//         "MLMMRMMR",
//         surface.plateau
//     );
//     test(`send 'MLMMRMMR'  to 'West', ${X_MAX}, 10 -> x=${
//         X_MAX - 3
//     }, facing=North, y=8 `, () => {
//         expect(myMovedRover3.x).toBe(X_MAX - 3);
//         expect(myMovedRover3.facing).toBe("North");
//         expect(myMovedRover3.y).toBe(8);
//     });
//     let myMovingRover4 = surface.marsRoversOnTheSurface[3];
//     let myMovedRover4 = myMovingRover4.followOrders(
//         "LLMMLLMMLL",
//         surface.plateau
//     );
//     test("send 'LLMMLLMMLL' to South, 10, 10 -> y=10, facing=North ", () => {
//         expect(myMovedRover4.y).toBe(10);
//         expect(myMovedRover4.facing).toBe("North");
//     });
//     let myMovingRover5 = surface.marsRoversOnTheSurface[0];
//     let myMovedRover5 = myMovingRover5.followOrders("MMMMLL", surface.plateau);
//     test("send 'MMMMLL' to East, 0, 10 -> x=4, facing=West", () => {
//         expect(myMovedRover5.x).toBe(4);
//         expect(myMovedRover5.facing).toBe("West");
//     });
//     test("send 'LL' to East, 0 -> facing=West", () => {});
//     let myMovingRover6 = surface.marsRoversOnTheSurface[1];
//     let myMovedRover6 = myMovingRover6.followOrders("MMMMMMR", surface.plateau);
//     test("send 'MMMMMMR' to 'North', 10, 0 -> y=6, facing=East", () => {
//         expect(myMovedRover6.y).toBe(6);
//         expect(myMovedRover6.facing).toBe("East");
//     });
//     let myMovingRover7 = surface.marsRoversOnTheSurface[2];
//     let myMovedRover7 = myMovingRover7.followOrders(
//         "MLMMRMMR",
//         surface.plateau
//     );
//     test(`send 'MLMMRMMR'  to 'West', ${X_MAX}, 10 -> x=97, facing=North, y=8 `, () => {
//         expect(myMovedRover7.x).toBe(X_MAX - 3);
//         expect(myMovedRover7.facing).toBe("North");
//         expect(myMovedRover7.y).toBe(8);
//     });
//     let myMovingRover8 = surface.marsRoversOnTheSurface[3];
//     let myMovedRover8 = myMovingRover8.followOrders(
//         "LLMMLLMMLL",
//         surface.plateau
//     );
//     test("send 'LLMMLLMMLL' to South, 10, 10 -> y=10, facing=North ", () => {
//         expect(myMovedRover8.y).toBe(10);
//         expect(myMovedRover8.facing).toBe("North");
//     });
// });

// describe("create multiple rovers from data", () => {
//     test("multiple rovers are created", () => {
//         //
//         const roverCollection: RoverCreationData[] = [
//             { facing: "North", x: 5, y: 55 },
//             { facing: "North", x: 5, y: 55 },
//             { facing: "North", x: 5, y: 55 },
//         ];
//         const myRoverCollection: Rover[] =
//             createMarsRoverCollection(roverCollection);
//         expect(myRoverCollection.length).toBe(roverCollection.length);

//         expect(myRoverCollection[0].facing).toBe("North");
//         expect(myRoverCollection[1].facing).toBe("North");
//         // expect(myRoverCollection[0]).toBeInstanceOf(Rover);
//     });
// });

// // test boilerplate
// describe(" desciption ", () => {
//     // test("specific test details", () => {
//     //     //
//     // });
// });
