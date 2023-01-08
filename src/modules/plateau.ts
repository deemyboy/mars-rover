interface Plateau {
    xAxisLength: number;
    yAxisLength: number;
}

export const createPlateau = (
    xAxisLength: number,
    yAxisLength: number
): Plateau => {
    const marsPlateau: Plateau = {
        xAxisLength: xAxisLength,
        yAxisLength: yAxisLength,
    };
    return marsPlateau;
};
