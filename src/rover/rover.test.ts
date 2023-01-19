import {
    createMarsRover,
    createMarsRoverCollection,
    RoverCreationData,
} from "./rover.js";
describe("testing createMarsRover", () => {
    test("a Mars rover is created facing W at 53,21", () => {
        const rover = createMarsRover("W", 53, 21);
        expect(rover.facing).toBe("W");
        expect(rover.x).toBe(53);
        expect(rover.y).toBe(21);
    });
});

describe("testing createMarsRover using createMarsRoverCollection", () => {
    test("a Mars rovers collection is created with 3x rovers facing: 'W', x: 3, y: 45. The length is 3", () => {
        const roversCollection = createMarsRoverCollection([
            { facing: "W", x: 3, y: 45 },
        ]);

        expect(roversCollection[0].facing).toBe("W");
        expect(roversCollection[0].x).toBe(3);
        expect(roversCollection[0].y).toBe(45);
        expect(roversCollection.length).toBe(1);
    });
});

describe("testing creating a collection of mars rovers using createMarsRoverCollection and RoverCreationData for rover data type and  ", () => {
    test("a Mars rover is created facing W at 53,21", () => {
        const roverCollectionCreationData: RoverCreationData[] = [
            { facing: "W", x: 53, y: 21 },
            { facing: "W", x: 53, y: 21 },
            { facing: "W", x: 53, y: 21 },
        ];
        const roverCollection = createMarsRoverCollection(
            roverCollectionCreationData
        );
        expect(roverCollection.length).toBe(3);
    });
});

describe("testing turn left N ", () => {
    let rover = createMarsRover("N", 0, 0);
    rover = { ...rover, facing: rover.turnLeft() };
    test("rover should face W", () => {
        expect(rover.getFacing()).toBe("W");
    });
});
describe("testing turn left W ", () => {
    let rover = createMarsRover("W", 0, 0);
    rover = { ...rover, facing: rover.turnLeft() };
    test("rover should face S", () => {
        expect(rover.getFacing()).toBe("S");
    });
});
describe("testing turn left S ", () => {
    let rover = createMarsRover("S", 0, 0);
    rover = { ...rover, facing: rover.turnLeft() };
    test("rover should face E", () => {
        expect(rover.getFacing()).toBe("E");
    });
});
describe("testing turn left E ", () => {
    let rover = createMarsRover("E", 0, 0);
    rover = { ...rover, facing: rover.turnLeft() };
    test("rover should face N", () => {
        expect(rover.getFacing()).toBe("N");
    });
});
describe("testing turn right from W", () => {
    let rover = createMarsRover("W", 0, 0);
    rover = { ...rover, facing: rover.turnRight() };
    test("rover should face N", () => {
        expect(rover.getFacing()).toBe("N");
    });
});
describe("testing turn right from N", () => {
    let rover = createMarsRover("N", 0, 0);
    rover = { ...rover, facing: rover.turnRight() };
    test("rover should face E", () => {
        expect(rover.getFacing()).toBe("E");
    });
});
describe("testing turn right from S ", () => {
    let rover = createMarsRover("S", 0, 0);
    rover = { ...rover, facing: rover.turnRight() };
    test("rover should face W", () => {
        expect(rover.getFacing()).toBe("W");
    });
});
describe("testing turn right from E AND first rover not affected by cloned rover turning ", () => {
    let rover = createMarsRover("E", 0, 0);
    rover = { ...rover, facing: rover.turnRight() };
    test("rover should face S", () => {
        expect(rover.getFacing()).toBe("S");
    });
    let rover2 = { ...rover };
    rover2 = { ...rover2, facing: rover2.turnRight() };
    test("rover2 should face W", () => {
        expect(rover2.getFacing()).toBe("W");
    });
    test("rover should STILL be facing S", () => {
        expect(rover.getFacing()).toBe("S");
    });
});
