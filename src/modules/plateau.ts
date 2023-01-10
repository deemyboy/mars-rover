import { Rover, compassDirections } from "./rover";
export interface Plateau {
    xAxisLength: number;
    yAxisLength: number;
    doesThisRoverFit(rover: Rover): boolean;
}

export const createPlateau = (
    xAxisLength: number,
    yAxisLength: number
): Plateau => {
    const marsPlateau: Plateau = {
        xAxisLength: xAxisLength,
        yAxisLength: yAxisLength,
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
