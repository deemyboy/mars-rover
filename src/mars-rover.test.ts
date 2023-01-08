import { mars_rover, mr, plateau } from "./mars-rover";
import { createMarsRover } from "./modules/rover";

describe("mars rover is created facing north at x6,y0", () => {
    test("a Mars rover is created facing North", () => {
        expect(mr.facing).toBe("North");
    });
    test("a Mars rover x-coord to be 6", () => {
        expect(mr.x).toBe(6);
    });
    test("a Mars rover y-coord to be 0", () => {
        expect(mr.y).toBe(0);
    });
});
describe("a plateau is created with these dimensions 60x60", () => {
    test("a plateau is created with x-axis length = 60", () => {
        expect(plateau.xAxisLength).toBe(60);
    });
    test("a plateau is created with these", () => {
        expect(plateau.yAxisLength).toBe(60);
    });
    test("a plateau is created with this area", () => {
        expect(plateau.xAxisLength * plateau.yAxisLength).toBe(3600);
    });
});
describe("testing createMarsRover that a mars rover is created facing West at x53,y21 ", () => {
    test("a Mars rover is created facing West at 53,21", () => {
        expect(createMarsRover("West", 53, 21).facing).toBe("West");
        expect(createMarsRover("West", 53, 21).x).toBe(53);
        expect(createMarsRover("West", 53, 21).y).toBe(21);
    });
});
describe("testing createMarsRover that a mars rover is created facing West at x53,y21 ", () => {
    const myRover = createMarsRover("West", 53, 21);
    test("myRover facing West", () => {
        expect(myRover.getFacing()).toBe("West");
    });
});
