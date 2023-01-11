import { Plateau } from "./plateau";

export interface Rover {
    facing: facingCompassDirection;
    x: number;
    y: number;
    turnLeft(): facingCompassDirection;
    turnRight(): facingCompassDirection;
    move(plateau: Plateau): any;
    getFacing(): facingCompassDirection;
    followOrders(orders: string, plateau: Plateau): Rover;
}

export const compassDirections = ["North", "East", "South", "West"] as const;

export type facingCompassDirection = typeof compassDirections[number];

export const createMarsRover = (
    facing: facingCompassDirection,
    x: number,
    y: number
): Rover => {
    const marsRover: Rover = {
        facing: facing,
        x: x,
        y: y,
        turnLeft(): facingCompassDirection {
            const maxCompassIndex = compassDirections.length - 1;
            const curentDirection = this.facing;
            const index =
                compassDirections.indexOf(curentDirection) === 0
                    ? maxCompassIndex
                    : compassDirections.indexOf(curentDirection) - 1;
            this.facing = compassDirections[index];
            return this.facing;
        },
        turnRight(): facingCompassDirection {
            const maxCompassIndex = compassDirections.length - 1;
            const curentDirection = this.facing;
            const index =
                compassDirections.indexOf(curentDirection) === maxCompassIndex
                    ? 0
                    : compassDirections.indexOf(curentDirection) + 1;
            this.facing = compassDirections[index];
            return this.facing;
        },
        move(plateau: Plateau): Rover {
            const maxX = plateau.xAxisLength;
            const maxY = plateau.yAxisLength;
            const facing = this.getFacing();
            if (facing === "North" || facing === "East") {
                // increment
                if (facing === "North") {
                    this.y = this.y === maxY ? maxY : this.y + 1;
                }
                if (facing === "East") {
                    this.x = this.x === maxX ? maxX : this.x + 1;
                }
            } else {
                // decrement
                if (facing === "South") {
                    this.y = this.y === 0 ? 0 : this.y - 1;
                }
                if (facing === "West") {
                    this.x = this.x === 0 ? 0 : this.x - 1;
                }
            }
            return this;
        },
        getFacing(): facingCompassDirection {
            return this.facing;
        },
        followOrders(orders: string, plateau: Plateau): Rover {
            let returnRover = { ...this };
            [...orders].forEach((o) => {
                if (o === "M") returnRover = returnRover.move(plateau);
                if (o === "L") returnRover.facing = returnRover.turnLeft();
                if (o === "R") returnRover.facing = returnRover.turnRight();
            });
            return returnRover;
        },
    };
    return marsRover;
};
