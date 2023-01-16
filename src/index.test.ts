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
    const plateau = createPlateau(X_MAX, Y_MAX);
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

    const marsLandscape: MartianLandscape = createMartianLandscape(
        createMarsRoverCollection(roverCollectionData),
        plateau
    );

    test(`71: count rovers deployed (4) , last one [3] is facing North,x:3, y:24`, () => {
        expect(marsLandscape.roversOnMars.length).toBe(4);
        expect(marsLandscape.roversOnMars[3].getFacing()).toBe("North");
        expect(marsLandscape.roversOnMars[3].x).toBe(3);
        expect(marsLandscape.roversOnMars[3].y).toBe(24);
    });
});

describe("80: testing adding more rovers to existing marsLandscape", () => {
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

    let marsLandscape: MartianLandscape = createMartianLandscape(
        createMarsRoverCollection(roverCollectionData),
        createPlateau(X_MAX, Y_MAX)
    );
    test(`93: count first rovers deployed `, () => {
        expect(marsLandscape.roversOnMars.length).toBe(4);
    });

    const rover5 = createMarsRover("North", 99, 10);
    const rover6 = createMarsRover("North", 99, 10); // pancaker
    const rover7 = createMarsRover("North", 99, 1000); // pancaker
    const rovers2: Rover[] = [];
    rovers2.push(rover5, rover6, rover7);
    const surface2 = {
        ...addNewRoversToExisting(rovers2, marsLandscape),
    };
    test(`test addNewRovers (2 rovers but 1 is a pancaker and the other is a floater) - see if new rovers deployed count = 5`, () => {
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

describe(`127: testing adding rovers on the edge cases 0,0 and ${X_MAX},${Y_MAX} to ${X_MAX}x${Y_MAX} plateau`, () => {
    const plateau = createPlateau(X_MAX, Y_MAX);
    const rover = createMarsRover("West", 0, 0);
    const rover4 = createMarsRover("South", X_MAX, Y_MAX);
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
describe("testing turn left North ", () => {
    let rover = createMarsRover("North", 0, 0);
    rover = { ...rover, facing: rover.turnLeft() };
    test("rover should face West", () => {
        expect(rover.getFacing()).toBe("West");
    });
});
describe("testing turn left West ", () => {
    let rover = createMarsRover("West", 0, 0);
    rover = { ...rover, facing: rover.turnLeft() };
    test("rover should face South", () => {
        expect(rover.getFacing()).toBe("South");
    });
});
describe("testing turn left South ", () => {
    let rover = createMarsRover("South", 0, 0);
    rover = { ...rover, facing: rover.turnLeft() };
    test("rover should face East", () => {
        expect(rover.getFacing()).toBe("East");
    });
});
describe("testing turn left East ", () => {
    let rover = createMarsRover("East", 0, 0);
    rover = { ...rover, facing: rover.turnLeft() };
    test("rover should face North", () => {
        expect(rover.getFacing()).toBe("North");
    });
});
describe("testing turn right from West", () => {
    let rover = createMarsRover("West", 0, 0);
    rover = { ...rover, facing: rover.turnRight() };
    test("rover should face North", () => {
        expect(rover.getFacing()).toBe("North");
    });
});
describe("testing turn right from North", () => {
    let rover = createMarsRover("North", 0, 0);
    rover = { ...rover, facing: rover.turnRight() };
    test("rover should face East", () => {
        expect(rover.getFacing()).toBe("East");
    });
});
describe("testing turn right from East AND first rover not affected by cloned rover turning ", () => {
    let rover = createMarsRover("East", 0, 0);
    rover = { ...rover, facing: rover.turnRight() };
    test("rover should face South", () => {
        expect(rover.getFacing()).toBe("South");
    });
    let rover2 = { ...rover };
    rover2 = { ...rover2, facing: rover2.turnRight() };
    test("rover2 should face West", () => {
        expect(rover2.getFacing()).toBe("West");
    });
    test("rover should STILL be facing South", () => {
        expect(rover.getFacing()).toBe("South");
    });
});
describe("testing turn right from South ", () => {
    let rover = createMarsRover("South", 0, 0);
    rover = { ...rover, facing: rover.turnRight() };
    test("rover should face West", () => {
        expect(rover.getFacing()).toBe("West");
    });
});
describe("208: testing move ", () => {
    const plateau = createPlateau(X_MAX, Y_MAX);
    test("rover should move along the x-axis to 9", () => {
        const roverCollectionCreationData: RoverCreationData[] = [
            { facing: "West", x: 10, y: 10 },
        ];
        const rovers = createMarsRoverCollection(roverCollectionCreationData);
        const marsLandscape = createMartianLandscape(rovers, plateau);
        const rover = marsLandscape.roversOnMars[0].move(marsLandscape.plateau);
        expect(rover.x).toBe(9);
    });
    test("rover should move along the y-axis to 9", () => {
        const roverCollectionCreationData: RoverCreationData[] = [
            { facing: "South", x: 10, y: 10 },
        ];
        const rovers = createMarsRoverCollection(roverCollectionCreationData);

        const marsLandscape = createMartianLandscape(rovers, plateau);
        const rover = marsLandscape.roversOnMars[0].move(marsLandscape.plateau);
        expect(rover.y).toBe(9);
    });
    test("rover should move along the x-axis to 11", () => {
        const roverCollectionCreationData: RoverCreationData[] = [
            { facing: "East", x: 10, y: 10 },
        ];
        const rovers = createMarsRoverCollection(roverCollectionCreationData);

        const marsLandscape = createMartianLandscape(rovers, plateau);
        const rover = marsLandscape.roversOnMars[0].move(marsLandscape.plateau);
        expect(rover.x).toBe(11);
    });
    test("rover should move along the y-axis to 11", () => {
        const roverCollectionCreationData: RoverCreationData[] = [
            { facing: "North", x: 10, y: 10 },
        ];
        const rovers = createMarsRoverCollection(roverCollectionCreationData);

        const marsLandscape = createMartianLandscape(rovers, plateau);
        const rover = marsLandscape.roversOnMars[0].move(marsLandscape.plateau);
        expect(rover.y).toBe(11);
    });
});
describe("258: testing move at the EDGE - rovers should not move", () => {
    const plateau = createPlateau(X_MAX, Y_MAX);
    test(`rover facing West should NOT move along the x-axis to ${
        0 - 1
    } and stay at ${0}`, () => {
        const roverCollectionCreationData: RoverCreationData[] = [
            { facing: "West", x: 0, y: 10 },
        ];
        const rovers = createMarsRoverCollection(roverCollectionCreationData);
        const marsLandscape = createMartianLandscape(rovers, plateau);
        const rover = marsLandscape.roversOnMars[0].move(marsLandscape.plateau);
        expect(rover.x).toBe(0);
    });
    test(`rover facing South should NOT move along the y-axis to ${
        0 - 1
    } and stay at ${0}`, () => {
        const roverCollectionCreationData: RoverCreationData[] = [
            { facing: "South", x: 10, y: 0 },
        ];
        const rovers = createMarsRoverCollection(roverCollectionCreationData);
        const marsLandscape = createMartianLandscape(rovers, plateau);
        const rover = marsLandscape.roversOnMars[0].move(marsLandscape.plateau);
        expect(rover.y).toBe(0);
    });
    test(`rover facing East should NOT move along the x-axis to xMax +1 === ${
        X_MAX + 1
    } and stay at ${X_MAX}`, () => {
        const roverCollectionCreationData: RoverCreationData[] = [
            { facing: "East", x: X_MAX, y: 10 },
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
            { facing: "North", x: 10, y: Y_MAX },
        ];
        const rovers = createMarsRoverCollection(roverCollectionCreationData);
        const marsLandscape = createMartianLandscape(rovers, plateau);
        const rover = marsLandscape.roversOnMars[0].move(marsLandscape.plateau);
        expect(rover.y).toBe(Y_MAX);
    });
});
// // testing rover can accept a single command
describe("306:test if rover can accept M (move) commands", () => {
    const plateau = createPlateau(X_MAX, Y_MAX);

    const roverCollectionCreationData: RoverCreationData[] = [
        { facing: "East", x: 10, y: 10 },
        { facing: "North", x: 11, y: 10 },
        { facing: "West", x: 12, y: 10 },
        { facing: "South", x: 13, y: 10 },
    ];
    const rovers = createMarsRoverCollection(roverCollectionCreationData);

    const marsLandscape = createMartianLandscape(rovers, plateau);
    // { facing: "East", x: 10, y: 10 }
    const rover = marsLandscape.roversOnMars[0].followOrders(
        "M",
        marsLandscape.plateau
    );
    test(`send 'M' and rover facing ${rover.getFacing()} at ${
        rover.x
    } should move forward (+1) on the x-axis`, () => {
        expect(rover.x).toBe(11);
    });
    // { facing: "North", x: 11, y: 10 }
    const rover2 = marsLandscape.roversOnMars[1].followOrders(
        "M",
        marsLandscape.plateau
    );
    test(`send 'M' and rover2 facing ${rover2.getFacing()} at ${
        rover2.y
    } should move forward (+1) on the y-axis`, () => {
        expect(rover2.y).toBe(11);
    });
    // { facing: "West", x: 12, y: 10 }
    const rover3 = marsLandscape.roversOnMars[2].followOrders(
        "M",
        marsLandscape.plateau
    );
    test("send 'M' and it should move backward (-1) on the x-axis", () => {
        expect(rover3.x).toBe(11);
    });
    // { facing: "South", x: 13, y: 10 }
    const rover4 = marsLandscape.roversOnMars[3].followOrders(
        "M",
        marsLandscape.plateau
    );
    test("send 'M' and it should move downward (-1) on the y-axis", () => {
        expect(rover4.y).toBe(9);
    });
});
// testing rover command edge cases
describe("357: test if rover can accept M (move) commands", () => {
    const plateau = createPlateau(X_MAX, Y_MAX);

    const roverCollectionCreationData: RoverCreationData[] = [
        { facing: "East", x: X_MAX, y: 10 },
        { facing: "North", x: 10, y: Y_MAX },
        { facing: "West", x: 0, y: 10 },
        { facing: "South", x: 10, y: 0 },
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
describe("399: test if rover can accept Multiple (MLLMRRLMMR) commands", () => {
    const plateau = createPlateau(X_MAX, Y_MAX);

    const roverCollectionCreationData: RoverCreationData[] = [
        { facing: "East", x: 10, y: 10 },
        { facing: "North", x: 20, y: 20 },
        { facing: "West", x: X_MAX, y: 10 },
        { facing: "South", x: 40, y: 40 },
        { facing: "East", x: X_MAX, y: 20 },
        { facing: "North", x: 10, y: 0 },
        { facing: "West", x: 0, y: 10 },
        { facing: "South", x: 10, y: 50 },
    ];

    const rovers = createMarsRoverCollection(roverCollectionCreationData);

    const marsLandscape = createMartianLandscape(rovers, plateau);
    // { facing: "East", x: 10, y: 10 },
    const rover = marsLandscape.roversOnMars[0].followOrders(
        "MMMMLL",
        marsLandscape.plateau
    );
    test("send 'MMMMLL' to East, 0, 10 -> x=14, facing=West", () => {
        expect(rover.x).toBe(14);
        expect(rover.facing).toBe("West");
    });
    // { facing: "North", x: 20, y: 20 },
    const rover2 = marsLandscape.roversOnMars[1].followOrders(
        "LL",
        marsLandscape.plateau
    );
    test("send 'LL' to East, 0 -> facing=West", () => {
        expect(rover2.x).toBe(20);
        expect(rover2.y).toBe(20);
        expect(rover2.facing).toBe("South");
    });

    // { facing: "West", x: 30, y: 30 },
    const rover3 = marsLandscape.roversOnMars[2].followOrders(
        "MLMMRMMR",
        marsLandscape.plateau
    );
    test(`send 'MLMMRMMR'  to 'West', ${X_MAX}, 10 -> x=${
        X_MAX - 3
    } , facing=North, y=8`, () => {
        expect(rover3.x).toBe(X_MAX - 3);
        expect(rover3.facing).toBe("North");
        expect(rover3.y).toBe(8);
    });

    // { facing: "North", x: 10, y: 0 },
    const rover4 = marsLandscape.roversOnMars[5].followOrders(
        "MMMMMMR",
        marsLandscape.plateau
    );
    test("send 'MMMMMMR' to 'North', 10, 0 -> y=6, facing=East", () => {
        expect(rover4.y).toBe(6);
        expect(rover4.facing).toBe("East");
    });

    // { facing: "West", x: 0, y: 10 },
    const rover5 = marsLandscape.roversOnMars[6].followOrders(
        "MLMMRMMR",
        marsLandscape.plateau
    );
    test(`send 'MLMMRMMR'  to 'West', ${X_MAX}, 10 -> x=97, facing=North, y=8 `, () => {
        expect(rover5.x).toBe(0);
        expect(rover5.facing).toBe("North");
        expect(rover5.y).toBe(8);
    });

    // { facing: "South", x: 10, y: 50 },
    let rover6 = marsLandscape.roversOnMars[7];
    const rover7 = marsLandscape.roversOnMars[7].followOrders(
        "LLMMLLMMLL",
        marsLandscape.plateau
    );

    test("send 'LLMMLLMMLL' to South, 10, 10 -> y=10, facing=North ", () => {
        expect(rover7.y).toBe(50);
        expect(rover7.facing).toBe("North");
    });
});

import * as marsProgram1 from "./program/masa-program1.json";

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
        expect(plateau.xMax).toBe(X_MAX);
    });
    test(`a plateau is created with y-axis length = ${Y_MAX}`, () => {
        expect(plateau.yMax).toBe(Y_MAX);
    });
    test(`a plateau is created with area ${X_MAX} x ${Y_MAX}=${
        X_MAX * Y_MAX
    }`, () => {
        expect(plateau.xMax * plateau.yMax).toBe(X_MAX * Y_MAX);
    });
});

// test boilerplate
describe(" desciption ", () => {
    // test("specific test details", () => {
    //     //
    // });
});
