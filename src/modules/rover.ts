interface Rover {
    facing: string | undefined;
    x: number | undefined;
    y: number | undefined;
    turnLeft(): any;
    turnRight(): any;
    move(): any;
}

const compassDirections = ["North", "East", "South", "West"] as const;

export const createMarsRover = (
    facing?: string,
    x?: number,
    y?: number
): Rover => {
    const marsRover: Rover = {
        facing: facing,
        x: x,
        y: y,
        turnLeft() {},
        turnRight() {},
        move() {},
    };
    // facing: string;
    // move(): void;
    // facing: string,
    // turnLeft:void,
    // turnRight: void,
    // move: void,
    return marsRover;
};
