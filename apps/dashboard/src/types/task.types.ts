import { activeProductType, productFamilyEnum } from "./activeProduct.types";
import { fieldType } from "./fields.types";
import { metricsType } from "./meteo.types";
import { nozzleType } from "./nozzle.types";
import { targetType } from "./target.types";

interface slotType {
	min: number;
	max: number;
}

export enum smagStatusEnum {
	SUCCEEDED = "SUCCEEDED",
	FAILED = "FAILED",
}

export interface doneTaskType {
	id: number;
	condition: number;
	startTime: Date;
	endTime: Date;
	metricsOfTheSelectedSlot: metricsType;
	needCheck: boolean;
	productFamily: productFamilyEnum;
	modulation: number;
	taskId?: number;
	selectedTargets: targetType[];
	selectedFields: fieldType[];
	selectedProducts: activeProductType[];
	debit: number;
	nozzle: nozzleType;
	notes: string;
	selectedSlot: slotType;
	smagStatus: smagStatusEnum;
}
