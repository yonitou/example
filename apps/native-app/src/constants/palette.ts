import { conditionEnum } from "@Types/condition.types";
import { nozzleColorsEnum } from "@Types/nozzle.types";

const COLORS = {
	WHITE: {
		100: "hsla(0, 0%, 100%, 1)",
		50: "hsla(0, 0%, 100%, 0.5)",
		25: "hsla(0, 0%, 100%, 0.25)",
	},
	DISABLED: "hsla(186, 13%, 55%, 1)",
	SMOKE: {
		100: "hsla(0, 0%, 98%, 1)",
		50: "hsla(0, 0%, 98%, 0.5)",
		25: "hsla(0, 0%, 98%, 0.25)",
	},
	LAKE: {
		200: "hsla(187, 100%, 28%, 1)",
		100: "hsla(187, 100%, 35%, 1)",
		50: "hsla(187, 100%, 35%, 0.5)",
		25: "hsla(187, 100%, 35%, 0.25)",
	},
	SKY: {
		100: "hsla(182, 67%, 64%, 1)",
		50: "hsla(182, 67%, 64%, 0.5)",
		25: "hsla(182, 67%, 64%, 0.25)",
	},

	NIGHT: {
		100: "hsla(186, 100%, 11%, 1)",
		50: "hsla(186, 100%, 11%, 0.5)",
		25: "hsla(186, 100%, 11%, 0.25)",
		10: "hsla(186, 100%, 11%, 0.1)",
		5: "hsla(186, 100%, 11%, 0.05)",
	},
	TANGERINE: {
		100: "hsla(18, 84%, 58%, 1)",
		50: "hsla(18, 84%, 58%, 0.5)",
		25: "hsla(18, 84%, 58%, 0.25)",
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
		10: "hsla(43, 100%, 50%, 0.1)",
		FONT: "hsla(43, 100%, 50%, 1)",
	},
	GASPACHO: {
		200: "hsla(360, 84%, 55%, 1)",
		100: "hsla(0, 85%, 65%, 1)",
		50: "hsla(0, 85%, 65%, 0.5)",
		25: "hsla(0, 85%, 65%, 0.25)",
		10: "hsla(0, 85%, 65%, 0.1)",
	},
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

export const GRADIENTS = {
	BACKGROUND_1: ["hsla(0, 0%, 98%, 1)", "hsla(180, 100%, 96%, 1)"],
	BACKGROUND_2: ["white", "hsla(180, 60%, 98%, 1)"],
	LIGHT_GREY: ["hsla(180, 20%, 99%, 1)", "hsla(200, 27%, 98%, 1)"],
	LAKE_GRAD: [COLORS.LAKE[100], COLORS.SKY[100]],
	TANGERINE_GRAD: [COLORS.TANGERINE[100], COLORS.SUN[100]],
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

export default COLORS;

export const computeColorFromConditions = (value: conditionEnum, type: "SLOT" | "TEXT" = "SLOT"): string =>
	CONDITIONS_COLORS[type]?.[value] || COLORS.NIGHT[25];
