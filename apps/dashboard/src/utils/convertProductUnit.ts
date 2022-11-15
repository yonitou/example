import { productUnitEnum } from "@Types/activeProduct.types";
import i18next from "i18next";

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
