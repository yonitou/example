import { View, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import Header from "@Components/Header";
import COLORS from "@Constants/palette";
import HygoIcons from "@Icons/HygoIcons";
import { RadarScreenProps } from "./screen.types";
import MeteoRadar from "./components/MeteoRadar";

const RadarScreen = ({ onNavBack }: RadarScreenProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<View style={styles.container}>
			<Header
				onBackPress={onNavBack}
				title={t("screens.radar.title")}
				headerIcon={<HygoIcons.Rain width={24} height={24} />}
				backgroundColor="transparent"
				textStyle={styles.titleStyle}
			/>
			<View style={styles.viewRadar}>
				<MeteoRadar />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	titleStyle: {
		color: COLORS.WHITE[100],
	},
	viewRadar: {
		position: "absolute",
		width: "100%",
		height: "100%",
	},
});
export default RadarScreen;
