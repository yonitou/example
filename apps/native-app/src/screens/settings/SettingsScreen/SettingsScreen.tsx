import { StyleSheet, Image, View } from "react-native";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import { Feature } from "flagged";
import { featuresEnum } from "@Types/feature.types";
import HygoIcons from "@Icons/HygoIcons";
import SafeArea from "@Components/SafeArea";
import Header from "@Components/Header";
import COLORS, { GRADIENTS } from "@Constants/palette";
import hveImg from "@Assets/settings/hve.png";
import SwitchButton from "@Components/SwitchButton";
import ParagraphSB from "@Components/ParagraphSB";
import Title from "@Components/Title";
import BaseButton from "@Components/BaseButton";
import { ENV_ENUM } from "@Types/app.types";
import UserSelector from "@Components/UserSelector";
import { SettingsScreenProps } from "./screen.types";

const SettingsScreen = ({
	onNavBack,
	hveMode,
	updateHveMode,
	admin,
	appEnv,
	onDeleteLocalData,
}: SettingsScreenProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<LinearGradient colors={GRADIENTS.BACKGROUND_2} style={styles.container}>
			<Header
				title={t("screens.settings.title")}
				headerIcon={<HygoIcons.Settings width={24} height={24} fill={COLORS.LAKE[100]} />}
				onBackPress={onNavBack}
			/>
			<SafeArea>
				<Feature name={featuresEnum.OPTIMIZE}>
					<View style={styles.card}>
						<SwitchButton
							value={hveMode}
							onValueChange={updateHveMode}
							title={t("screens.settings.hve.title")}
							icon={<Image source={hveImg} style={styles.imageSize} />}
						/>
						<ParagraphSB style={styles.description}>{t("screens.settings.hve.description")}</ParagraphSB>
					</View>
				</Feature>
				{admin && (
					<View style={styles.card}>
						<Title>{t("screens.settings.user.title")}</Title>
						<UserSelector />
						<ParagraphSB style={styles.description}>{t("screens.settings.user.description")}</ParagraphSB>
					</View>
				)}
				{(appEnv === ENV_ENUM.PREVIEW || appEnv === ENV_ENUM.DEVELOPMENT) && (
					<View style={[styles.card, styles.zIndexCard]}>
						<Title>{t("screens.settings.clearData.title")}</Title>
						<BaseButton color={COLORS.LAKE} outlined onPress={onDeleteLocalData}>
							{t("screens.settings.clearData.btn")}
						</BaseButton>
						<ParagraphSB style={styles.description}>
							{t("screens.settings.clearData.description")}
						</ParagraphSB>
					</View>
				)}
			</SafeArea>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	imageSize: {
		width: 24,
		height: 24,
	},
	description: {
		color: COLORS.NIGHT[50],
		backgroundColor: COLORS.NIGHT[5],
		padding: 8,
		marginTop: 8,
	},
	zIndexCard: {
		zIndex: -1,
	},

	card: {
		marginBottom: 24,
	},
});

export default SettingsScreen;
