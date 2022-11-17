import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { notificationType } from "@Types/notification.types";
import { useContext } from "react";
import { UserContext } from "@Context/UserContext";
import HeaderNotificationCard from "./HeaderNotificationCard";

interface SensorNotificationCardProps {
	notification: notificationType;
	handleDelete: (id: number) => void;
}

const SensorNotificationCard = ({ notification, handleDelete }: SensorNotificationCardProps): JSX.Element => {
	const { t } = useTranslation();
	const { devices } = useContext(UserContext);
	const deviceId = notification?.jsonData?.deviceId;
	const device = devices.find((d) => d.id === deviceId);
	const navigation = useNavigation();
	const onPress = (): void => {
		navigation.navigate("RealTimeScreen" as never, { deviceId } as never);
	};

	return (
		<TouchableOpacity onPress={onPress}>
			<HeaderNotificationCard
				handleDelete={handleDelete}
				title={t("screens.notifications.sensor.title", { name: device?.name })}
				type={notification.jsonData.type}
				id={notification.id}
			/>
		</TouchableOpacity>
	);
};

export default SensorNotificationCard;
