import { userLevelEnum } from "./user.types";

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
