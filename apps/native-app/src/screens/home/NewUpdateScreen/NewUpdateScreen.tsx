import { StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import COLORS, { GRADIENTS } from "@Constants/palette";
import { LinearGradient } from "expo-linear-gradient";
import SafeArea from "@Components/SafeArea";
import Spinner from "@Components/Spinner";
import BigTitle from "@Components/BigTitle";
import ParagraphSB from "@Components/ParagraphSB";
import BaseButton from "@Components/BaseButton";
import { NewUpdateScreenProps } from "./screen.types";

const NewUpdateScreen = ({ updating, doUpdate }: NewUpdateScreenProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<LinearGradient colors={GRADIENTS.BACKGROUND_2} style={styles.container}>
			<SafeArea style={styles.centered}>
				<Spinner style={styles.spinner} />
				<BigTitle style={styles.title}>{t("screens.newUpdate.title")}</BigTitle>
				<ParagraphSB style={styles.subtitle}>{t("screens.newUpdate.subtitle")}</ParagraphSB>
				<BaseButton loading={updating} onPress={doUpdate} color={COLORS.LAKE}>
					{updating ? t("screens.newUpdate.loadingButton") : t("screens.newUpdate.updateButton")}
				</BaseButton>
			</SafeArea>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	centered: {
		justifyContent: "center",
		alignItems: "center",
	},
	spinner: {
		flex: 0,
	},
	container: {
		flex: 1,
	},
	title: {
		marginTop: 24,
	},
	subtitle: {
		textAlign: "center",
		marginBottom: 24,
	},
});

export default NewUpdateScreen;
