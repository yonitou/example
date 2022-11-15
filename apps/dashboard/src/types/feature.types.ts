export enum featuresEnum {
	LOCAL_WEATHER = "LOCAL_WEATHER",
	CONDITIONS = "CONDITIONS",
	FARM_WEATHER = "FARM_WEATHER",
	TASKS = "TASKS",
	TRACABILITY = "TRACABILITY",
	REALTIME = "REALTIME",
	OPTIMIZE = "OPTIMIZE",
	WEATHER_DEVICE = "WEATHER_DEVICE",
}

export const featuresList: featuresEnum[] = Object.values(featuresEnum);
