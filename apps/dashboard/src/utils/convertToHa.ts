const WithPrecision = (value: number, precision: number): number => {
	const multiplier = 10 ** (precision || 0);
	return Math.round(value * multiplier) / multiplier;
};
export const convertToHa = (value: number): number => {
	const dec = value / 10000;
	return WithPrecision(dec, 1);
};
