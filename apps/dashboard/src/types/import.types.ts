export enum importStatusEnum {
	OK = "OK",
	ERROR = "ERROR",
	PENDING = "PENDING",
}

export interface importRequestType {
	farmId: number;
	overwrite: boolean;
	file: File;
}
