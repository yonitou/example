import { FC } from "react";
import ProductFamilyIcons from "@Icons/ProductFamilyIcons";
import { productFamilyEnum } from "@Types/activeProduct.types";
import { SvgProps } from "react-native-svg";

export default {
	[productFamilyEnum.HERBICIDE]: ProductFamilyIcons.Herbicide,
	[productFamilyEnum.FERTILIZER]: ProductFamilyIcons.Fertilizer,
	[productFamilyEnum.GROWTH_REGULATOR]: ProductFamilyIcons.GrowthRegulator,
	[productFamilyEnum.INSECTICIDE]: ProductFamilyIcons.Insecticide,
	[productFamilyEnum.FONGICIDE]: ProductFamilyIcons.Fongicide,
	[productFamilyEnum.ADJUVANT]: ProductFamilyIcons.Adjuvant,
	[productFamilyEnum.OTHERS]: ProductFamilyIcons.Product,
	[productFamilyEnum.MULTI_TREATMENTS]: ProductFamilyIcons.Product,
} as { [key in productFamilyEnum]: FC<SvgProps> };
