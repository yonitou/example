import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feature } from "flagged";
import { featuresEnum } from "@Types/feature.types";
import BaseButton from "@Components/BaseButton";
import ModulationBar from "@Components/ModulationBar";
import { LinearGradient } from "expo-linear-gradient";
import Slider from "@Components/Slider";
import Header from "@Components/Header";
import StepProgress from "@Components/StepProgress";
import Spinner from "@Components/Spinner";
import { modulationStatusEnum } from "@Types/modulation.types";
import MetricsProductList from "@Components/MetricsProductList";
import SafeArea from "@Components/SafeArea";
import { HORIZONTAL_PADDING, VERTICAL_PADDING } from "@Constants/styleValues";
import COLORS, { GRADIENTS } from "@Constants/palette";
import ParagraphSB from "@Components/ParagraphSB";
import BigTitle from "@Components/BigTitle";
import ConditionConverter from "@Components/ConditionConverter";
import formatPaddingNumber from "@Utils/formatPaddingNumber";
import WeatherDetailsCard from "@Components/WeatherDetailsCard";
import { ModulationSlotScreenProps } from "./screen.types";
import WeekTab from "./components/WeekTab";
import ModulationCard from "./components/ModulationCard";

const ModulationSlotScreen = ({
	onNavBack,
	onNavClose,
	onNavNext,
	modulationDisabled,
	metricsOfTheSelectedSlot,
	onTabChange,
	modulationStatus,
	modulationOfTheSelectedSlot,
	conditionsOfTheSelectedSlot,
	conditionsOfTheSelectedDay,
	slot,
	selectedDay,
	tankIndications,
	modulationOfTheSelectedDay,
	conditions,
	onValuesChange,
	slotSize,
	loading,
	modulationError,
}: ModulationSlotScreenProps): JSX.Element => {
	const { t } = useTranslation();
	const BAR_WIDTH = Dimensions.get("screen").width - HORIZONTAL_PADDING * 2;
	const { bottom } = useSafeAreaInsets();

	return (
		<View style={styles.container}>
			<Header
				onBackPress={onNavBack}
				customTitle={<StepProgress step={3} title={t("screens.selectedSlot.title")} totalSteps={3} />}
				onCancelPress={onNavClose}
			/>

			<SafeArea withHorizontalPadding={false} withBottomPadding={false}>
				{loading ? (
					<Spinner />
				) : (
					<>
						<LinearGradient colors={GRADIENTS.BACKGROUND_1}>
							<View style={styles.weekTabWrapper}>
								<WeekTab selectedDay={selectedDay} onTabChange={onTabChange} conditions={conditions} />
							</View>
						</LinearGradient>
						<View style={styles.header}>
							<BigTitle>
								{formatPaddingNumber(slot?.min)}h - {formatPaddingNumber(slot?.max)}h
							</BigTitle>
							{!modulationError && <ConditionConverter condition={conditionsOfTheSelectedSlot} />}
						</View>
						<ScrollView style={styles.content}>
							<WeatherDetailsCard metricsOfTheSelectedSlot={metricsOfTheSelectedSlot} />
							<Feature name={featuresEnum.OPTIMIZE}>
								<View style={styles.modulationWrapper}>
									<ModulationCard
										modulation={modulationOfTheSelectedSlot}
										enabled={
											modulationStatus === modulationStatusEnum.MODULATION_ACTIVE &&
											!modulationDisabled
										}
									/>
								</View>
							</Feature>
							<View style={styles.metricsProductList}>
								<MetricsProductList
									productMetrics={tankIndications?.productMetrics}
									metrics={metricsOfTheSelectedSlot}
								/>
							</View>
						</ScrollView>

						<View
							style={[
								styles.modulationBarContainer,
								{ paddingBottom: Math.max(VERTICAL_PADDING, bottom) },
							]}
						>
							{modulationStatus !== modulationStatusEnum.MODULATION_ACTIVE && (
								<Feature name={featuresEnum.OPTIMIZE}>
									<View style={styles.messageContainer}>
										<ParagraphSB style={styles.message}>
											{t(
												`screens.selectedSlot.messages.${
													modulationStatus?.toLowerCase() || modulationError?.toLowerCase()
												}`
											)}
										</ParagraphSB>
									</View>
								</Feature>
							)}
							<View style={styles.modulationBarWrapper}>
								<ModulationBar
									width={BAR_WIDTH}
									slotSize={slotSize}
									values={modulationOfTheSelectedDay}
									conditions={conditionsOfTheSelectedDay}
									conditionsOfTheSelectedSlot={conditionsOfTheSelectedSlot}
									selectedSlot={slot}
									continued={false}
									modulation={modulationOfTheSelectedSlot}
									rounded={false}
									fixedSize={modulationStatus !== modulationStatusEnum.MODULATION_ACTIVE}
									height={
										modulationStatus !== modulationStatusEnum.MODULATION_ACTIVE ? 15 : undefined
									}
								/>
							</View>

							<Slider
								min={0}
								markerSize={32}
								max={24 - slotSize}
								onValuesChange={onValuesChange}
								values={[slot?.min || 0]}
								sliderLength={BAR_WIDTH}
							/>

							<BaseButton
								onPress={onNavNext}
								disabled={!!modulationError}
								style={styles.btn}
								color={COLORS.LAKE}
							>
								{t("screens.selectedSlot.button")}
							</BaseButton>
						</View>
					</>
				)}
			</SafeArea>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.WHITE[100],
		flex: 1,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 8,
		paddingTop: 16,
		paddingHorizontal: HORIZONTAL_PADDING,
	},
	content: {
		paddingHorizontal: HORIZONTAL_PADDING,
	},
	modulationBarContainer: {
		paddingHorizontal: HORIZONTAL_PADDING,
		backgroundColor: COLORS.WHITE[100],
		shadowColor: COLORS.LAKE[100],
		shadowOffset: {
			width: 0,
			height: -3,
		},
		shadowOpacity: 0.17,
		shadowRadius: 3.05,
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
		elevation: 4,
	},
	modulationBarWrapper: {
		marginTop: 8,
	},
	metricsProductList: {
		marginTop: 8,
	},
	weekTabWrapper: {
		paddingTop: 8,
	},
	modulationWrapper: {
		marginTop: 8,
	},
	messageContainer: {
		backgroundColor: COLORS.NIGHT[5],
		padding: 8,
		marginTop: 8,
		borderRadius: 4,
	},
	message: {
		color: COLORS.NIGHT[50],
	},

	btn: {
		marginTop: 16,
	},
});

export default ModulationSlotScreen;
