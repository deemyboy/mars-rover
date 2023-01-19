import {
    createMartianLandscape,
    MartianLandscape,
    addNewRovers,
    addNewRoversToExisting,
}from "./martian-landscape/martian-landscape.js";
import { createPlateau }from "./plateau/plateau.js";
import {
    createMarsRover,
    Rover,
    RoverCreationData,
    createMarsRoverCollection,
}from "./rover/rover.js";

import { compassDirections, CompassDirection }from "./types/direction.js";

import {
    X_MAX,
    Y_MAX,
    MARS_ROVER_DATA_REGEX,
    PLATEAU_DATA_REGEX,
    MOVE_DATA_REGEX,
}from "./constants/constants.js";
import mars_data from "./data/masa-data.json" assert { type: "json" };

function MASA() {
    const parseData = (arr: string[], pattern: RegExp) => {
        return arr.filter((a) => pattern.test(a));
    };

    const marsDataArray: string[] | undefined = Object.values(mars_data);
    let roverData: string[] = [];
    let plateauData: string[] = [];
    let ordersData: string[] = [];

    if (marsDataArray && marsDataArray.length > 0) {
        roverData = parseData(marsDataArray, MARS_ROVER_DATA_REGEX);
        plateauData = parseData(marsDataArray, PLATEAU_DATA_REGEX);
        ordersData = parseData(marsDataArray, MOVE_DATA_REGEX);
    }

    console.log(roverData.length, plateauData.length, ordersData.length);

    const roverCollectionCreationData: RoverCreationData[] = [];

    if (roverData && roverData.length > 0) {
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
    }

    const roversCollection = createMarsRoverCollection(
        roverCollectionCreationData
    );

    const plateau = createPlateau(
        +plateauData[0].split(" ")[0],
        +plateauData[0].split(" ")[1]
    );

    const mars = createMartianLandscape(roversCollection, plateau);
    console.log(mars.roversOnMars);
    let rovers = mars.roversOnMars;
    const rover1 = rovers[0].followOrders(ordersData[0], mars.plateau);
    console.log(rover1, ordersData);
    const rover2 = rovers[1].followOrders(ordersData[1], mars.plateau);
    console.log(rover2);
}
MASA();
