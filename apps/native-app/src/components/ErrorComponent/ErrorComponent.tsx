import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";
import * as Updates from "expo-updates";
import COLORS, { GRADIENTS } from "@Constants/palette";
import { useTranslation } from "react-i18next";
import Title from "@Components/Title";
import ParagraphSB from "@Components/ParagraphSB";
import Header from "@Components/Header";
import SafeArea from "@Components/SafeArea";

import { useContext } from "react";
import { AuthContext } from "@Context/AuthContext";
import BaseButton from "../BaseButton";

interface ErrorComponentProps {
	icon: JSX.Element;
	title: string;
	description: string;
	retryButton?: boolean;
	onClick?: () => void;
}

const ErrorComponent = ({
	icon,
	title,
	description,
	retryButton = true,
	onClick = Updates.reloadAsync,
}: ErrorComponentProps): JSX.Element => {
	const { t } = useTranslation();
	const { logout } = useContext(AuthContext);

	return (
		<LinearGradient colors={GRADIENTS.BACKGROUND_1} style={styles.container}>
			<SafeArea>
				<Header onCancelPress={logout} backgroundColor="transparent" />
				<View style={styles.errorWrapper}>
					{icon}
					<Title style={styles.title}>{title}</Title>
					<ParagraphSB style={styles.subtitle}>{description}</ParagraphSB>
					<ParagraphSB style={[styles.subtitle, styles.subsistentSubtitle]}>
						{t("screens.error.contactSubline")}
					</ParagraphSB>
					{retryButton && (
						<BaseButton onPress={onClick} color={COLORS.LAKE} style={styles.button}>
							{t("common.button.retry")}
						</BaseButton>
					)}
				</View>
			</SafeArea>
		</LinearGradient>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	errorWrapper: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		marginVertical: 16,
		textAlign: "center",
	},
	button: {
		marginTop: 16,
	},
	subsistentSubtitle: {
		marginTop: 16,
	},
	subtitle: {
		textAlign: "center",
	},
});
export default ErrorComponent;
