import { createPlateau } from "./modules/plateau";
import { createMarsRover } from "./modules/rover";

export const mr = createMarsRover("north", 6, 0);
export const plateau = createPlateau(60, 60);

export function mars_rover() {
    //
    // mr.facing = "north";
    console.log(
        `hi from mr facing", ${mr.facing}, and at x ${mr.x} and y ${
            mr.y
        } ${typeof mr}`
    );
    return mr;
}
