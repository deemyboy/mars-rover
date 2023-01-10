import { createPlateau, Plateau } from "./modules/plateau";
import { createMarsRover, Rover } from "./modules/rover";

interface SurfaceOfMars {
    newRover?: Rover;
    marsRoversOnTheSurface: Rover[];
    plateau: Plateau;
    // surface:{};
    // willNewRoverFit(): any;
}

// export const mr = createMarsRover("North", 6, 0);
// export const plateau = createPlateau(60, 60);

export function makeTheSurfaceOfMars(
    xAxisLength: number,
    yAxisLength: number,
    marsRoversOnTheSurface: Rover[]
): SurfaceOfMars {
    //

    // const marsRovers: Rover[] = [
    //     createMarsRover("West", 53, 21),
    //     createMarsRover("North", 3, 56),
    //     createMarsRover("West", 33, 2),
    // ];

    const marsPlateau = createPlateau(xAxisLength, yAxisLength);

    const createSurface = (
        rovers: Rover[],
        plateau: Plateau
    ): SurfaceOfMars => {
        rovers = marsRoversOnTheSurface;
        plateau = marsPlateau;
        const newRovers: Rover[] = rovers.filter((rov) => {
            return plateau.doesThisRoverFit(rov);
        });

        return { marsRoversOnTheSurface: newRovers, plateau: marsPlateau };
    };
    return createSurface(marsRoversOnTheSurface, marsPlateau);
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
