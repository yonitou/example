enum productStatusEnum {
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
	ADJUVANT = "ADJUVANT",
	MULTI_TREATMENTS = "MULTI_TREATMENTS",
}

export interface activeProductType {
	id: number;
	name: string;
	unit: string;
	productFamily: productFamilyEnum;
	minDose: number;
	maxDose?: number;
	categories: string[];
	modulationStatus: productStatusEnum;
	modulationActive: boolean;
	reducedDose?: number;
	reducedQuantity?: number;
	dose?: number;
	modulation?: number;
	coopDose?: number;
	hveDose?: number;
}
