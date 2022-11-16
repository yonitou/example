import { snackbarTypeEnum } from "@Context/SnackbarContext";
import { conditionEnum } from "@Types/condition.types";
import { nozzleColorsEnum } from "@Types/nozzle.types";
import { planStatusEnum } from "@Types/plan.types";

export const COLORS = {
	LAKE: {
		200: "hsla(187deg, 100%, 28%, 1)",
		100: "hsla(187deg, 100%, 35%, 1)",
		50: "hsla(187deg, 100%, 35%, 0.5)",
		25: "hsla(187deg, 100%, 35%, 0.25)",
	},
	SMOKE: {
		100: "hsla(0, 0%, 98%, 1)",
	},
	SKY: {
		100: "hsla(182deg, 67%, 64%, 1)",
		50: "hsla(182deg, 67%, 64%, 0.5)",
		25: "hsla(182deg, 67%, 64%, 0.25)",
	},
	NIGHT: {
		100: "hsla(186deg, 100%, 11%, 1)",
		50: "hsla(186deg, 100%, 11%, 0.5)",
		25: "hsla(186deg, 100%, 11%, 0.25)",
		10: "hsla(186deg, 100%, 11%, 0.1)",
		5: "hsla(186deg, 100%, 11%, 0.05)",
	},
	TANGERINE: {
		200: "hsla(18deg, 84%, 48%, 1)",
		100: "hsla(18deg, 84%, 58%, 1)",
		50: "hsla(18, 84%, 58%, 0.5)",
		25: "hsla(18, 84%, 58%, 0.25)",
	},
	GASPACHO: {
		200: "hsla(360deg, 84%, 55%, 1)",
		100: "hsla(0, 85%, 65%, 1)",
		50: "hsla(0, 85%, 65%, 0.5)",
		25: "hsla(0, 85%, 65%, 0.25)",
	},
	SUN: {
		100: "hsla(28, 96%, 69%, 1)",
		50: "hsla(28, 96%, 69%, 0.5)",
		25: "hsla(28, 96%, 69%, 0.25)",
	},
	GRASS: {
		100: "hsla(143, 94%, 37%, 1)",
		50: "hsla(143, 94%, 37%, 0.5)",
		10: "hsla(143, 94%, 37%, 0.1)",
	},
	LEAF: {
		100: "hsla(104, 79%, 63%, 1)",
		50: "hsla(104, 79%, 63%, 0.5)",
		FONT: " hsla(105, 51%, 54%, 1)",
	},
	BEACH: {
		100: "hsla(43, 100%, 75%, 1)",
		50: "hsla(43, 100%, 75%, 0.5)",
		FONT: "hsla(43, 100%, 50%, 1)",
	},
	WHITE: "hsla(0deg, 0%, 100%, 1)",
};

export const GRADIENTS = {
	LIGHT_GREY: "linear-gradient(180deg, hsla(180deg, 20%, 99%, 1) 0%, hsla(200deg, 27%, 98%, 1) 100%)",
	LIGHT_GREY50: "linear-gradient(180deg, hsla(180deg, 20%, 99%, 0.95) 0%, hsla(200deg, 27%, 98%, 0.95) 100%)",
	BACKGROUND_1: "linear-gradient(154.55deg, hsla(0deg, 0%, 98%, 1) 5.14%, hsla(180deg, 100%, 96%, 1) 97.24%)",
	BACKGROUND_2: "linear-gradient(180deg, hsla(0deg, 0%, 100%, 1) 0%, hsla(180deg, 60%, 98%, 1) 100%)",
	LAKE_GRAD: "linear-gradient(117.16deg, hsla(187deg, 100%, 35%, 1) 3.97%, hsla(181deg, 67%, 64%, 1) 100%)",
	TANGERINE_GRAD: "linear-gradient(242.43deg, hsla(18, 84%, 58%, 1) 0%, hsla(28, 96%, 69%, 1) 100%)",
	SKELETON_GRAD: "linear-gradient(287.43deg, #F2F5F5 11.95%, #E6EBEC 50%, #F2F5F5 88.05%)",
};

export const NOZZLE_COLORS: Record<string, string> = {
	[nozzleColorsEnum.ORANGE]: "hsla(18, 84%, 58%, 1)",
	[nozzleColorsEnum.BLUE]: "hsla(207, 51%, 53%, 1)",
	[nozzleColorsEnum.BROWN]: "hsla(33, 52%, 40%, 1)",
	[nozzleColorsEnum.GREEN]: "hsla(125, 31%, 46%, 1)",
	[nozzleColorsEnum.GREY]: "hsla(180, 3%, 81%, 1)",
	[nozzleColorsEnum.PURPLE]: "hsla(277, 100%, 62%, 1)",
	[nozzleColorsEnum.RED]: "hsla(357, 65%, 50%, 1)",
	[nozzleColorsEnum.YELLOW]: "hsla(54, 93%, 68%, 1)",
};

export const SNACKBAR_COLORS: Record<snackbarTypeEnum, string> = {
	[snackbarTypeEnum.ERROR]: COLORS.GASPACHO[100],
	[snackbarTypeEnum.SUCCESS]: COLORS.GRASS[100],
	[snackbarTypeEnum.INFO]: COLORS.LAKE[100],
};

export const CONDITIONS_COLORS: {
	SLOT: Record<string, string>;
	TEXT: Record<string, string>;
	FIELD: Record<string, string>;
} = {
	SLOT: {
		[conditionEnum.EXCELLENT]: COLORS.GRASS[100],
		[conditionEnum.GOOD]: COLORS.LEAF[100],
		[conditionEnum.CORRECT]: COLORS.BEACH[100],
		[conditionEnum.BAD]: COLORS.GASPACHO[100],
		[conditionEnum.ABSENT_TARGET]: COLORS.NIGHT[10],
	},
	TEXT: {
		[conditionEnum.EXCELLENT]: COLORS.GRASS[100],
		[conditionEnum.GOOD]: COLORS.LEAF.FONT,
		[conditionEnum.CORRECT]: COLORS.BEACH.FONT,
		[conditionEnum.BAD]: COLORS.GASPACHO[100],
		[conditionEnum.ABSENT_TARGET]: COLORS.NIGHT[50],
	},
	FIELD: {
		[conditionEnum.EXCELLENT]: COLORS.GRASS[50],
		[conditionEnum.GOOD]: COLORS.LEAF[50],
		[conditionEnum.CORRECT]: COLORS.BEACH[50],
		[conditionEnum.BAD]: COLORS.GASPACHO[50],
		[conditionEnum.ABSENT_TARGET]: COLORS.WHITE[25],
	},
};

export const PLAN_STATUS_COLORS = {
	[planStatusEnum.IN_TRIAL]: COLORS.LAKE[100],
	[planStatusEnum.ACTIVE]: COLORS.GRASS[100],
	[planStatusEnum.CANCELLED]: COLORS.GASPACHO[100],
	[planStatusEnum.NON_RENEWING]: COLORS.GASPACHO[100],
};

export const computeColorFromConditions = (value: conditionEnum, type: "SLOT" | "TEXT" = "SLOT"): string =>
	CONDITIONS_COLORS[type]?.[value] || COLORS.NIGHT[25];
