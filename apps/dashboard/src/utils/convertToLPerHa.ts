import { productUnitEnum } from "@Types/activeProduct.types";

export const convertToLPerHa = (dose: number, unit: string): number => {
	const conversionCoeff: Record<string, number> = {
		[productUnitEnum.GRAMS_PER_HA]: 0.001,
		[productUnitEnum.LITER_PER_HA]: 1,
		[productUnitEnum.KILOGRAMS_PER_HA]: 1,
	};
	try {
		const ret = conversionCoeff[unit.toLowerCase()] * dose;
		if (typeof ret === "number") return ret;
		throw new Error("Error convertToLPerHa");
	} catch (e) {
		return null;
	}
};
