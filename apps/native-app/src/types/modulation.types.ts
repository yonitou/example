import { activeProductType } from "./activeProduct.types";
import { conditionEnum } from "./condition.types";
import { fieldType } from "./field.types";
import { nozzleType } from "./nozzle.types";
import { targetType } from "./target.types";
import { slotType } from "./task.types";

export enum modulationStatusEnum {
	MODULATION_ACTIVE = "MODULATION_ACTIVE",
	ENABLE_EXPERT_MODE = "ENABLE_EXPERT_MODE", // message 1
	MAX_MODULATION_REACHED = "MAX_MODULATION_REACHED", // message 2
	NO_MODULATION_AVAILABLE = "NO_MODULATION_AVAILABLE", // message 3,
}

export interface modulationDataType {
	timestamp: string;
	modulationOverSlot: number;
	conditionOverSlot: conditionEnum;
	modulation: number;
	condition: conditionEnum;
	modulationByProductOverSlot: {
		productId: number;
		modulation: number;
	}[];
}
export interface modulationType {
	status: modulationStatusEnum;
	data: modulationDataType[];
}

export interface ModulationInfosType {
	id?: number;
	selectedFields: fieldType[];
	selectedProducts: activeProductType[];
	selectedTargets: targetType[];
	selectedSlot: slotType;
	debit: number;
	nozzle: nozzleType;
	selectedDay: Date;
	notes: string;
}
