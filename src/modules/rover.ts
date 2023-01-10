export interface Rover {
    facing: facingCompassDirection;
    x: number;
    y: number;
    turnLeft(): any;
    turnRight?(): any;
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
        turnLeft() {
            return this;
        },
        turnRight() {},
        move() {},
        getFacing() {
            return this.facing;
        },
    };
    return marsRover;
};
