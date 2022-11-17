import { activeProductType, productFamilyEnum } from "./activeProduct.types";
import { nozzleType } from "./nozzle.types";
import { fieldType } from "./field.types";
import { metricsType } from "./meteo.types";
import { conditionEnum } from "./condition.types";
import { targetType } from "./target.types";

export enum taskTypeEnum {
	DONE = "DONE",
	COMING = "COMING",
}
export interface slotType {
	min: number;
	max: number;
}

export interface comingTaskTypeDB {
	id: number;
	selectedFields: fieldType[];
	selectedProducts: activeProductType[];
	selectedTargets: targetType[];
	selectedSlot: slotType;
	debit: number;
	nozzle: nozzleType;
	selectedDay: string;
	notes: string;
	productFamily: productFamilyEnum;
	metricsOfTheSelectedSlot: metricsType;
	condition: conditionEnum;
	modulation: number;
}

export interface comingTaskType extends Omit<comingTaskTypeDB, "selectedDay"> {
	selectedDay: Date;
}

export interface doneTaskType {
	id: number;
	productFamily: productFamilyEnum;
	condition: number;
	startTime: Date;
	endTime: Date;
	metricsOfTheSelectedSlot: metricsType;
	needCheck: boolean;
	modulation: number;
	taskId: number;
	selectedTargets: targetType[];
	selectedFields: fieldType[];
	selectedProducts: activeProductType[];
	debit: number;
	nozzle: nozzleType;
	notes: string;
	selectedSlot: slotType;
	read: boolean;
	deviceId: number;
}
