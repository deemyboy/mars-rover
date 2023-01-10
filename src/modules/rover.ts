export interface Rover {
    facing: facingCompassDirection;
    x: number;
    y: number;
    turnLeft(): Rover;
    turnRight(): Rover;
    move?(): any;
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
            let curentDirection = this.facing;
            let index = compassDirections.indexOf(curentDirection);
            index = index === 0 ? maxCompassIndex : index - 1;
            returnRover.facing = compassDirections[index];
            return returnRover;
        },
        turnRight(): Rover {
            let returnRover = { ...this };
            const maxCompassIndex = compassDirections.length - 1;
            let curentDirection = this.facing;
            let index = compassDirections.indexOf(curentDirection);
            index = index === maxCompassIndex ? 0 : index + 1;
            returnRover.facing = compassDirections[index];
            return returnRover;
        },
        move() {},
        getFacing() {
            return this.facing;
        },
    };
    return marsRover;
};
