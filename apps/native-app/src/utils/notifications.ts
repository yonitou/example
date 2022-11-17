import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { getComingTask, markNotificationsAsRead, storePushToken } from "@Api/hygoApi";
import { notificationsEnum } from "@Types/notification.types";
import navigate from "./rootNavigation";
import { addHours, getStartOfDayAsJSDate } from "./time";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
});

const getPushToken = async (): Promise<string> => {
	let token;

	if (Device.isDevice) {
		const { status: existingStatus } = await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== "granted") {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== "granted") {
			// Failed to get push token for push notification
			return null;
		}
		token = (await Notifications.getExpoPushTokenAsync({ experienceId: "@alvie1/hygo" })).data;
	} else {
		// Must use physical device for Push Notifications
		return null;
	}

	return token;
};

export const registerForPushNotificationsAsync = async (): Promise<string> => {
	const token = await getPushToken();
	if (token === null) return null;
	if (Platform.OS === "android") {
		Notifications.setNotificationChannelAsync("default", {
			name: "default",
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: "#FF231F7C",
		});
	}
	await storePushToken(token);
	return token;
};

export const markAsReadAndUpdateBadgeCount = async (notificationIds: number[]): Promise<void> => {
	await markNotificationsAsRead(notificationIds);
	const currentUnreadNotificationsCount = await Notifications.getBadgeCountAsync();
	await Notifications.setBadgeCountAsync(currentUnreadNotificationsCount - notificationIds.length);
};

export const handleNotificationResponse = async (data: {
	type: notificationsEnum;
	taskId: number;
	farmId: number;
	deviceId: number;
	associatedComingTaskIds: number[];
}): Promise<void> => {
	switch (data?.type) {
		case notificationsEnum.SENSOR:
			navigate("RealTimeScreen", { deviceId: data?.deviceId } as never);
			break;
		case notificationsEnum.DEGRADED_CONDITIONS:
			{
				const task = await getComingTask(data?.taskId as number, data?.farmId);
				const endTime = addHours(getStartOfDayAsJSDate(task?.selectedDay), task?.selectedSlot?.max);
				if (task && endTime > new Date()) {
					navigate("ComingTaskReportScreen", { initModulation: task });
				}
			}
			break;
		case notificationsEnum.DETECTED_TASKS:
			data?.associatedComingTaskIds?.length > 0
				? navigate("Tasks" as never, { screen: "ComingTasksScreen" } as never)
				: navigate("CreateDoneTaskScreen" as never, { openedAccordion: 1 } as never);
			break;
		case notificationsEnum.EXPIRED_TASK:
			navigate("Tasks" as never, { screen: "ComingTasksScreen" } as never);
			break;
		default:
			break;
	}
};
