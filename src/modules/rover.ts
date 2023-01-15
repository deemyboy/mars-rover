import { Plateau } from "./plateau";

export interface RoverCreationData {
    facing: FacingCompassDirection;
    x: number;
    y: number;
}
export interface Rover {
    facing: FacingCompassDirection;
    x: number;
    y: number;
    turnLeft(): FacingCompassDirection;
    turnRight(): FacingCompassDirection;
    move(plateau: Plateau): Rover;
    getFacing(): FacingCompassDirection;
    followOrders(orders: string, plateau: Plateau): Rover;
}

export const compassDirections = ["North", "East", "South", "West"] as const;

export type FacingCompassDirection = typeof compassDirections[number];

export const createMarsRover = (
    facing: FacingCompassDirection,
    x: number,
    y: number
): Rover => {
    const marsRover: Rover = {
        facing: facing,
        x: x,
        y: y,
        turnLeft(): FacingCompassDirection {
            const maxCompassIndex = compassDirections.length - 1;
            const curentDirection = this.facing;
            const index =
                compassDirections.indexOf(curentDirection) === 0
                    ? maxCompassIndex
                    : compassDirections.indexOf(curentDirection) - 1;
            this.facing = compassDirections[index];
            return this.facing;
        },
        turnRight(): FacingCompassDirection {
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
            const maxX = plateau.xMax;
            const maxY = plateau.yMax;
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
        getFacing(): FacingCompassDirection {
            return this.facing;
        },
        followOrders(orders: string, plateau: Plateau): Rover {
            let rover = { ...this };
            [...orders].forEach((o) => {
                if (o === "M") return rover.move(plateau);
                if (o === "L") return rover.turnLeft();
                if (o === "R") return rover.turnRight();
            });
            return rover;
        },
    };
    return marsRover;
};
