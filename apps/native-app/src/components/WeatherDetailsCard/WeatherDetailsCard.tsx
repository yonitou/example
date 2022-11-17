import { StyleSheet, View } from "react-native";
import HygoIcons from "@Icons/HygoIcons";
import { metricsType } from "@Types/meteo.types";
import { convertMsToKmh } from "@Utils/quantityConverters";
import COLORS from "@Constants/palette";
import ParagraphSB from "@Components/ParagraphSB";
import { useTranslation } from "react-i18next";

interface WeatherDetailsCardProps {
	metricsOfTheSelectedSlot: metricsType;
}
const WeatherDetailsCard = ({ metricsOfTheSelectedSlot }: WeatherDetailsCardProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<View style={styles.predictions}>
			<View style={styles.predictionsSections}>
				<HygoIcons.Temperature height={32} width={32} />
				<View style={styles.predictionsTextContainer}>
					<ParagraphSB>
						{metricsOfTheSelectedSlot?.maxtemp?.toFixed(0) ?? "..."}
						{t("common.units.degrees")}
					</ParagraphSB>
					<ParagraphSB style={styles.predictionsPercentage}>
						{metricsOfTheSelectedSlot?.mintemp?.toFixed(0) ?? "..."}
						{t("common.units.degrees")}
					</ParagraphSB>
				</View>
			</View>
			<View style={styles.predictionsSections}>
				<HygoIcons.Rain height={32} width={32} />
				<View style={styles.predictionsTextContainer}>
					<ParagraphSB>
						{metricsOfTheSelectedSlot?.rmin?.toFixed(1) ?? "..."}
						{t("common.units.millimeters")}
					</ParagraphSB>
					<ParagraphSB style={styles.predictionsPercentage}>
						{metricsOfTheSelectedSlot?.rmax?.toFixed(1) ?? "..."}
						{t("common.units.millimeters")}
					</ParagraphSB>
				</View>
			</View>
			<View style={styles.predictionsSections}>
				<HygoIcons.Wind height={32} width={32} fill={COLORS.LAKE[100]} />
				<View style={styles.predictionsTextContainer}>
					<ParagraphSB>
						{convertMsToKmh(metricsOfTheSelectedSlot?.wind)?.toFixed(0) ?? "..."}
						{t("common.units.kmPerHour")}
					</ParagraphSB>
				</View>
			</View>
			<View style={styles.predictionsSections}>
				<HygoIcons.WaterFill height={32} width={32} fill={COLORS.LAKE[100]} />
				<View style={styles.predictionsTextContainer}>
					<ParagraphSB>
						{metricsOfTheSelectedSlot?.maxhumi?.toFixed(0) ?? "..."}
						{t("common.units.percentage")}
					</ParagraphSB>
					<ParagraphSB style={styles.predictionsPercentage}>
						{metricsOfTheSelectedSlot?.minhumi?.toFixed(0) ?? "..."}
						{t("common.units.percentage")}
					</ParagraphSB>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	predictionsPercentage: {
		color: COLORS.NIGHT[50],
	},
	predictions: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	predictionsSections: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	predictionsTextContainer: {
		marginLeft: 8,
	},
});

export default WeatherDetailsCard;
