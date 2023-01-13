import {
    createPlateau,
    Plateau,
    isThisRoverLandingOnThePlateau,
    removeAllPancakingRovers,
} from "./plateau";
import { createMarsRover, Rover, RoverCreationData } from "./rover";

export interface MartianLandscape {
    roversOnMars: Rover[];
    plateau: Plateau;
}

export const createMartianLandscape = (
    newRoversToDeploy: Rover[],
    plateau: Plateau
): MartianLandscape => {
    const deployableRovers: Rover[] = addNewRovers(newRoversToDeploy, plateau);

    const floaters = newRoversToDeploy.filter((rov) => {
        return deployableRovers.indexOf(rov) < 0;
    });

    if (floaters && floaters.length > 0)
        console.log(
            "these rovers are floating in space somewhere (illegal)",
            floaters
        );
    return {
        roversOnMars: deployableRovers,
        plateau: plateau,
    };
};

export function createMarsRoverCollection(
    roversData: RoverCreationData[]
): Rover[] {
    return roversData.map((rd) => createMarsRover(rd.facing, rd.x, rd.y));
    // return collectionOfMarsRovers;
}

export const addNewRovers = (
    roversToDeploy: Rover[],
    plateau: Plateau
): Rover[] => {
    return removeAllPancakingRovers(
        roversToDeploy.filter((newRover) =>
            isThisRoverLandingOnThePlateau(newRover, plateau)
        )
    );
};

export const addNewRoversToExisting = (
    newRovers: Rover[],
    surface: MartianLandscape
): MartianLandscape => {
    return {
        roversOnMars: removeAllPancakingRovers(
            [...newRovers, ...surface.roversOnMars].filter((newRover) => {
                return isThisRoverLandingOnThePlateau(
                    newRover,
                    surface.plateau
                );
            })
        ),
        plateau: surface.plateau,
    };
};
