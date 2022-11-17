export enum productStatusEnum {
	MODULABLE = "MODULABLE",
	VERIFIABLE = "VERIFIABLE",
	NO_VERIFIABLE = "NO_VERIFIABLE",
}

export enum productUnitEnum {
	LITER_PER_HA = "l/ha",
	GRAMS_PER_HA = "g/ha",
	KILOGRAMS_PER_HA = "kg/ha",
}

export enum productFamilyEnum {
	HERBICIDE = "HERBICIDE",
	FERTILIZER = "FERTILIZER",
	GROWTH_REGULATOR = "GROWTH_REGULATOR",
	OTHERS = "OTHERS",
	INSECTICIDE = "INSECTICIDE",
	FONGICIDE = "FONGICIDE",
	MULTI_TREATMENTS = "MULTI_TREATMENTS",
	ADJUVANT = "ADJUVANT",
}
export interface activeProductType {
	id: number;
	name: string;
	unit: string;
	minDose: number;
	maxDose?: number;
	increment: number;
	categories: string[];
	modulationStatus: productStatusEnum;
	modulationActive: boolean;
	reducedDose?: number;
	productFamily: productFamilyEnum;
	reducedQuantity?: number;
	dose?: number;
	modulation?: number;
}
