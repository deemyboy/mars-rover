import {
    createMartianLandscape,
    MartianLandscape,
    addNewRovers,
    addNewRoversToExisting,
} from "./martian-landscape.js";
import { createPlateau } from "../plateau/plateau.js";
import {
    RoverCreationData,
    Rover,
    createMarsRover,
    createMarsRoverCollection,
} from "../rover/rover.js";

import { X_MAX, Y_MAX } from "../constants/constants.js";

describe("testing createMartianLandscape to see if non-landing (coord/s off the plateau) and pancaking rovers are not deployed. Should give 4 legal rovers", () => {
    const plateau = createPlateau(X_MAX, Y_MAX);
    const roverCollectionData: RoverCreationData[] = [
        // 4 legal rovers
        { facing: "W", x: 53, y: -2 }, // not landing
        { facing: "N", x: 53, y: 2 },
        { facing: "E", x: 53, y: 200 }, // not landing
        { facing: "S", x: 53, y: 21 },
        { facing: "N", x: 53, y: 24 },
        { facing: "W", x: 53, y: 24 }, // pancaker
        { facing: "N", x: 3, y: 24 },
    ];

    const marsLandscape: MartianLandscape = createMartianLandscape(
        createMarsRoverCollection(roverCollectionData),
        plateau
    );

    test(`71: count rovers deployed (4) , last one [3] is facing N,x:3, y:24`, () => {
        expect(marsLandscape.roversOnMars.length).toBe(4);
        expect(marsLandscape.roversOnMars[3].getFacing()).toBe("N");
        expect(marsLandscape.roversOnMars[3].x).toBe(3);
        expect(marsLandscape.roversOnMars[3].y).toBe(24);
    });
});

describe("testing adding more rovers to existing marsLandscape", () => {
    const roverCollectionData: RoverCreationData[] = [
        // 4/7 legal rovers
        { facing: "W", x: 53, y: -2 }, // not landing
        { facing: "N", x: 53, y: 2 },
        { facing: "E", x: 53, y: 200 }, // not landing
        { facing: "S", x: 53, y: 21 },
        { facing: "N", x: 53, y: 24 },
        { facing: "W", x: 53, y: 24 }, // pancaker
        { facing: "N", x: 3, y: 24 },
    ];

    let marsLandscape: MartianLandscape = createMartianLandscape(
        createMarsRoverCollection(roverCollectionData),
        createPlateau(X_MAX, Y_MAX)
    );
    test(`93: count first rovers deployed `, () => {
        expect(marsLandscape.roversOnMars.length).toBe(4);
    });

    const rover5 = createMarsRover("N", 99, 10);
    const rover6 = createMarsRover("N", 99, 10); // pancaker
    const rover7 = createMarsRover("N", 99, 1000); // floater
    const rovers2: Rover[] = [];
    rovers2.push(rover5, rover6, rover7);
    const surface2 = {
        ...addNewRoversToExisting(rovers2, marsLandscape),
    };
    test(`test addNewRovers (2 rovers but 1 is a pancaker and the other is a floater) - see if new rovers deployed count = 5`, () => {
        expect(surface2.roversOnMars.length).toBe(5);
    });
});

