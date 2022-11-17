import { XYType } from "@Types/realtimescreen.types";

export const smoothData = (data: XYType[]): XYType[] => {
	return data.map((d, index, datas) => {
		const span = data.length > 5 ? Math.round(data.length / 5) : 1;
		const { x } = d;
		const y: number = datas
			.slice(index < span ? 0 : index - span, index + span)
			.map((el: XYType) => el.y)
			.reduce((prev: number, cur: number, i, arr) => {
				return prev + cur / arr.length;
			}, 0);
		return { x, y };
	});
};

export const valueIsBetween = (value: number, minValue: number, maxValue: number): boolean =>
	value < maxValue && value > minValue;

export const countDecimals = (value: number): number => {
	if (value % 1 !== 0) return value.toString().split(".")[1].length;
	return 0;
};
