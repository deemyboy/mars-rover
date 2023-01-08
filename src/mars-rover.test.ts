import { mars_rover, mr, plateau } from "./mars-rover";

describe("mars rover is created facing north at x6,y0", () => {
    test("a plateau is created with these", () => {
        expect(mr.facing).toBe("north");
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
