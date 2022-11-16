import i18next from "i18next";

export const formatDate = (date: Date, value: number, method: (x: number) => number): string => {
	const ms = 1000 * 60 * value;
	const roundedDate = new Date(method(date.getTime() / ms) * ms);
	const formattedDate = `${roundedDate.getHours().toString().padStart(2, "0")}${i18next.t(
		"common.units.hour"
	)}${roundedDate.getMinutes().toString().padStart(2, "0")}`;
	return formattedDate;
};
