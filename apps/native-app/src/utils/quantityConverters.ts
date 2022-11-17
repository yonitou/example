import { productUnitEnum } from "@Types/activeProduct.types";
import i18next from "i18next";

export const convertMsToKmh = (wind: number): number => {
	if (wind == null && wind !== 0) return null;
	return wind * 3.6;
};

export const convertProductUnit = (unit: string): string => {
	const unitTable: Record<string, string> = {
		[productUnitEnum.GRAMS_PER_HA]: i18next.t("common.units.kilograms"),
		[productUnitEnum.LITER_PER_HA]: i18next.t("common.units.liters").toUpperCase(),
		[productUnitEnum.KILOGRAMS_PER_HA]: i18next.t("common.units.kilograms"),
	};
	try {
		const ret = unitTable[unit.toLowerCase()];
		if (typeof ret === "string") return ret;
		throw new Error(`Error convertProductUnit : ${typeof ret}`);
	} catch (e) {
		return "";
	}
};
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
