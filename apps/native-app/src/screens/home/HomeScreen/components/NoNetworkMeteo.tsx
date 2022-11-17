import Title from "@Components/Title";
import COLORS from "@Constants/palette";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import { UserContext } from "@Context/UserContext";
import HygoIcons from "@Icons/HygoIcons";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const NoNetworkMeteo = (): JSX.Element => {
	const { t } = useTranslation();
	const { fetchWeather } = useContext(UserContext);

	return (
		<TouchableOpacity style={styles.container} onPress={fetchWeather}>
			<View style={styles.wrapper}>
				<HygoIcons.ReloadWeather width={110} height={76} fill={COLORS.NIGHT[50]} />
				<Title style={styles.title}>{t("screens.home.components.noNetworkMeteo.title")}</Title>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.WHITE[50],
		height: 152,
		marginHorizontal: HORIZONTAL_PADDING,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
	},
	wrapper: {
		alignItems: "center",
	},
	title: {
		color: COLORS.NIGHT[50],
	},
});

export default NoNetworkMeteo;
