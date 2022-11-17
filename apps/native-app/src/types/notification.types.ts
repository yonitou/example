export enum notificationsEnum {
	SENSOR = "sensor",
	DEGRADED_CONDITIONS = "degradedConditions",
	EXPIRED_TASK = "expiredTask",
	DETECTED_TASKS = "detectedTasks",
}

interface notifDataType {
	type: notificationsEnum;
	date: Date;
	taskId?: number;
	deviceId?: number;
	detectedDoneTaskIds?: number[];
	associatedComingTaskIds?: number[];
	farmId?: number;
}
export interface notificationType {
	id: number;
	jsonData: notifDataType;
}

export interface notificationGroupType {
	title: string;
	data: notificationType[];
}
