import { doneTaskType } from "@Types/task.types";
import _ from "lodash";

const dayNameFromTask = (date: Date): string => date.toISOString();

interface ObjectGroupedByDateAndSortedType {
	title: string;
	data: unknown[];
}

const mapObjectToArray = (object: Record<string, unknown[]>): ObjectGroupedByDateAndSortedType[] => {
	return Object.keys(object)
		?.map((title) => ({
			title,
			data: object[title],
		}))
		?.sort((day, nextDay) => new Date(nextDay.title).getTime() - new Date(day.title).getTime());
};
export const tasksObjectToSortedArray = (array: unknown[]): ObjectGroupedByDateAndSortedType[] => {
	const object = _.groupBy(array, (item: doneTaskType) => {
		return dayNameFromTask(
			new Date(item.startTime.getFullYear(), item.startTime.getMonth(), item.startTime.getDate())
		);
	});
	return mapObjectToArray(object).map((taskGroup) => {
		return {
			title: taskGroup.title,
			data: taskGroup.data.sort(
				(hour, nextHour) =>
					(hour as doneTaskType).selectedSlot.min - (nextHour as doneTaskType).selectedSlot.min
			),
		};
	});
};
