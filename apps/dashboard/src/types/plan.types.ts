import { featuresEnum } from "./feature.types";

export enum planStatusEnum {
	IN_TRIAL = "IN_TRIAL",
	ACTIVE = "ACTIVE",
	CANCELLED = "CANCELLED",
	NON_RENEWING = "NON_RENEWING",
}

export enum equipmentEnum {
	GPS_TRACKER_ONLY = "GPS_TRACKER_ONLY",
	GPS_TRACKER_WITH_WEATHER_DEVICE = "GPS_TRACKER_WITH_WEATHER_DEVICE",
}

export interface planType {
	planId: string;
	features: featuresEnum[];
	status: "active" | "archived";
	price: number;
	equipmentPack: {
		name: equipmentEnum;
		price: number;
	};
	trialDuration: number;
	color: string;
	image: string;
	i18nId: string;
}
