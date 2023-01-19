import {
    createMarsRover,
    createMarsRoverCollection,
    RoverCreationData,
} from "./rover";
describe("testing createMarsRover", () => {
    test("a Mars rover is created facing West at 53,21", () => {
        const rover = createMarsRover("West", 53, 21);
        expect(rover.facing).toBe("West");
        expect(rover.x).toBe(53);
        expect(rover.y).toBe(21);
    });
});

describe("testing createMarsRover using createMarsRoverCollection", () => {
    test("a Mars rovers collection is created with 3x rovers facing: 'West', x: 3, y: 45. The length is 3", () => {
        const roversCollection = createMarsRoverCollection([
            { facing: "West", x: 3, y: 45 },
        ]);

        expect(roversCollection[0].facing).toBe("West");
        expect(roversCollection[0].x).toBe(3);
        expect(roversCollection[0].y).toBe(45);
        expect(roversCollection.length).toBe(1);
    });
});

describe("testing creating a collection of mars rovers using createMarsRoverCollection and RoverCreationData for rover data type and  ", () => {
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
describe("testing turn right from South ", () => {
    let rover = createMarsRover("South", 0, 0);
    rover = { ...rover, facing: rover.turnRight() };
    test("rover should face West", () => {
        expect(rover.getFacing()).toBe("West");
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
