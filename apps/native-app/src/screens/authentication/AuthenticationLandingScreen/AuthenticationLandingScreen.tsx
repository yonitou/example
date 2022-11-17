import { StyleSheet, ImageBackground, View } from "react-native";
import { useTranslation } from "react-i18next";
import COLORS from "@Constants/palette";
import HygoIcons from "@Icons/HygoIcons";
import BigTitle from "@Components/BigTitle";
import BaseButton from "@Components/BaseButton";
import SafeArea from "@Components/SafeArea";
import backgroundImg from "@Assets/authentication/landing/background.png";
import { AuthenticationLandingProps } from "./screen.types";

const AuthenticationLandingScreen = ({
	goToBarcode,
	goToSignin,
	goToSignup,
}: AuthenticationLandingProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<ImageBackground source={backgroundImg} resizeMode="cover" style={styles.background}>
			<SafeArea>
				<View style={styles.empty} />
				<View style={styles.content}>
					<HygoIcons.HygoLogoDrop width={50} height={59} style={styles.logo} />
					<BigTitle style={styles.title}>{t("screens.authenticationLanding.title")}</BigTitle>
					<BaseButton
						style={styles.topButton}
						color={COLORS.LAKE}
						fillIcon
						outlined
						Icon={HygoIcons.QRCode}
						onPress={goToBarcode}
					>
						{t("screens.authenticationLanding.loginWithQR")}
					</BaseButton>
					<BaseButton
						color={COLORS.LAKE}
						Icon={HygoIcons.User}
						outlined
						fillIcon
						onPress={goToSignin}
						style={styles.bottomButton}
					>
						{t("screens.authenticationLanding.loginWithEmail")}
					</BaseButton>
					<BaseButton color={COLORS.LAKE} onPress={goToSignup}>
						{t("screens.authenticationLanding.createAccount")}
					</BaseButton>
				</View>
			</SafeArea>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	background: {
		flex: 1,
	},
	empty: {
		flex: 0.5,
	},
	content: {
		flex: 0.5,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-end",
	},
	title: {
		textAlign: "center",
	},
	logo: {
		marginBottom: 24,
	},
	topButton: {
		marginTop: 32,
		marginBottom: 16,
	},
	bottomButton: {
		marginBottom: 32,
	},
});

export default AuthenticationLandingScreen;
