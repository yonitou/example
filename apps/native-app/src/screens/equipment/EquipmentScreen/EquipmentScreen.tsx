import { View, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { Feature } from "flagged";
import { LinearGradient } from "expo-linear-gradient";

import HygoIcons from "@Icons/HygoIcons";
import EquipmentCard from "@Components/EquipmentCard";
import Header from "@Components/Header";
import NozzleList from "@Components/NozzleList";
import BaseButton from "@Components/BaseButton";
import COLORS, { GRADIENTS } from "@Constants/palette";
import ParagraphSB from "@Components/ParagraphSB";
import SafeArea from "@Components/SafeArea";
import { featuresEnum } from "@Types/feature.types";
import { EquipmentScreenProps } from "./screen.types";
import SoilSelector from "./components/SoilSelector";

const EquipmentScreen = ({
	firstSetup,
	setupCompleted,
	loading,
	onSetupButtonPress,
	nozzles,
	onGoBack,
	onPressAdvancedConf,
	onAddNozzle,
	onEditNozzle,
	logout,
}: EquipmentScreenProps): JSX.Element => {
	const { t } = useTranslation();

	return (
		<LinearGradient style={styles.container} colors={GRADIENTS.BACKGROUND_2}>
			<Header
				title={t("screens.equipmentLanding.title")}
				headerIcon={<HygoIcons.PulvEquipment width={24} height={24} fill={COLORS.LAKE[100]} />}
				onBackPress={firstSetup ? null : onGoBack}
				onCancelPress={firstSetup ? logout : null}
				backgroundColor="transparent"
			/>

			<SafeArea>
				<View style={styles.content}>
					<Feature name={featuresEnum.TASKS}>
						<EquipmentCard
							icon={<HygoIcons.Nozzle width={24} height={24} fill={COLORS.TANGERINE[100]} />}
							label={t("screens.equipmentLanding.myNozzles")}
							withCheckIcon={false}
						>
							<View style={styles.equipmentCardWrapper}>
								<View>
									<NozzleList
										nozzles={nozzles}
										onPressAdd={onAddNozzle}
										onPressNozzle={onEditNozzle}
									/>
								</View>
							</View>
						</EquipmentCard>
					</Feature>
					<EquipmentCard
						icon={<HygoIcons.Soil width={24} height={24} fill={COLORS.TANGERINE[100]} />}
						label={t("screens.equipmentLanding.mySoil")}
						withCheckIcon={false}
						withMarginBottom={false}
					>
						<>
							<SoilSelector />
							<ParagraphSB style={styles.soilDescription}>
								{t("screens.equipmentLanding.soilExplicability")}
							</ParagraphSB>
						</>
					</EquipmentCard>
					<Feature name={featuresEnum.TASKS}>
						{setupCompleted && (
							<BaseButton
								style={styles.setupButtonStyle}
								color={COLORS.LAKE}
								outlined
								onPress={onPressAdvancedConf}
							>
								{t("screens.equipmentLanding.advancedSetupBtn")}
							</BaseButton>
						)}
					</Feature>
				</View>
				{firstSetup && (
					<BaseButton
						color={COLORS.LAKE}
						loading={loading}
						disabled={!setupCompleted}
						onPress={onSetupButtonPress}
					>
						{t("screens.equipmentLanding.setupButton")}
					</BaseButton>
				)}
			</SafeArea>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	equipmentCardWrapper: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	content: {
		flex: 1,
	},
	container: {
		flex: 1,
	},
	soilDescription: {
		padding: 8,
		color: COLORS.NIGHT[50],
		backgroundColor: COLORS.NIGHT[5],
		marginTop: 8,
	},
	setupButtonStyle: {
		marginTop: 16,
	},
});

export default EquipmentScreen;
