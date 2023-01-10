import { Rover } from "./rover";
export interface Plateau {
    xAxisLength: number;
    yAxisLength: number;
    // roversOnPlateau: Rover[];
    doesThisRoverFit(rover: Rover): boolean;
}

export const createPlateau = (
    xAxisLength: number,
    yAxisLength: number
    // roversOnPlateau: Rover[]
): Plateau => {
    const marsPlateau: Plateau = {
        xAxisLength: xAxisLength,
        yAxisLength: yAxisLength,
        // roversOnPlateau: roversOnPlateau,
        doesThisRoverFit(rover: Rover): boolean {
            return (
                rover.x >= 0 &&
                rover.x <= xAxisLength &&
                rover.y >= 0 &&
                rover.y <= yAxisLength
            );
        },
    };
    return marsPlateau;
};
