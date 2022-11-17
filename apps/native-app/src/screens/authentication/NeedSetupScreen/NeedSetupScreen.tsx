import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import COLORS, { GRADIENTS } from "@Constants/palette";
import Header from "@Components/Header";
import SafeArea from "@Components/SafeArea";
import { View, StyleSheet } from "react-native";
import BigTitle from "@Components/BigTitle";
import Title from "@Components/Title";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import { errors } from "./NeedSetup.constants";
import { NeedSetupScreenProps } from "./screen.types";

const NeedSetupScreen = ({ error, logout }: NeedSetupScreenProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<LinearGradient colors={GRADIENTS.BACKGROUND_1} style={styles.container}>
			<Header onCancelPress={logout} backgroundColor="transparent" />
			<View style={styles.top}>{errors[error].asset}</View>
			<SafeArea style={styles.card}>
				<BigTitle style={styles.title}>{t(`screens.needSetup.${error}.title`)}</BigTitle>
				<Title style={styles.subtitle}>{t(`screens.needSetup.${error}.subtitle`)}</Title>
				<>
					{errors[error].body.steps.map((s, i) => {
						const key = `${error} - ${i}`;
						return (
							<View style={styles.step} key={key}>
								{s.asset}
								<Title style={styles.stepLabel}>{t(`screens.needSetup.${error}.steps.${i}`)}</Title>
							</View>
						);
					})}
				</>
			</SafeArea>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	top: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
		paddingHorizontal: HORIZONTAL_PADDING,
	},
	card: {
		borderTopLeftRadius: 16,
		backgroundColor: COLORS.WHITE[100],
		borderTopRightRadius: 16,
		paddingTop: 16,
		flex: 0,
	},
	title: {
		marginBottom: 8,
	},
	subtitle: {
		color: COLORS.NIGHT[50],
	},
	stepLabel: {
		flex: 1,
		marginLeft: 16,
	},
	step: {
		marginTop: 16,
		flexDirection: "row",
		alignItems: "center",
	},
});

export default NeedSetupScreen;
