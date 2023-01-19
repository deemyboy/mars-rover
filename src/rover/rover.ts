import { Plateau } from "../plateau/plateau.js";
import { compassDirections, CompassDirection } from "../types/direction.js";

export interface RoverCreationData {
    facing: CompassDirection;
    x: number;
    y: number;
}

export interface Rover {
    facing: CompassDirection;
    x: number;
    y: number;
    turnLeft(): CompassDirection;
    turnRight(): CompassDirection;
    move(plateau: Plateau): Rover;
    getFacing(): CompassDirection;
    followOrders(orders: string, plateau: Plateau): Rover;
}

export const createMarsRover = (
    facing: CompassDirection,
    x: number,
    y: number
): Rover => {
    const marsRover: Rover = {
        facing: facing,
        x: x,
        y: y,
        turnLeft(): CompassDirection {
            const maxCompassIndex = compassDirections.length - 1;
            const curentDirection = this.facing;
            const index =
                compassDirections.indexOf(curentDirection) === 0
                    ? maxCompassIndex
                    : compassDirections.indexOf(curentDirection) - 1;
            this.facing = compassDirections[index];
            return this.facing;
        },
        turnRight(): CompassDirection {
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
            if (facing === "N" || facing === "E") {
                // increment
                if (facing === "N") {
                    this.y = this.y === maxY ? maxY : this.y + 1;
                }
                if (facing === "E") {
                    this.x = this.x === maxX ? maxX : this.x + 1;
                }
            } else {
                // decrement
                if (facing === "S") {
                    this.y = this.y === 0 ? 0 : this.y - 1;
                }
                if (facing === "W") {
                    this.x = this.x === 0 ? 0 : this.x - 1;
                }
            }
            return this;
        },
        getFacing(): CompassDirection {
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

export function createMarsRoverCollection(
    roversData: RoverCreationData[]
): Rover[] {
    return roversData.map((rd) => createMarsRover(rd.facing, rd.x, rd.y));
}
