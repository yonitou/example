import { StyleSheet, SectionList, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import SafeArea from "@Components/SafeArea";
import Header from "@Components/Header";
import { formatTimestampAsTitle } from "@Utils/time";
import { notificationsEnum, notificationType } from "@Types/notification.types";
import HygoIcons from "@Icons/HygoIcons";
import Spinner from "@Components/Spinner";
import COLORS, { GRADIENTS } from "@Constants/palette";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import Title from "@Components/Title";
import SensorNotificationCard from "./components/SensorNotificationCard";
import ConditionsNotificationCard from "./components/ConditionsNotificationCard";

import { NotificationsScreenProps } from "./screen.types";
import ExpiredTaskNotificationCard from "./components/ExpiredTaskNotificationCard";
import DetectedTaskNotificationCard from "./components/DetectedTaskNotificationCard";

const renderNotificationTypeCard = (
	notification: notificationType,
	handleDelete: (id: number) => void
): JSX.Element => {
	switch (notification.jsonData.type) {
		case notificationsEnum.SENSOR:
			return <SensorNotificationCard handleDelete={handleDelete} notification={notification} />;
		case notificationsEnum.DEGRADED_CONDITIONS:
			return <ConditionsNotificationCard handleDelete={handleDelete} notification={notification} />;
		case notificationsEnum.EXPIRED_TASK:
			return <ExpiredTaskNotificationCard handleDelete={handleDelete} notification={notification} />;
		case notificationsEnum.DETECTED_TASKS:
			return <DetectedTaskNotificationCard handleDelete={handleDelete} notification={notification} />;
		default:
			return null;
	}
};

const NotificationsScreen = ({
	onNavBack,
	notifications,
	handleDelete,
	loading,
}: NotificationsScreenProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<LinearGradient colors={GRADIENTS.BACKGROUND_1} style={styles.container}>
			<Header
				title={t("screens.notifications.title")}
				headerIcon={<HygoIcons.Ring fill={COLORS.LAKE[100]} width={24} height={24} />}
				onBackPress={onNavBack}
				backgroundColor="transparent"
			/>
			<SafeArea withBottomPadding={false} withHorizontalPadding={false}>
				{loading && <Spinner />}
				{!loading && notifications?.length > 0 && (
					<SectionList
						sections={notifications}
						showsVerticalScrollIndicator={false}
						stickySectionHeadersEnabled={false}
						keyExtractor={(item) => item.id.toString()}
						ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
						renderSectionHeader={({ section: { title } }) => (
							<Title style={styles.dateGroupText}>{formatTimestampAsTitle(title)}</Title>
						)}
						renderItem={({ item }) => {
							return (
								<View key={item.id} style={styles.notificationCard}>
									{renderNotificationTypeCard(item, handleDelete)}
								</View>
							);
						}}
					/>
				)}
			</SafeArea>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	dateGroupText: {
		marginVertical: 8,
		paddingHorizontal: HORIZONTAL_PADDING,
	},
	itemSeparator: {
		height: 8,
	},
	notificationCard: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		backgroundColor: COLORS.WHITE[100],
	},
});

export default NotificationsScreen;
