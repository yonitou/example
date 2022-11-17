export enum nozzleColorsEnum {
	ORANGE = "orange",
	GREEN = "green",
	YELLOW = "yellow",
	PURPLE = "lilas",
	BLUE = "blue",
	RED = "red",
	BROWN = "brown",
	GREY = "grey",
}

export enum nozzleFamilyEnum {
	STANDARD = "CLASSIC_STD",
	CALIBRATE = "CALIBRATE",
	INJECTION = "INJECTION",
	LOW_PRESSURE = "CLASSIC_LOW",
}

export const nozzleFamilyList: nozzleFamilyEnum[] = Object.values(nozzleFamilyEnum);

export interface nozzleType {
	id?: number;
	default?: boolean;
	name?: string;
	family: nozzleFamilyEnum;
	color: nozzleColorsEnum;
	speed: number; // in km/m
	pressure: number; // in bar
	height: number; // in cm
}
