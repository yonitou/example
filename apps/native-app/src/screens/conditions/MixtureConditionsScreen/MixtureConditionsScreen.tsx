import { View, StyleSheet, Dimensions } from "react-native";
import { getDefaultHeaderHeight } from "@react-navigation/elements";
import { useTranslation } from "react-i18next";
import Header from "@Components/Header";
import SafeArea from "@Components/SafeArea";
import HygoIcons from "@Icons/HygoIcons";
import COLORS, { GRADIENTS } from "@Constants/palette";
import { HORIZONTAL_PADDING, VERTICAL_PADDING } from "@Constants/styleValues";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Slider from "@Components/Slider";
import ConditionConverter from "@Components/ConditionConverter";
import BigTitle from "@Components/BigTitle";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import WeatherDetailsCard from "@Components/WeatherDetailsCard";
import MetricsProductList from "@Components/MetricsProductList";
import Subtitle from "@Components/Subtitle";
import ModulationBar from "@Components/ModulationBar";
import { conditionEnum } from "@Types/condition.types";

import { LinearGradient } from "expo-linear-gradient";
import WeekTab from "@Screens/modulation/ModulationSlotScreen/components/WeekTab";
import { fontFamilyEnum } from "@Types/font.types";
import productFamilies from "@Constants/productFamilies";
import ProductFamilyIcons from "@Icons/ProductFamilyIcons";
import Spinner from "@Components/Spinner";
import { MixtureConditionsScreenProps } from "./screen.types";

const MixtureConditionsScreen = ({
	onNavBack,
	conditions,
	tankIndications,
	onPressHelp,
	weeklyConditions,
	loading,
	explicabilityKeys,
	onValuesChange,
	productFamily,
	selectedTime,
	metricsOfTheSelectedSlot,
	selectedDay,
	onTabChange,
	onPressUpdate,
}: MixtureConditionsScreenProps): JSX.Element => {
	const BAR_WIDTH = Dimensions.get("screen").width - HORIZONTAL_PADDING * 2;
	const { bottom, top } = useSafeAreaInsets();
	const ProductIcon = productFamilies[productFamily];

	const headerHeight = getDefaultHeaderHeight(
		{
			width: Dimensions.get("window").width,
			height: Dimensions.get("window").height,
		},
		false,
		top
	);

	const headerElementsHeight = headerHeight - top;

	const { t } = useTranslation();
	return (
		<View style={styles.container}>
			<Header
				onBackPress={onNavBack}
				title={loading ? t("screens.mixtureConditions.title.loading") : t(`products.${productFamily}`)}
				textStyle={styles.headerTextStyle}
				headerIcon={ProductIcon && <ProductIcon width={24} height={24} fill={COLORS.NIGHT[100]} />}
				backgroundColor="transparent"
				customRight={
					<TouchableOpacity
						style={[
							styles.headerCustomRight,
							{ width: headerElementsHeight, height: headerElementsHeight },
						]}
						onPress={onPressUpdate}
					>
						<ProductFamilyIcons.Product width={24} height={24} />
					</TouchableOpacity>
				}
			/>

			<SafeArea withBottomPadding={false} withHorizontalPadding={false}>
				{loading ? (
					<Spinner />
				) : (
					<>
						<LinearGradient colors={GRADIENTS.BACKGROUND_1}>
							<View style={styles.weekTabWrapper}>
								<WeekTab
									selectedDay={selectedDay}
									onTabChange={onTabChange}
									conditions={weeklyConditions}
								/>
							</View>
						</LinearGradient>
						<View style={styles.header}>
							<BigTitle>{selectedTime.toString().padStart(2, "0")}h</BigTitle>
							<ConditionConverter condition={conditions?.[selectedTime]?.globalCond} />
						</View>
						<ScrollView style={styles.content}>
							<View style={styles.weatherDetailsWrapper}>
								<WeatherDetailsCard metricsOfTheSelectedSlot={metricsOfTheSelectedSlot} />
							</View>
							<MetricsProductList
								productMetrics={tankIndications?.productMetrics}
								metrics={metricsOfTheSelectedSlot}
								style={styles.metricsProductList}
							/>
							{explicabilityKeys?.map((explicabilityKey) => {
								return (
									<View style={styles.modulationBarTiny} key={explicabilityKey}>
										<ModulationBar
											title={t(`explicability.${explicabilityKey}.label`)}
											width={BAR_WIDTH}
											position={selectedTime}
											height={5}
											hourIndication={false}
											conditions={
												conditions?.map(
													(condition) => condition[explicabilityKey]
												) as unknown as conditionEnum[]
											}
										/>
									</View>
								);
							})}
							<TouchableOpacity style={styles.whatAreParamsModalView} onPress={onPressHelp}>
								<HygoIcons.Help fill={COLORS.LAKE[100]} width={24} height={24} />
								<Subtitle style={styles.whatAreParamsModalText}>
									{t("screens.mixtureConditions.details.explicabilityButton")}
								</Subtitle>
							</TouchableOpacity>
						</ScrollView>

						<View style={[styles.sliderContainer, { paddingBottom: Math.max(VERTICAL_PADDING, bottom) }]}>
							<ModulationBar
								title={t("screens.mixtureConditions.details.combine")}
								width={BAR_WIDTH}
								conditions={conditions?.map((condition) => condition.globalCond)}
								position={selectedTime}
								height={27}
							/>

							<Slider
								min={0}
								max={24}
								markerSize={32}
								onValuesChange={onValuesChange}
								values={[selectedTime]}
								sliderLength={BAR_WIDTH}
							/>
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
	headerTextStyle: {
		fontFamily: fontFamilyEnum.AvenirBlack,
		fontSize: 24,
		color: COLORS.NIGHT[100],
	},
	content: {
		paddingHorizontal: HORIZONTAL_PADDING,
	},
	header: {
		paddingTop: 16,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 8,
		paddingHorizontal: HORIZONTAL_PADDING,
	},
	headerCustomRight: {
		borderRadius: 50,
		backgroundColor: COLORS.SMOKE[100],
		justifyContent: "center",
		alignItems: "center",
	},
	modulationBarTiny: {
		marginBottom: 8,
	},
	weekTabWrapper: {
		paddingTop: 8,
	},
	sliderContainer: {
		paddingTop: 8,
		alignItems: "center",
		marginHorizontal: -16,
		paddingHorizontal: 16,
		backgroundColor: COLORS.WHITE[100],
		shadowColor: COLORS.LAKE[100],
		shadowOffset: {
			width: 0,
			height: -3,
		},
		shadowOpacity: 0.17,
		shadowRadius: 3.05,
		elevation: 2,
	},
	whatAreParamsModalView: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 16,
	},
	whatAreParamsModalText: {
		color: COLORS.LAKE[100],
		marginLeft: 8,
	},
	weatherDetailsWrapper: {
		marginBottom: 8,
	},
	metricsProductList: {
		marginBottom: 8,
	},
});

export default MixtureConditionsScreen;
