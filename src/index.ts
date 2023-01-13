import {
    MartianLandscape,
    createMartianLandscape,
    createMarsRoverCollection,
} from "./modules/martian-landscape";
import { createPlateau, Plateau } from "./modules/plateau";
import { Rover } from "./modules/rover";

function MASA() {
    // martianLandscape.plateau = createPlateau();
    // return {
    //     plateau: createPlateau(100, 100),
    //     roversOnMars: createMarsRoverCollection([
    //         { facing: "West", x: 53, y: 21 },
    //     ]),
    // };
    createMartianLandscape(
        createMarsRoverCollection([{ facing: "West", x: 53, y: 21 }]),
        createPlateau(100, 100)
    );
}
MASA();