describe(`testing adding rovers on the edge cases 0,0 and ${X_MAX},${Y_MAX} to ${X_MAX}x${Y_MAX} plateau`, () => {
    const plateau = createPlateau(X_MAX, Y_MAX);
    const rover = createMarsRover("W", 0, 0);
    const rover4 = createMarsRover("S", X_MAX, Y_MAX);
    const rovers = [];
    rovers.push(rover, rover4);
    const marsLandscape = createMartianLandscape(rovers, plateau);

    test(`rover will fit on plateau  ${X_MAX} x ${Y_MAX}`, () => {
        expect(marsLandscape.roversOnMars).toContain(rover);
    });
    test(`rover4 will fit on plateau  ${X_MAX} x ${Y_MAX}`, () => {
        expect(marsLandscape.roversOnMars).toContain(rover4);
    });
});
describe("testing move ", () => {
    const plateau = createPlateau(X_MAX, Y_MAX);
    test("rover should move along the x-axis to 9", () => {
        const roverCollectionCreationData: RoverCreationData[] = [
            { facing: "W", x: 10, y: 10 },
        ];
        const rovers = createMarsRoverCollection(roverCollectionCreationData);
        const marsLandscape = createMartianLandscape(rovers, plateau);
        const rover = marsLandscape.roversOnMars[0].move(marsLandscape.plateau);
        expect(rover.x).toBe(9);
    });
    test("rover should move along the y-axis to 9", () => {
        const roverCollectionCreationData: RoverCreationData[] = [
            { facing: "S", x: 10, y: 10 },
        ];
        const rovers = createMarsRoverCollection(roverCollectionCreationData);

        const marsLandscape = createMartianLandscape(rovers, plateau);
        const rover = marsLandscape.roversOnMars[0].move(marsLandscape.plateau);
        expect(rover.y).toBe(9);
    });
    test("rover should move along the x-axis to 11", () => {
        const roverCollectionCreationData: RoverCreationData[] = [
            { facing: "E", x: 10, y: 10 },
        ];
        const rovers = createMarsRoverCollection(roverCollectionCreationData);

        const marsLandscape = createMartianLandscape(rovers, plateau);
        const rover = marsLandscape.roversOnMars[0].move(marsLandscape.plateau);
        expect(rover.x).toBe(11);
    });
    test("rover should move along the y-axis to 11", () => {
        const roverCollectionCreationData: RoverCreationData[] = [
            { facing: "N", x: 10, y: 10 },
        ];
        const rovers = createMarsRoverCollection(roverCollectionCreationData);

        const marsLandscape = createMartianLandscape(rovers, plateau);
        const rover = marsLandscape.roversOnMars[0].move(marsLandscape.plateau);
        expect(rover.y).toBe(11);
    });
});
describe("testing move at the EDGE - rovers should not move", () => {
    const plateau = createPlateau(X_MAX, Y_MAX);
    test(`rover facing W should NOT move along the x-axis to ${
        0 - 1
    } and stay at ${0}`, () => {
        const roverCollectionCreationData: RoverCreationData[] = [
            { facing: "W", x: 0, y: 10 },
        ];
        const rovers = createMarsRoverCollection(roverCollectionCreationData);
        const marsLandscape = createMartianLandscape(rovers, plateau);
        const rover = marsLandscape.roversOnMars[0].move(marsLandscape.plateau);
        expect(rover.x).toBe(0);
    });
    test(`rover facing S should NOT move along the y-axis to ${
        0 - 1
    } and stay at ${0}`, () => {
        const roverCollectionCreationData: RoverCreationData[] = [
            { facing: "S", x: 10, y: 0 },
        ];
        const rovers = createMarsRoverCollection(roverCollectionCreationData);
        const marsLandscape = createMartianLandscape(rovers, plateau);
        const rover = marsLandscape.roversOnMars[0].move(marsLandscape.plateau);
        expect(rover.y).toBe(0);
    });
    test(`rover facing E should NOT move along the x-axis to xMax +1 === ${
        X_MAX + 1
    } and stay at ${X_MAX}`, () => {
        const roverCollectionCreationData: RoverCreationData[] = [
            { facing: "E", x: X_MAX, y: 10 },
        ];
        const rovers = createMarsRoverCollection(roverCollectionCreationData);
        const marsLandscape = createMartianLandscape(rovers, plateau);
        const rover = marsLandscape.roversOnMars[0].move(marsLandscape.plateau);
        expect(rover.x).toBe(X_MAX);
    });
    test(`rover should facing NOT move along the y-axis to yMax +1 === ${
        Y_MAX + 1
    } and stay at ${Y_MAX}`, () => {
        const roverCollectionCreationData: RoverCreationData[] = [
            { facing: "N", x: 10, y: Y_MAX },
        ];
        const rovers = createMarsRoverCollection(roverCollectionCreationData);
        const marsLandscape = createMartianLandscape(rovers, plateau);
        const rover = marsLandscape.roversOnMars[0].move(marsLandscape.plateau);
        expect(rover.y).toBe(Y_MAX);
    });
});
// // testing rover can accept a single command
describe(" test if rover can accept M (move) commands", () => {
    const plateau = createPlateau(X_MAX, Y_MAX);

    const roverCollectionCreationData: RoverCreationData[] = [
        { facing: "E", x: 10, y: 10 },
        { facing: "N", x: 11, y: 10 },
        { facing: "W", x: 12, y: 10 },
        { facing: "S", x: 13, y: 10 },
    ];
    const rovers = createMarsRoverCollection(roverCollectionCreationData);

    const marsLandscape = createMartianLandscape(rovers, plateau);
    // { facing: "E", x: 10, y: 10 }
    const rover = marsLandscape.roversOnMars[0].followOrders(
        "M",
        marsLandscape.plateau
    );
    test(`send 'M' and rover facing ${rover.getFacing()} at ${
        rover.x
    } should move forward (+1) on the x-axis`, () => {
        expect(rover.x).toBe(11);
    });
    // { facing: "N", x: 11, y: 10 }
    const rover2 = marsLandscape.roversOnMars[1].followOrders(
        "M",
        marsLandscape.plateau
    );
    test(`send 'M' and rover2 facing ${rover2.getFacing()} at ${
        rover2.y
    } should move forward (+1) on the y-axis`, () => {
        expect(rover2.y).toBe(11);
    });
    // { facing: "W", x: 12, y: 10 }
    const rover3 = marsLandscape.roversOnMars[2].followOrders(
        "M",
        marsLandscape.plateau
    );
    test("send 'M' and it should move backward (-1) on the x-axis", () => {
        expect(rover3.x).toBe(11);
    });
    // { facing: "S", x: 13, y: 10 }
    const rover4 = marsLandscape.roversOnMars[3].followOrders(
        "M",
        marsLandscape.plateau
    );
    test("send 'M' and it should move downward (-1) on the y-axis", () => {
        expect(rover4.y).toBe(9);
    });
});
// testing rover command edge cases
describe("  test if rover can accept M (move) commands on edge cases", () => {
    const plateau = createPlateau(X_MAX, Y_MAX);

    const roverCollectionCreationData: RoverCreationData[] = [
        { facing: "E", x: X_MAX, y: 10 },
        { facing: "N", x: 10, y: Y_MAX },
        { facing: "W", x: 0, y: 10 },
        { facing: "S", x: 10, y: 0 },
    ];

    const rovers = createMarsRoverCollection(roverCollectionCreationData);
    const marsLandscape = createMartianLandscape(rovers, plateau);
    const rover = marsLandscape.roversOnMars[0].followOrders(
        "M",
        marsLandscape.plateau
    );
    test("send 'M' and it stay put", () => {
        expect(rover.x).toBe(X_MAX);
    });
    const rover2 = marsLandscape.roversOnMars[1].followOrders(
        "M",
        marsLandscape.plateau
    );
    test("send 'M' and it stay put", () => {
        expect(rover2.y).toBe(Y_MAX);
    });
    const rover3 = marsLandscape.roversOnMars[2].followOrders(
        "M",
        marsLandscape.plateau
    );
    test("send 'M' and it stay put", () => {
        expect(rover3.x).toBe(0);
    });
    const rover4 = marsLandscape.roversOnMars[3].followOrders(
        "M",
        marsLandscape.plateau
    );
    test("send 'M' and it stay put", () => {
        expect(rover4.y).toBe(0);
    });
});
// testing rover mutiple commands
describe("  test if rover can accept Multiple (MLLMRRLMMR) commands", () => {
    const plateau = createPlateau(X_MAX, Y_MAX);

    const roverCollectionCreationData: RoverCreationData[] = [
        { facing: "E", x: 10, y: 10 },
        { facing: "N", x: 20, y: 20 },
        { facing: "W", x: X_MAX, y: 10 },
        { facing: "S", x: 40, y: 40 },
        { facing: "E", x: X_MAX, y: 20 },
        { facing: "N", x: 10, y: 0 },
        { facing: "W", x: 0, y: 10 },
        { facing: "S", x: 10, y: 50 },
    ];

    const rovers = createMarsRoverCollection(roverCollectionCreationData);

    const marsLandscape = createMartianLandscape(rovers, plateau);
    // { facing: "E", x: 10, y: 10 },
    const rover = marsLandscape.roversOnMars[0].followOrders(
        "MMMMLL",
        marsLandscape.plateau
    );
    test("send 'MMMMLL' to E, 0, 10 -> x=14, facing=W", () => {
        expect(rover.x).toBe(14);
        expect(rover.facing).toBe("W");
    });
    // { facing: "N", x: 20, y: 20 },
    const rover2 = marsLandscape.roversOnMars[1].followOrders(
        "LL",
        marsLandscape.plateau
    );
    test("send 'LL' to E, 0 -> facing=W", () => {
        expect(rover2.x).toBe(20);
        expect(rover2.y).toBe(20);
        expect(rover2.facing).toBe("S");
    });

    // { facing: "W", x: 30, y: 30 },
    const rover3 = marsLandscape.roversOnMars[2].followOrders(
        "MLMMRMMR",
        marsLandscape.plateau
    );
    test(`send 'MLMMRMMR'  to 'W', ${X_MAX}, 10 -> x=${
        X_MAX - 3
    } , facing=N, y=8`, () => {
        expect(rover3.x).toBe(X_MAX - 3);
        expect(rover3.facing).toBe("N");
        expect(rover3.y).toBe(8);
    });

    // { facing: "N", x: 10, y: 0 },
    const rover4 = marsLandscape.roversOnMars[5].followOrders(
        "MMMMMMR",
        marsLandscape.plateau
    );
    test("send 'MMMMMMR' to 'N', 10, 0 -> y=6, facing=E", () => {
        expect(rover4.y).toBe(6);
        expect(rover4.facing).toBe("E");
    });

    // { facing: "W", x: 0, y: 10 },
    const rover5 = marsLandscape.roversOnMars[6].followOrders(
        "MLMMRMMR",
        marsLandscape.plateau
    );
    test(`send 'MLMMRMMR'  to 'W', ${X_MAX}, 10 -> x=97, facing=N, y=8 `, () => {
        expect(rover5.x).toBe(0);
        expect(rover5.facing).toBe("N");
        expect(rover5.y).toBe(8);
    });

    // { facing: "S", x: 10, y: 50 },
    let rover6 = marsLandscape.roversOnMars[7];
    const rover7 = marsLandscape.roversOnMars[7].followOrders(
        "LLMMLLMMLL",
        marsLandscape.plateau
    );

    test("send 'LLMMLLMMLL' to S, 10, 10 -> y=10, facing=N ", () => {
        expect(rover7.y).toBe(50);
        expect(rover7.facing).toBe("N");
    });
});
