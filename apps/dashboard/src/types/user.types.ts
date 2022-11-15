import { featuresEnum } from "./feature.types";
import { planStatusEnum } from "./plan.types";

export enum userLevelEnum {
	FARMER = 1,
	COOP = 2,
	ADMIN = 3,
}

export interface userType {
	amplitudeId: string;
	firstName: string;
	lastName: string;
	testerMode: boolean;
	userId: number;
	phoneNumber: string;
	smagStatus: boolean;
	nozzlesCount: number;
	comingTasksCount: number;
	email: string;
	location: {
		lat: number;
		lon: number;
		label: string;
	};
	level: userLevelEnum;
	plan: {
		name: string;
		status: planStatusEnum;
		trialEnd: Date;
		features: featuresEnum[];
	};
	admin?: {
		userId: number;
		level: number;
		email: string;
		firstName: string;
		lastName: string;
	};
	coopId: number;
	equipments: {
		debit: number;
		soil: string;
		totalArea: number;
	};
	configuration: {
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
