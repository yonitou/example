import { StyleSheet, ImageBackground } from "react-native";
import { useTranslation } from "react-i18next";
import COLORS from "@Constants/palette";
import BigTitle from "@Components/BigTitle";
import SafeArea from "@Components/SafeArea";
import backgroundImg from "@Assets/authentication/signin/background.png";
import Header from "@Components/Header";
import UserSelector from "@Components/UserSelector";
import Title from "@Components/Title";
import ParagraphSB from "@Components/ParagraphSB";
import { AdminLandingScreenProps } from "./screen.types";

const AdminLandingScreen = ({ coop }: AdminLandingScreenProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<ImageBackground source={backgroundImg} resizeMode="cover" style={styles.background}>
			<Header customTitle={<BigTitle>{coop?.name}</BigTitle>} />
			<SafeArea>
				<Title>{t("screens.adminLandingScreen.userSelectorLabel")}</Title>
				<UserSelector />

				<ParagraphSB style={styles.inputTip}>{t("screens.adminLandingScreen.helpers.1")}</ParagraphSB>
				<ParagraphSB style={styles.inputTip}>{t("screens.adminLandingScreen.helpers.2")}</ParagraphSB>
			</SafeArea>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	background: {
		flex: 1,
	},
	inputTip: {
		backgroundColor: COLORS.NIGHT[5],
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 4,
		marginTop: 8,
		color: COLORS.NIGHT[50],
	},
});

export default AdminLandingScreen;
