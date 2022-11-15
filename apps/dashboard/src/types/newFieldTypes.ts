import { cropType } from "./crops.types";

export interface newFieldType {
	name?: string;
	crop?: cropType;
	coordinates?: number[][];
	isEdited?: boolean;
}
