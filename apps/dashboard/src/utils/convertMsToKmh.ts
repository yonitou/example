export const convertMsToKmh = (wind: number): number => {
	if (wind == null && wind !== 0) return null;
	return wind * 3.6;
};
