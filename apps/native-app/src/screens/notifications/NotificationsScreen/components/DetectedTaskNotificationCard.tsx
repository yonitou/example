import { TouchableOpacity } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { notificationType } from "@Types/notification.types";
import HeaderNotificationCard from "./HeaderNotificationCard";

interface DetectedTaskNotificationCardProps {
	notification: notificationType;
	handleDelete: (id: number) => void;
}

const DetectedTaskNotificationCard = ({
	notification,
	handleDelete,
}: DetectedTaskNotificationCardProps): JSX.Element => {
	const { t } = useTranslation();
	const navigation = useNavigation();
	const onPress = (): void => {
		notification?.jsonData?.associatedComingTaskIds?.length > 0
			? navigation.navigate("Tasks" as never, { screen: "ComingTasksScreen" } as never)
			: navigation.navigate("CreateDoneTaskScreen" as never, { openedAccordion: 1 } as never);
	};
	return (
		<TouchableOpacity onPress={onPress}>
			<HeaderNotificationCard
				handleDelete={handleDelete}
				title={t("screens.notifications.detectedTask.title")}
				type={notification.jsonData.type}
				id={notification.id}
			/>
		</TouchableOpacity>
	);
};

export default DetectedTaskNotificationCard;
