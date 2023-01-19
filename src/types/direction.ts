export const compassDirections = ["N", "E", "S", "W"] as const;
export type CompassDirection = typeof compassDirections[number];
