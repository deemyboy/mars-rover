interface Rover {
    facing: facingCompass | undefined;
    x: number | undefined;
    y: number | undefined;
    turnLeft(): any;
    turnRight(): any;
    move(): any;
    getFacing(): any;
}

const compassDirections = ["North", "East", "South", "West"] as const;

type facingCompass = typeof compassDirections[number];

export const createMarsRover = (
    facing?: facingCompass,
    x?: number,
    y?: number
): Rover => {
    const marsRover: Rover = {
        facing: facing,
        x: x,
        y: y,
        turnLeft() {
            console.log(this.facing);
        },
        turnRight() {},
        move() {},
        getFacing() {
            return this.facing;
        },
    };
    // facing: string;
    // move(): void;
    // facing: string,
    // turnLeft:void,
    // turnRight: void,
    // move: void,
    return marsRover;
};
