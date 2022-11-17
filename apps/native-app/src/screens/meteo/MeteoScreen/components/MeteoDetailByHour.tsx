import { StyleSheet, Image, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import HygoIcons from "@Icons/HygoIcons";
import { metricsType } from "@Types/meteo.types";
import { convertMsToKmh } from "@Utils/quantityConverters";
import { fromISOToDate } from "@Utils/time";
import { PICTO_TO_IMG, PICTO_MAP } from "@Constants/meteo-converter";
import COLORS, { GRADIENTS } from "@Constants/palette";
import Title from "@Components/Title";
import ParagraphSB from "@Components/ParagraphSB";
import { useTranslation } from "react-i18next";

// const CARD_HEIGHT = 102;
interface MeteoDetailByHourProps {
	meteo: metricsType;
}
const MeteoDetailByHour = ({ meteo }: MeteoDetailByHourProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<LinearGradient colors={GRADIENTS.LIGHT_GREY} style={[styles.container]}>
			<View style={styles.detailsContainer}>
				<Title>{`${fromISOToDate(meteo.timestamps.from).hour}H`}</Title>
				{meteo.pictocode && (
					<Image source={PICTO_MAP[PICTO_TO_IMG[meteo.pictocode]]} style={styles.pictocode} />
				)}
			</View>

			<View style={styles.detailsContainer}>
				<HygoIcons.Temperature width={24} height={24} />
				<View>
					<ParagraphSB style={styles.primaryText}>
						{meteo?.maxtemp?.toFixed(0)}
						{t("common.units.degrees")}C
					</ParagraphSB>
					<ParagraphSB style={styles.secondaryText}>
						{meteo?.mintemp?.toFixed(0)}
						{t("common.units.degrees")}C
					</ParagraphSB>
				</View>
			</View>
			<View style={styles.detailsContainer}>
				<HygoIcons.Rain width={24} height={24} />
				<View>
					<ParagraphSB style={styles.primaryText}>
						{meteo?.rmax?.toFixed(1)}
						{t("common.units.millimeters")}
					</ParagraphSB>
					<ParagraphSB style={styles.secondaryText}>
						{meteo?.rmin?.toFixed(1)}
						{t("common.units.millimeters")}
					</ParagraphSB>
				</View>
			</View>
			<View style={styles.detailsContainer}>
				<HygoIcons.Wind width={24} height={24} fill={COLORS.LAKE[100]} />
				<View>
					<ParagraphSB style={styles.primaryText}>
						{convertMsToKmh(meteo?.wind)?.toFixed(0)}
						{t("common.units.kmPerHour")}
					</ParagraphSB>
					<ParagraphSB> </ParagraphSB>
				</View>
			</View>

			<View style={styles.detailsContainer}>
				<HygoIcons.WaterFill width={24} height={24} fill={COLORS.LAKE[100]} />
				<View>
					<ParagraphSB style={styles.primaryText}>
						{meteo?.maxhumi?.toFixed(0)}
						{t("common.units.percentage")}
					</ParagraphSB>
					<ParagraphSB style={styles.secondaryText}>
						{meteo?.minhumi?.toFixed(0)}
						{t("common.units.percentage")}
					</ParagraphSB>
				</View>
			</View>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		paddingHorizontal: 24,
		paddingVertical: 16,
		height: 102,
		alignItems: "center",
		justifyContent: "space-between",
	},
	pictocode: {
		height: 32,
		width: 32,
		resizeMode: "contain",
	},
	detailsContainer: {
		alignItems: "center",
		justifyContent: "space-between",
	},
	primaryText: {
		textAlign: "center",
	},

	secondaryText: {
		color: COLORS.NIGHT[50],
		textAlign: "center",
	},
});

export default MeteoDetailByHour;
