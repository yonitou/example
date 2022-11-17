import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import HygoIcons from "@Icons/HygoIcons";
import { slotType } from "@Types/task.types";
import { conditionEnum } from "@Types/condition.types";
import { metricsType } from "@Types/meteo.types";
import COLORS from "@Constants/palette";
import { tankType } from "@Types/tank.types";
import { TouchableOpacity } from "react-native-gesture-handler";
import Title from "@Components/Title";
import ConditionConverter from "@Components/ConditionConverter";
import MetricsProductList from "../MetricsProductList";
import WeatherDetailsCard from "../WeatherDetailsCard";

interface TaskMetricsReportCardProps {
	selectedSlot: slotType;
	metricsOfTheSelectedSlot: metricsType;
	conditionsOfTheSelectedSlot?: conditionEnum;
	onRequestEdit: () => void;
	selectedDay: string;
	tankIndications: tankType;
}
const TaskMetricsReportCard = ({
	metricsOfTheSelectedSlot,
	selectedSlot,
	conditionsOfTheSelectedSlot,
	onRequestEdit,
	selectedDay,
	tankIndications,
}: TaskMetricsReportCardProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<>
			<View style={styles.header}>
				<View style={styles.sidesWrapper}>
					<HygoIcons.ClockFilled fill={COLORS.LAKE[100]} width={24} height={24} />
					<Title style={styles.title}>{`${selectedDay} ${selectedSlot.min}h - ${selectedSlot.max}h`}</Title>
				</View>

				<TouchableOpacity style={styles.sidesWrapper} onPress={onRequestEdit}>
					<Title style={styles.editLabel}>{t("common.button.edit")}</Title>
					<HygoIcons.SimpleArrowRight fill={COLORS.LAKE[100]} width={16} height={16} />
				</TouchableOpacity>
			</View>

			{conditionsOfTheSelectedSlot && (
				<View style={styles.conditionWrapper}>
					<ConditionConverter condition={conditionsOfTheSelectedSlot} />
				</View>
			)}
			<View style={styles.weatherDetailsWrapper}>
				<WeatherDetailsCard metricsOfTheSelectedSlot={metricsOfTheSelectedSlot} />
			</View>
			<View style={styles.metricsProductList}>
				<MetricsProductList
					productMetrics={tankIndications?.productMetrics}
					metrics={metricsOfTheSelectedSlot}
				/>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	conditionWrapper: {
		marginTop: 16,
	},
	header: {
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
	},
	weatherDetailsWrapper: {
		marginTop: 16,
	},
	title: {
		marginLeft: 8,
	},
	editLabel: {
		color: COLORS.LAKE[100],
		marginRight: 8,
	},
	sidesWrapper: {
		alignItems: "center",
		flexDirection: "row",
	},
	metricsProductList: {
		marginTop: 16,
	},
});

export default TaskMetricsReportCard;
