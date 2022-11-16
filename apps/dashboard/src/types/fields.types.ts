import { conditionEnum } from "./condition.types";
import { cropType } from "./crops.types";
import { metricsType } from "./meteo.types";

export interface fieldType {
	area: number; // in meter
	crop: cropType;
	features: {
		bbox: number[];
		coordinates: Array<Array<Array<number>>>;
		type: string;
	};
	metricsOfTheSelectedSlot?: metricsType;
	condition?: conditionEnum;
	smagCropZoneUid: string;
	startTime: string;
	endTime: string;
	lat: number;
	lon: number;
	year: number;
	id: number;
	selected?: boolean;
	name: string;
	svg: string;
	town?: string;
	needCheck: boolean;
	isEdited?: boolean;
}

export interface updateFieldType {
	fieldId: number;
	coordinates?: { lat: number; lon: number }[];
	cropId?: number;
	name?: string;
	area?: number;
}
