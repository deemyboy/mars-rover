import { Plateau } from "./plateau";

export interface Rover {
    facing: facingCompassDirection;
    x: number;
    y: number;
    turnLeft(): Rover;
    turnRight(): Rover;
    move(plateau: Plateau): any;
    getFacing(): any;
}

const compassDirections = ["North", "East", "South", "West"] as const;

type facingCompassDirection = typeof compassDirections[number];

export const createMarsRover = (
    facing: facingCompassDirection,
    x: number,
    y: number
): Rover => {
    const marsRover: Rover = {
        facing: facing,
        x: x,
        y: y,
        turnLeft(): Rover {
            let returnRover = { ...this };
            const maxCompassIndex = compassDirections.length - 1;
            const curentDirection = this.facing;
            const index =
                compassDirections.indexOf(curentDirection) === 0
                    ? maxCompassIndex
                    : compassDirections.indexOf(curentDirection) - 1;
            returnRover.facing = compassDirections[index];
            return returnRover;
        },
        turnRight(): Rover {
            let returnRover = { ...this };
            const maxCompassIndex = compassDirections.length - 1;
            const curentDirection = this.facing;
            const index =
                compassDirections.indexOf(curentDirection) === maxCompassIndex
                    ? 0
                    : compassDirections.indexOf(curentDirection) + 1;
            returnRover.facing = compassDirections[index];
            return returnRover;
        },
        move(plateau): Rover {
            let returnRover = { ...this };
            if (
                returnRover.facing === "North" ||
                returnRover.facing === "East"
            ) {
                // increment
            }
            return returnRover;
        },
        getFacing() {
            return this.facing;
        },
    };
    return marsRover;
};
