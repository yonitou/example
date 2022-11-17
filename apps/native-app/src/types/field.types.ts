import { conditionEnum } from "./condition.types";
import { metricsType } from "./meteo.types";

interface featureType {
	bbox: number[]; // 4 elements
	coordinates: number[][][];
	type: string;
}

export interface fieldType {
	condition?: conditionEnum;
	metricsOfTheSelectedSlot?: metricsType;
	endTime?: string;
	area: number; // in meter
	crop: {
		name: string;
		id: number;
	};
	features: featureType;
	year: number;
	id: number;
	selected?: boolean;
	placeId?: number;
	name: string;
	svg: string;
	town?: string;
	soil?: string;
}
