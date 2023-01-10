import { makeTheSurfaceOfMars, addNewRover } from "./index";
import { createPlateau } from "./modules/plateau";
import { createMarsRover, Rover } from "./modules/rover";
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
    const plateau = createPlateau(60, 60);
    test("a plateau is created with x-axis length = 60", () => {
        expect(plateau.xAxisLength).toBe(60);
    });
    test("a plateau is created with y-axis length = 60", () => {
        expect(plateau.yAxisLength).toBe(60);
    });
    test("a plateau is created with area 60x60=3600", () => {
        expect(plateau.xAxisLength * plateau.yAxisLength).toBe(3600);
    });
});
describe("testing area of plateau", () => {
    const rovers = [];
    const myRover = createMarsRover("West", 53, 21);
    rovers.push(myRover);
    const surface = makeTheSurfaceOfMars(100, 100, rovers);
    test("surface plateau is 100 x 100", () => {
        expect(surface.plateau.xAxisLength * surface.plateau.yAxisLength).toBe(
            10000
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
    const surface0 = makeTheSurfaceOfMars(100, 100, rovers);
    test("empty rovers array will be empty", () => {
        expect(surface0.marsRoversOnTheSurface).toEqual([]);
    });
    const myRover0 = createMarsRover("West", -99, 10);
    const myRover1 = createMarsRover("West", 99, 210);
    const myRover2 = createMarsRover("West", 99, 99);
    const surface1 = makeTheSurfaceOfMars(100, 100, rovers);
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
    test("myRover0 will not fit on plateau  100 x 100", () => {
        expect(surface1.marsRoversOnTheSurface).not.toContain(myRover0);
    });
    test("myRover1 will not fit on plateau  100 x 100", () => {
        expect(surface1.marsRoversOnTheSurface).not.toContain(myRover1);
    });
    test("myRover2 will fit on plateau  100 x 100", () => {
        expect(surface1.marsRoversOnTheSurface).toContain(myRover2);
    });
});
describe("testing building the surface of mars with a mix of legal and illegal rovers", () => {
    const myRover0 = createMarsRover("West", -99, 10);
    const myRover1 = createMarsRover("West", 99, 210);
    const myRover2 = createMarsRover("West", 99, 99);
    const rovers = [];
    rovers.push(myRover0, myRover1, myRover2);
    const surface = makeTheSurfaceOfMars(100, 100, rovers);
    test("myRover0 will not fit on plateau  100 x 100", () => {
        expect(surface.marsRoversOnTheSurface).not.toContain(myRover0);
    });
    test("myRover1 will not fit on plateau  100 x 100", () => {
        expect(surface.marsRoversOnTheSurface).not.toContain(myRover1);
    });
    test("myRover2 will fit on plateau  100 x 100", () => {
        expect(surface.marsRoversOnTheSurface).toContain(myRover2);
    });
});
describe("testing adding rovers on the edge cases 0,0 and 100,100 to 100x100 plateau", () => {
    const myRover3 = createMarsRover("West", 0, 0);
    const myRover4 = createMarsRover("South", 100, 100);
    const rovers = [];
    rovers.push(myRover3, myRover4);
    const surface = makeTheSurfaceOfMars(100, 100, rovers);

    test("myRover3 will fit on plateau  100 x 100", () => {
        expect(surface.marsRoversOnTheSurface).toContain(myRover3);
    });
    test("myRover4 will fit on plateau  100 x 100", () => {
        expect(surface.marsRoversOnTheSurface).toContain(myRover4);
    });
});
describe("testing turn left ", () => {
    let myRover = createMarsRover("West", 0, 0);
    const myRover2 = myRover.turnLeft();
    // const surface = makeTheSurfaceOfMars(100, 100, rovers);
    test("myRover should face south", () => {
        expect(myRover2.getFacing()).toBe("South");
    });
    const myRover3 = myRover2.turnLeft();
    test("myRover3 should face east", () => {
        expect(myRover3.getFacing()).toBe("East");
    });
    const myRover4 = myRover3.turnLeft();
    test("myRover should face north", () => {
        expect(myRover4.getFacing()).toBe("North");
    });
    const myRover5 = myRover4.turnLeft();
    test("myRover5 should face west", () => {
        console.log(myRover5.getFacing());
        expect(myRover5.getFacing()).toBe("West");
    });
});
describe("testing turn right ", () => {
    let myRover = createMarsRover("West", 0, 0);
    const myRover2 = myRover.turnRight();
    // const surface = makeTheSurfaceOfMars(100, 100, rovers);
    test("myRover should face north", () => {
        expect(myRover2.getFacing()).toBe("North");
    });
    const myRover3 = myRover2.turnRight();
    test("myRover3 should face east", () => {
        expect(myRover3.getFacing()).toBe("East");
    });
    const myRover4 = myRover3.turnRight();
    test("myRover should face south", () => {
        expect(myRover4.getFacing()).toBe("South");
    });
    const myRover5 = myRover4.turnRight();
    test("myRover5 should face west", () => {
        expect(myRover5.getFacing()).toBe("West");
    });
});
describe("testing move ", () => {
    test("myRover should move along the x-axis to 9", () => {
        let myRover = createMarsRover("West", 10, 10);

        let rovers = [];
        rovers.push(myRover);
        const surface = makeTheSurfaceOfMars(100, 100, rovers);
        const myMovingRover = surface.marsRoversOnTheSurface[0];
        const myMovedRover = myMovingRover.move(surface.plateau);
        expect(myMovedRover.x).toBe(9);
    });
    test("myRover should move along the y-axis to 9", () => {
        let myRover = createMarsRover("South", 10, 10);

        let rovers = [];
        rovers.push(myRover);
        const surface = makeTheSurfaceOfMars(100, 100, rovers);
        const myMovingRover = surface.marsRoversOnTheSurface[0];
        const myMovedRover = myMovingRover.move(surface.plateau);
        expect(myMovedRover.y).toBe(9);
    });
    test("myRover should move along the x-axis to 11", () => {
        let myRover = createMarsRover("East", 10, 10);

        let rovers = [];
        rovers.push(myRover);
        const surface = makeTheSurfaceOfMars(100, 100, rovers);
        const myMovingRover = surface.marsRoversOnTheSurface[0];
        const myMovedRover = myMovingRover.move(surface.plateau);
        expect(myMovedRover.x).toBe(11);
    });
    test("myRover should move along the y-axis to 11", () => {
        let myRover = createMarsRover("North", 10, 10);

        let rovers = [];
        rovers.push(myRover);
        const surface = makeTheSurfaceOfMars(100, 100, rovers);
        const myMovingRover = surface.marsRoversOnTheSurface[0];
        const myMovedRover = myMovingRover.move(surface.plateau);
        expect(myMovedRover.y).toBe(11);
    });
    test("myRover should NOT move along the x-axis to -1 and stay at 0", () => {
        let myRover = createMarsRover("West", 0, 10);

        let rovers = [];
        rovers.push(myRover);
        const surface = makeTheSurfaceOfMars(100, 100, rovers);
        const myMovingRover = surface.marsRoversOnTheSurface[0];
        const myMovedRover = myMovingRover.move(surface.plateau);
        expect(myMovedRover.x).toBe(0);
    });
    test("myRover should NOT move along the y-axis to -1 and stay at 0", () => {
        let myRover = createMarsRover("South", 10, 0);

        let rovers = [];
        rovers.push(myRover);
        const surface = makeTheSurfaceOfMars(100, 100, rovers);
        const myMovingRover = surface.marsRoversOnTheSurface[0];
        const myMovedRover = myMovingRover.move(surface.plateau);
        expect(myMovedRover.y).toBe(0);
    });
    test("myRover should NOT move along the x-axis to xMax +1 === 101 and stay at 100", () => {
        let myRover = createMarsRover("East", 100, 10);

        let rovers = [];
        rovers.push(myRover);
        const surface = makeTheSurfaceOfMars(100, 100, rovers);
        const myMovingRover = surface.marsRoversOnTheSurface[0];
        const myMovedRover = myMovingRover.move(surface.plateau);
        expect(myMovedRover.x).toBe(100);
    });
    test("myRover should NOT move along the y-axis to yMax +1 === 101 and stay at 100", () => {
        let myRover = createMarsRover("North", 10, 100);

        let rovers = [];
        rovers.push(myRover);
        const surface = makeTheSurfaceOfMars(100, 100, rovers);
        const myMovingRover = surface.marsRoversOnTheSurface[0];
        const myMovedRover = myMovingRover.move(surface.plateau);
        expect(myMovedRover.y).toBe(100);
    });
});
// testing rover can accept commands
describe(" test if rover can accept commands can control ", () => {
    test("if I send 'M' will it move forward", () => {
        //
        let myRover = createMarsRover("East", 100, 10);

        let rovers = [];
        rovers.push(myRover);
        const surface = makeTheSurfaceOfMars(100, 100, rovers);
        const myMovingRover = surface.marsRoversOnTheSurface[0];
    });
});
// test boilerplate
describe(" desciption ", () => {
    test("specific test details", () => {
        //
    });
});
