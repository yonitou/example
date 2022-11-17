import { useContext, useEffect, useState } from "react";
import { getNotifications, deleteNotification } from "@Api/hygoApi";
import { notificationsObjectToSortedArray } from "@Utils/dateObjectTransformation";
import { notificationsEnum, notificationType } from "@Types/notification.types";
import { markAsReadAndUpdateBadgeCount } from "@Utils/notifications";
import { UserContext } from "@Context/UserContext";
import { useFeature } from "flagged";
import { featuresEnum } from "@Types/feature.types";
import { NotificationsContainerProps } from "./screen.types";
import NotificationsScreen from "./NotificationsScreen";

const NotificationsContainer = ({ navigation }: NotificationsContainerProps): JSX.Element => {
	const [notifications, setNotifications] = useState([]);
	const [loading, setLoading] = useState<boolean>(false);
	const hasTasks = useFeature(featuresEnum.TASKS);
	const hasTracability = useFeature(featuresEnum.TRACABILITY);
	const hasRealtime = useFeature(featuresEnum.REALTIME);
	const onNavBack = (): void => navigation.goBack();
	const { defaultFarm } = useContext(UserContext);
	useEffect(() => {
		const fetchNotifications = async (): Promise<void> => {
			setLoading(true);
			const fetchedAllNotifications = await getNotifications();
			const currentFarmNotifications = fetchedAllNotifications.filter(
				(notif) =>
					(notif.jsonData.type === notificationsEnum.SENSOR && hasRealtime) ||
					(notif?.jsonData?.farmId === defaultFarm.id &&
						((notif.jsonData.type === notificationsEnum.DEGRADED_CONDITIONS && hasTasks) ||
							(notif.jsonData.type === notificationsEnum.DETECTED_TASKS && hasTracability) ||
							(notif.jsonData.type === notificationsEnum.EXPIRED_TASK && hasTasks)))
			);
			const groupedByDateNotifications = notificationsObjectToSortedArray(currentFarmNotifications);

			setNotifications(groupedByDateNotifications);
			await markAsReadAndUpdateBadgeCount(currentFarmNotifications?.map((notif) => notif?.id));
			setLoading(false);
		};
		if (defaultFarm) fetchNotifications();
	}, [defaultFarm, hasTasks, hasRealtime, hasTracability]);

	const handleDelete = async (id: number): Promise<void> => {
		const filteredNotifs = notifications.map(({ title, data }) => {
			return { title, data: data.filter((notif: notificationType) => notif.id !== id) };
		});

		setNotifications(filteredNotifs);
		await deleteNotification(id);
	};

	return (
		<NotificationsScreen
			handleDelete={handleDelete}
			onNavBack={onNavBack}
			notifications={notifications}
			loading={loading}
		/>
	);
};

export default NotificationsContainer;
