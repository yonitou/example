interface useSeasonsReturnType {
	stepSeasons: Date[][];
	actualSeason: Date[];
	yearRange: number[];
	actualYear: number;
}

export const useSeasons = (): useSeasonsReturnType => {
	const nextYear = new Date().getFullYear() + 1;
	const yearRange = Array.from({ length: (2019 - nextYear) / -1 + 1 }, (_, i) => nextYear + i * -1).sort();
	const stepSeasons = yearRange.map((y) => [new Date(y, 8, 1), new Date(y + 1, 7, 31, 23, 59, 59, 999)]);
	const actualSeason = stepSeasons.find(
		(s) => new Date().getTime() <= s[1].getTime() && new Date().getTime() >= s[0].getTime()
	);

	return { stepSeasons, actualSeason, yearRange, actualYear: new Date().getFullYear() };
};
