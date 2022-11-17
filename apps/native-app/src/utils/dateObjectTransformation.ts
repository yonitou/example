import _ from "lodash";
import { comingTaskType, doneTaskType } from "@Types/task.types";
import { notificationType } from "@Types/notification.types";
import { fromDateToISO } from "./time";

const dayNameFromTask = (date: Date): string => fromDateToISO(date);

interface ObjectGroupedByDateAndSortedType {
	title: string;
	data: unknown[];
}

const mapObjectToArray = (
	object: Record<string, unknown[]>,
	isDescending: boolean
): ObjectGroupedByDateAndSortedType[] => {
	return Object.keys(object)
		?.map((title) => ({
			title,
			data: object[title],
		}))
		?.sort((day, nextDay) => {
			return isDescending
				? new Date(nextDay.title).getTime() - new Date(day.title).getTime()
				: new Date(day.title).getTime() - new Date(nextDay.title).getTime();
		});
};
export const tasksObjectToSortedArray = (array: unknown[], comingTask: boolean): ObjectGroupedByDateAndSortedType[] => {
	const object = _.groupBy(array, (item) => {
		return dayNameFromTask(
			comingTask
				? (item as comingTaskType).selectedDay
				: new Date(
						(item as doneTaskType).startTime.getFullYear(),
						(item as doneTaskType).startTime.getMonth(),
						(item as doneTaskType).startTime.getDate()
				  )
		);
	});
	return mapObjectToArray(object, !comingTask).map((taskGroup) => {
		return {
			title: taskGroup.title,
			data: taskGroup.data.sort(
				(hour, nextHour) =>
					(hour as comingTaskType | doneTaskType).selectedSlot.min -
					(nextHour as comingTaskType | doneTaskType).selectedSlot.min
			),
		};
	});
};

export const notificationsObjectToSortedArray = (array: notificationType[]): ObjectGroupedByDateAndSortedType[] => {
	const object = _.groupBy(array, (item) => {
		return dayNameFromTask(
			new Date(item.jsonData.date.getFullYear(), item.jsonData.date.getMonth(), item.jsonData.date.getDate())
		);
	});
	return mapObjectToArray(object, true);
};
