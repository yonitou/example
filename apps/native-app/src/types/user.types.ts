import { featuresEnum } from "./feature.types";
import { hardnessEnum } from "./hardness.types";
import { planStatusEnum } from "./plan.types";
import { soilEnum } from "./soil.types";

enum userLevelEnum {
	FARMER = 1,
	COOP = 2,
	ADMIN = 3,
}
export interface userProperties {
	amplitudeId: string;
	firstName: string;
	lastName: string;
	activationCode: string;
	smagStatus: boolean;
	nozzlesCount: number;
	userId: number;
	comingTasksCount: number;
	tester: boolean;
	email: string;
	level: userLevelEnum;
	plan: {
		trialEnd: string;
		features: featuresEnum[];
		name: string;
		status: planStatusEnum;
	};
	cooperative: {
		id: number;
		name: string;
	};
	admin?: {
		userId: number;
		level: number;
		email: string;
		coopId: number;
		firstName: string;
		lastName: string;
	};
	location: {
		lat: number;
		lon: number;
	};
	equipments: {
		hardness?: hardnessEnum;
		debit: number;
		soil: soilEnum;
		fieldsCount: number;
		totalArea: number;
		soilAcidity: number;
		waterAcidity: number;
		waterHardness: hardnessEnum;
	};
	configuration: {
		hveMode: boolean;
		defaultFarmId: number;
		defaultNozzleId: number;
	};
}

export interface coopUsertype {
	id: number;
	firstName: string;
	lastName: string;
	coopId: number;
	email: string;
	level: number;
	phone: string;
}

export interface newUserType {
	id?: number;
	firstName: string;
	lastName: string;
	email: string;
	ownerEmail?: string;
	level: userLevelEnum;
	coopId?: string;
	phone: string;
	password: string;
	location: { lat: number; lon: number; label: string };
}
