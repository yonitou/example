import COLORS from "@Constants/palette";
import HygoIcons from "@Icons/HygoIcons";
import ProductFamilyIcons from "@Icons/ProductFamilyIcons";
import { recommendationType } from "@Types/tank.types";
import { FC } from "react";
import { SvgProps } from "react-native-svg";
import Analytics, { analyticsEventEnum } from "@Analytics";

const { events } = Analytics;

export const recommendationDetails: Record<
	keyof recommendationType,
	{
		colorPalette: Record<number, string>;
		clickable?: boolean;
		Icon: FC<SvgProps>;
		withProductsExamples?: boolean;
		analyticEvent?: analyticsEventEnum;
	}
> = {
	warning: {
		colorPalette: COLORS.GASPACHO,
		Icon: HygoIcons.Warning,
	},
	addWettingAndOilReco: {
		colorPalette: COLORS.GRASS,
		clickable: true,
		Icon: ProductFamilyIcons.Adjuvant,
		withProductsExamples: true,
		analyticEvent: events.modulation.modulationProductsScreen.clickOnRecommendedAdjuvants,
	},
	addOilReco: {
		colorPalette: COLORS.GRASS,
		clickable: true,
		Icon: ProductFamilyIcons.Adjuvant,
		withProductsExamples: true,
		analyticEvent: events.modulation.modulationProductsScreen.clickOnRecommendedAdjuvants,
	},
	addWettingReco: {
		colorPalette: COLORS.GRASS,
		clickable: true,
		Icon: ProductFamilyIcons.Adjuvant,
		withProductsExamples: true,
		analyticEvent: events.modulation.modulationProductsScreen.clickOnRecommendedAdjuvants,
	},
	noAdjReco: {
		colorPalette: COLORS.BEACH,
		clickable: true,
		Icon: ProductFamilyIcons.Adjuvant,
		analyticEvent: events.modulation.modulationProductsScreen.clickOnRemoveAdjuvants,
	},
	noOilReco: {
		colorPalette: COLORS.BEACH,
		clickable: true,
		Icon: ProductFamilyIcons.Adjuvant,
		analyticEvent: events.modulation.modulationProductsScreen.clickOnRemoveAdjuvants,
	},
};
