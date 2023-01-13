import { Rover, compassDirections } from "./rover";
export interface Plateau {
    xMax: number;
    yMax: number;
}

export const createPlateau = (xMax: number, yMax: number): Plateau => {
    const marsPlateau: Plateau = {
        xMax: xMax,
        yMax: yMax,
    };
    return marsPlateau;
};

export const isThisRoverLandingOnThePlateau = (
    rover: Rover,
    plateau: Plateau
): boolean => {
    return (
        rover.x >= 0 &&
        rover.x <= plateau.xMax &&
        rover.y >= 0 &&
        rover.y <= plateau.yMax
    );
};

export const removeAllPancakingRovers = (landingRovers: Rover[]): Rover[] => {
    const nonPancakingRovers: Rover[] = landingRovers.reduce(
        (unique: Rover[], o) => {
            if (!unique.some((obj) => obj.x === o.x && obj.y === o.y)) {
                unique.push(o);
            }
            return unique;
        },
        []
    );
    return nonPancakingRovers;
};
