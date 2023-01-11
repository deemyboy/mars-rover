import { createPlateau, Plateau } from "./modules/plateau";
import { createMarsRover, Rover } from "./modules/rover";

interface MartianLandscape {
    newRover?: Rover;
    marsRoversOnTheSurface: Rover[];
    plateau: Plateau;
}

export function makeTheSurfaceOfMars(
    xAxisLength: number,
    yAxisLength: number,
    roversOnMars: Rover[]
): MartianLandscape {
    const marsPlateau = createPlateau(xAxisLength, yAxisLength);

    const createSurface = (
        rovers: Rover[],
        plateau: Plateau
    ): MartianLandscape => {
        rovers = roversOnMars;
        plateau = marsPlateau;
        const newRovers: Rover[] = rovers.filter((rov) => {
            return plateau.doesThisRoverFit(rov);
        });
        const floaters = rovers.filter((rov) => {
            return newRovers.indexOf(rov) < 0;
        });
        if (floaters && floaters.length > 0)
            console.log(
                "these rovers are floating in space somewhere (illegal)",
                floaters
            );
        return { marsRoversOnTheSurface: newRovers, plateau: marsPlateau };
    };
    return createSurface(roversOnMars, marsPlateau);
}

export function addNewRover(
    rover: Rover,
    rovers: Rover[],
    plateau: Plateau
): Rover[] {
    if (plateau.doesThisRoverFit(rover)) {
        rovers.push(rover);
    } else {
    }
    return rovers;
}
