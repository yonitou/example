import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { notificationsEnum } from "@Types/notification.types";
import HygoIcons from "@Icons/HygoIcons";
import COLORS from "@Constants/palette";
import ParagraphSB from "@Components/ParagraphSB";

interface HeaderNotificationCard {
	type: notificationsEnum;
	title: string;
	handleDelete: (id: number) => void;
	id: number;
}

const HeaderNotificationCard = ({ type, title, id, handleDelete }: HeaderNotificationCard): JSX.Element => {
	const getIcon = (iconType: notificationsEnum): JSX.Element => {
		switch (iconType) {
			case notificationsEnum.SENSOR:
				return <HygoIcons.QRCode fill={COLORS.LAKE[100]} width={32} height={32} />;
			case notificationsEnum.DEGRADED_CONDITIONS:
				return <HygoIcons.Weather width={32} height={32} fill={COLORS.LAKE[100]} />;
			case notificationsEnum.EXPIRED_TASK:
				return <HygoIcons.ClockFilled width={32} height={32} fill={COLORS.LAKE[100]} />;
			case notificationsEnum.DETECTED_TASKS:
				return <HygoIcons.Tractor width={32} height={32} fill={COLORS.LAKE[100]} />;
			default:
				return <HygoIcons.Ring width={32} height={32} />;
		}
	};

	return (
		<View style={styles.container}>
			{getIcon(type)}
			<ParagraphSB style={styles.title}>{title}</ParagraphSB>
			<TouchableOpacity onPress={() => handleDelete(id)}>
				<HygoIcons.Cancel />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	title: {
		flex: 1,
		marginHorizontal: 16,
	},
});

export default HeaderNotificationCard;
