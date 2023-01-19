import {
    createMartianLandscape,
    MartianLandscape,
    addNewRovers,
    addNewRoversToExisting,
} from "./martian-landscape/martian-landscape";
import { createPlateau } from "./plateau/plateau";
import {
    createMarsRover,
    Rover,
    RoverCreationData,
    createMarsRoverCollection,
} from "./rover/rover";

import { compassDirections, CompassDirection } from "./types/direction";

import {
    X_MAX,
    Y_MAX,
    MARS_ROVER_DATA_REGEX,
    PLATEAU_DATA_REGEX,
    MOVE_DATA_REGEX,
} from "./constants/constants";

import * as mars_data from "./data/masa-data.json";

describe("parse rover data from imported data", () => {
    test("a Mars rovers collection is created with a rover facing: 'N', x: 1, y: 2 and facing: 'E',x: 3, y: 3, The length is 2", () => {
        const parseData = (arr: string[], pattern: RegExp) => {
            return arr.filter((a) => pattern.test(a));
        };

        const marsDataArray: string[] | undefined = Object.values(mars_data);
        let roverData: string[] = [];
        let plateauData: string[] = [];
        let moveData: string[] = [];

        if (marsDataArray && marsDataArray.length > 0) {
            marsDataArray.pop(); // remove json object itself that gets included somehow in Object.values with json as the last array member??
            roverData = parseData(marsDataArray, MARS_ROVER_DATA_REGEX);
            plateauData = parseData(marsDataArray, PLATEAU_DATA_REGEX);
            moveData = parseData(marsDataArray, MOVE_DATA_REGEX);
        }

        const roverCollectionCreationData: RoverCreationData[] = [];

        roverData.forEach((rd) => {
            roverCollectionCreationData.push({
                x: +rd.split(" ")[0],
                y: +rd.split(" ")[1],
                facing: compassDirections[
                    compassDirections.indexOf(
                        rd.split(" ")[2] as CompassDirection
                    )
                ],
            });
        });

        const roversCollection = createMarsRoverCollection(
            roverCollectionCreationData
        );

        const rover = roversCollection[0];
        const rover2 = roversCollection[1];
        expect(rover.facing).toBe("N");
        expect(rover.x).toBe(1);
        expect(rover.y).toBe(2);
        expect(rover2.facing).toBe("E");
        expect(rover2.x).toBe(3);
        expect(rover2.y).toBe(3);
        expect(roversCollection.length).toBe(2);
    });
});

// test boilerplate
describe(" desciption ", () => {
    // test("specific test details", () => {
    //     //
    // });
});
