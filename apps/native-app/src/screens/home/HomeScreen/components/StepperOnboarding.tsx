import { Dimensions, StyleSheet, View } from "react-native";
import BaseButton from "@Components/BaseButton";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import Title from "@Components/Title";
import COLORS from "@Constants/palette";
import { TooltipProps } from "rn-tourguide";

import HygoIcons from "@Icons/HygoIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useContext, useState } from "react";
import Subtitle from "@Components/Subtitle";
import { AuthContext } from "@Context/AuthContext";
import { useTranslation } from "react-i18next";
import { lastStepNumber } from "./StepperOnboarding.constants";

const StepperOnboarding = ({
	isFirstStep,
	isLastStep,
	handleNext,
	handleStop,
	currentStep,
}: TooltipProps): JSX.Element => {
	const { t } = useTranslation();
	const { passTutorial, tourKey } = useContext(AuthContext);
	const [showDismiss, setShowDismiss] = useState<boolean>(false);

	const progressbarWidth = `${(parseInt(currentStep.name, 10) / lastStepNumber[tourKey]) * 100}%`;

	const finishOnboarding = async (): Promise<void> => {
		handleStop();
		passTutorial();
	};

	const lastStep = isLastStep || parseInt(currentStep.name, 10) === lastStepNumber[tourKey];

	return (
		<View style={styles.container}>
			{showDismiss ? (
				<>
					<Title style={styles.dismissTitle}>{t("screens.onboarding.stepper.dismiss.title")}</Title>
					<Subtitle style={styles.dismissSubtitle}>
						{t("screens.onboarding.stepper.dismiss.subtitle")}
					</Subtitle>
					<View style={styles.ctas}>
						<BaseButton
							color={COLORS.LAKE}
							outlined
							style={styles.btn}
							onPress={() => setShowDismiss(false)}
						>
							{t("common.button.no")}
						</BaseButton>
						<BaseButton color={COLORS.LAKE} style={styles.btn} onPress={finishOnboarding}>
							{t("common.button.yes")}
						</BaseButton>
					</View>
				</>
			) : (
				<>
					<Title style={styles.body}>{currentStep.text}</Title>
					{isFirstStep ? (
						<View style={styles.ctas}>
							<BaseButton
								color={COLORS.LAKE}
								outlined
								style={styles.btn}
								onPress={() => setShowDismiss(true)}
							>
								{t("common.button.noThanks")}
							</BaseButton>
							<BaseButton color={COLORS.LAKE} style={styles.btn} onPress={handleNext}>
								{t("common.button.letsGo")}
							</BaseButton>
						</View>
					) : (
						<>
							<View style={styles.progressWrapper}>
								<View style={styles.progressBar}>
									<View
										style={[
											StyleSheet.absoluteFill,
											styles.progressIndicator,
											{ width: progressbarWidth },
										]}
									/>
								</View>
								{lastStep ? (
									<TouchableOpacity onPress={finishOnboarding}>
										<HygoIcons.CheckContained width={52} height={52} />
									</TouchableOpacity>
								) : (
									<TouchableOpacity onPress={handleNext}>
										<HygoIcons.ArrowLeftContained width={52} height={52} style={styles.arrowBtn} />
									</TouchableOpacity>
								)}
							</View>
							{!lastStep && (
								<TouchableOpacity onPress={() => setShowDismiss(true)}>
									<Title style={styles.skipText}>
										{t("screens.onboarding.stepper.skipOnboarding")}
									</Title>
								</TouchableOpacity>
							)}
						</>
					)}
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	body: {
		marginBottom: 16,
	},
	dismissSubtitle: {
		marginVertical: 16,
	},
	progressBar: {
		height: 8,
		width: "50%",
		backgroundColor: COLORS.LAKE[25],
		borderRadius: 4,
	},
	progressIndicator: {
		backgroundColor: COLORS.LAKE[100],
		borderRadius: 4,
	},
	dismissTitle: {
		textAlign: "center",
	},
	skipText: {
		color: COLORS.NIGHT[50],
		marginTop: 16,
	},
	arrowBtn: {
		transform: [{ rotateZ: "180deg" }],
	},
	ctas: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	btn: {
		width: "48%",
	},
	container: {
		backgroundColor: COLORS.WHITE[100],
		height: 200,
		padding: HORIZONTAL_PADDING,
		justifyContent: "center",
		width: Dimensions.get("window").width,
	},
	progressWrapper: {
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: "center",
	},
});

export default StepperOnboarding;
