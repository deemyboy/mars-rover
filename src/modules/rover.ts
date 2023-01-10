import { Plateau } from "./plateau";

export interface Rover {
    facing: facingCompassDirection;
    x: number;
    y: number;
    turnLeft(): Rover;
    turnRight(): Rover;
    move(plateau: Plateau): any;
    getFacing(): facingCompassDirection;
    followOrders(orders: string, plateau: Plateau): Rover;
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
        move(plateau: Plateau): Rover {
            const maxX = plateau.xAxisLength;
            const maxY = plateau.yAxisLength;
            const returnRover = { ...this };
            const facing = returnRover.getFacing();
            if (facing === "North" || facing === "East") {
                // increment
                if (facing === "North") {
                    returnRover.y =
                        returnRover.y === maxY ? maxY : returnRover.y + 1;
                }
                if (facing === "East") {
                    returnRover.x =
                        returnRover.x === maxX ? maxX : returnRover.x + 1;
                }
            } else {
                // decrement
                if (facing === "South") {
                    returnRover.y = returnRover.y === 0 ? 0 : returnRover.y - 1;
                }
                if (facing === "West") {
                    returnRover.x = returnRover.x === 0 ? 0 : returnRover.x - 1;
                }
            }
            return returnRover;
        },
        getFacing(): facingCompassDirection {
            return this.facing;
        },
        followOrders(orders: string, plateau: Plateau): Rover {
            const returnRover = { ...this };
            return returnRover;
        },
    };
    return marsRover;
};
