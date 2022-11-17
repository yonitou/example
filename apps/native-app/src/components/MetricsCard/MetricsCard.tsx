import { View, ViewStyle, StyleProp, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import HygoIcons from "@Icons/HygoIcons";
import { formatTimestampAsTitle } from "@Utils/time";
import { convertMsToKmh } from "@Utils/quantityConverters";
import { metricsType } from "@Types/meteo.types";
import { valueIsBetween } from "@Utils/math";
import COLORS from "@Constants/palette";
import Title from "@Components/Title";
import ParagraphSB from "@Components/ParagraphSB";
import ParagraphLight from "@Components/ParagraphLight";
import { useTranslation } from "react-i18next";

interface MetricsCardProps {
	meteo: metricsType;
	onClickDetails?: (m: metricsType) => void;
	style?: StyleProp<ViewStyle>;
}
const MetricsCard = ({ meteo, onClickDetails, style }: MetricsCardProps): JSX.Element => {
	const { t } = useTranslation();
	const title = formatTimestampAsTitle(meteo.timestamps.from);

	const getPrecipitations = (rMin: number, rMax: number): string => {
		if (rMax === 0 || rMin?.toFixed(0) === rMax.toFixed(0))
			return `${rMax.toFixed(0)}${t("common.units.millimeters")}`;
		return `${rMin?.toFixed(valueIsBetween(rMin, 0, 1) ? 1 : 0)} ${t("common.time.to")} ${rMax.toFixed(
			valueIsBetween(rMax, 0, 1) ? 1 : 0
		)}${t("common.units.millimeters")}`;
	};

	return (
		<TouchableOpacity onPress={() => onClickDetails && onClickDetails(meteo)}>
			<View style={[styles.card, style]}>
				<Title numberOfLines={1}>{title}</Title>
				<View style={styles.cardInfo}>
					<HygoIcons.Temperature height={20} width={20} />
					<ParagraphSB style={styles.cardInfoText}>
						{meteo?.mintemp?.toFixed(0)}
						{t("common.units.degrees")} / {meteo?.maxtemp?.toFixed(0)}
						{t("common.units.degrees")}C
					</ParagraphSB>
				</View>
				<View style={styles.cardInfo}>
					<HygoIcons.Rain height={20} width={20} />
					<ParagraphSB style={styles.cardInfoText}>{getPrecipitations(meteo?.rmin, meteo?.rmax)}</ParagraphSB>
				</View>
				<View style={styles.cardInfo}>
					<HygoIcons.Wind height={20} width={20} fill={COLORS.LAKE[100]} />
					<View>
						<ParagraphSB style={styles.cardInfoText}>
							{convertMsToKmh(meteo?.wind)?.toFixed(0)}
							{t("common.units.kmPerHour")}
						</ParagraphSB>
					</View>
				</View>

				<TouchableOpacity style={styles.cardButton} onPress={() => onClickDetails && onClickDetails(meteo)}>
					<ParagraphLight style={styles.cardButtonText}>{t("components.metricsCard.detail")}</ParagraphLight>
					<HygoIcons.SimpleArrowRight fill={COLORS.LAKE[100]} width="10" style={styles.simpleArrowRight} />
				</TouchableOpacity>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	card: {
		width: 140,
		borderRadius: 8,
		height: 150,
		backgroundColor: COLORS.WHITE[100],
		paddingHorizontal: 16,
		paddingVertical: 8,
	},

	cardInfo: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 8,
	},
	cardInfoText: {
		marginLeft: 12,
	},
	cardButton: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 8,
	},
	cardButtonText: {
		color: COLORS.LAKE[100],
	},
	simpleArrowRight: {
		marginLeft: 16,
	},
});

export default MetricsCard;
