import { cropType } from "@Types/crops.types";
import { farmType } from "@Types/farm.types";
import { fieldType } from "@Types/fields.types";

export interface TracabilityProps {
	crops: cropType[];
	fields: fieldType[];
	selectedFields: fieldType[];
	setSelectedFields: (f: fieldType[]) => void;
	startTime: Date;
	setStartTime: (time: Date) => void;
	endTime: Date;
	loading: boolean;
	setEndTime: (time: Date) => void;
	onSubmit: () => Promise<void>;
	filterTimeStartTime: (date: Date) => boolean;
	filterTimeEndTime: (date: Date) => boolean;
	farms: farmType[];
}
