export const textReducer = (text: string, length: number): string => {
	const len = text?.slice(0, length);
	return text?.length <= length ? len : `${len}...`;
};
const WithPrecision = (value: number, precision: number): number => {
	const expo = precision || 0;
	const multiplier = 10 ** expo;
	return Math.round(value * multiplier) / multiplier;
};
export const convertToHa = (mettre2: number): number => {
	const dec = mettre2 / 10000;
	return WithPrecision(dec, 2);
};
