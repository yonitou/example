import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { slotType } from "@Types/task.types";
import HygoIcons from "@Icons/HygoIcons";
import { minutesWithLeadingZeros } from "@Utils/time";
import COLORS from "@Constants/palette";
import Title from "@Components/Title";

interface DateReportCardProps {
	selectedDay: string;
	selectedSlot: slotType;
	startTime?: Date;
	endTime?: Date;
}
const DateReportCard = ({ selectedDay, selectedSlot, startTime, endTime }: DateReportCardProps): JSX.Element => {
	const { t } = useTranslation();
	const title =
		startTime && endTime
			? `${selectedDay} ${t("common.time.from")} ${selectedSlot.min}H${minutesWithLeadingZeros(startTime)} ${t(
					"common.time.to"
			  )} ${selectedSlot.max}H${minutesWithLeadingZeros(endTime)}`
			: `${selectedDay} ${t("common.time.from")} ${selectedSlot.min}H ${t("common.time.to")} ${
					selectedSlot.max
			  }H`;
	return (
		<View style={styles.header}>
			<View style={styles.sidesWrapper}>
				<HygoIcons.ClockFilled fill={COLORS.LAKE[100]} width={24} height={24} />
				<Title style={styles.title}>{title}</Title>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
	},
	title: {
		marginLeft: 8,
	},

	sidesWrapper: {
		alignItems: "center",
		flexDirection: "row",
	},
});

export default DateReportCard;
