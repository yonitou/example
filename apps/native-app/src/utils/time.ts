import i18next from "i18next";
import * as Localization from "expo-localization";
import { DateTime, Settings } from "luxon";

Settings.defaultLocale = Localization.locale;

export const minutesWithLeadingZeros = (date: Date): string => {
	return (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
};

export const fromDateToISO = (date: Date): string => {
	return DateTime.fromJSDate(date).toISO({
		includeOffset: false,
		suppressMilliseconds: true,
	});
};

export const addHours = (date: Date, i: number): Date => {
	return DateTime.fromJSDate(date).plus({ hours: i }).toJSDate();
};

export const addDays = (date: Date, i: number): Date => {
	return DateTime.fromJSDate(date).plus({ day: i }).toJSDate();
};

export const substractDays = (date: Date, i: number): Date => {
	return DateTime.fromJSDate(date).minus({ day: i }).toJSDate();
};

export const getXNextDays = (i: number): string[] => {
	const days: string[] = Array.from({ length: i }).map((_, index) =>
		DateTime.now().startOf("day").plus({ days: index }).toJSDate().toISOString()
	);
	return days;
};

export const fromISOToJSDate = (date: string): Date => {
	return date && DateTime.fromISO(date).toJSDate();
};

export const fromISOToDate = (date: string): DateTime => {
	return date && DateTime.fromISO(date);
};

export const formatJSDateInHours = (date: Date): string => {
	return DateTime.fromJSDate(date).toFormat("HH");
};

export const formatJSDateInHoursAndMinutes = (date: Date): string => {
	return DateTime.fromJSDate(date).toFormat("HH'H'mm");
};

export const formatJSDateInDaysName = (date: Date): string => {
	return DateTime.fromJSDate(date).toFormat("cccc");
};

export const getStartOfDayAsJSDate = (date: Date): Date => DateTime.fromJSDate(date).startOf("day").toJSDate();
export const getTodayDateAsJSDate = (): Date => DateTime.now().startOf("day").toJSDate();

export const formatTimestampAsTitle = (timestamp: string): string => {
	if (!timestamp) return "";

	const timestampDate = new Date(Date.parse(timestamp.replace(" ", "T")));
	const currentDate = new Date();

	const isToday =
		timestampDate.getDate() === currentDate.getDate() &&
		timestampDate.getMonth() === currentDate.getMonth() &&
		timestampDate.getFullYear() === currentDate.getFullYear();

	timestampDate.setHours(0, 0, 0, 0);
	currentDate.setHours(0, 0, 0, 0);

	if (isToday) return i18next.t("common.time.today");

	return DateTime.fromJSDate(timestampDate).toFormat("EEE dd MMM");
};
