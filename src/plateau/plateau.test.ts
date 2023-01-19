import { createPlateau } from "./plateau";
import { X_MAX, Y_MAX } from "../constants/constants";

describe("testing plateau dimensions", () => {
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
