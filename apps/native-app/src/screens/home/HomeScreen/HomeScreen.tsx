import { FlatList } from "react-native-gesture-handler";
import { View, ImageBackground, StyleSheet, Dimensions, Image } from "react-native";
import { TourGuideZone, TourGuideZoneByPosition } from "rn-tourguide";
import sensorEnabledImage from "@Assets/home/sensor-enabled.png";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import HygoIcons from "@Icons/HygoIcons";
import Spinner from "@Components/Spinner";
import { Feature } from "flagged";
import MetricsCard from "@Components/MetricsCard";
import FarmSelector from "@Components/FarmSelector";
import COLORS, { GRADIENTS } from "@Constants/palette";
import SafeArea from "@Components/SafeArea";
import Header from "@Components/Header";
import backgroundImage from "@Assets/home/background.png";
import BoldTitle from "@Components/BoldTitle";
import ParagraphSB from "@Components/ParagraphSB";
import CircularButton from "@Components/CircularButton";
import { getDefaultHeaderHeight } from "@react-navigation/elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HORIZONTAL_PADDING, VERTICAL_PADDING } from "@Constants/styleValues";
import { featuresEnum } from "@Types/feature.types";
import ConditionalWrapper from "@Components/ConditionalWrapper";
import { meteoErrorEnum } from "@Types/meteo.types";
import { HomeScreenProps } from "./screen.types";
import HeadersButton from "./components/HeadersButton";
import MainFlowButton from "./components/MainFlowButtons";
import NoNetworkMeteo from "./components/NoNetworkMeteo";
import Bubbles from "./components/Bubbles";
import MixtureCard from "./components/MixtureCard";
import SkeletonMixtureCard from "./components/SkeletonMixtureCard";

const HomeScreen = ({
	weeklyMeteo,
	goToMixtureScreen,
	goToModulation,
	handleMenuClick,
	hasConditions,
	onRequestDetailsMeteo,
	onGoRealTime,
	openAddSensorModal,
	handleNotificationsClick,
	meteoError,
	fetchMixtures,
	isOnboarding,
	hasAssociatedDevices,
	mixtures,
	goToRadar,
	loading,
	hasTasks,
}: HomeScreenProps): JSX.Element => {
	const { t } = useTranslation();
	const isDataLoading = !weeklyMeteo || weeklyMeteo?.length === 0;

	const { top, bottom } = useSafeAreaInsets();

	const headerHeight = getDefaultHeaderHeight(
		{
			width: Dimensions.get("window").width,
			height: Dimensions.get("window").height,
		},
		false,
		top
	);

	const headerElementsHeight = headerHeight - top;

	const offsetBottom = Math.max(VERTICAL_PADDING, bottom);

	const bottomPositionFab = hasTasks ? 16 : offsetBottom;
	const spaceBetweenBottomAndFabs = hasTasks ? 76 : 60 + offsetBottom;

	return (
		<ImageBackground source={backgroundImage} resizeMode="cover" style={styles.bgHome}>
			<Header
				backgroundColor="transparent"
				headerTitleContainerStyle={styles.farmSelector}
				customLeft={
					<HeadersButton
						size={headerElementsHeight}
						onPress={isOnboarding ? null : handleMenuClick}
						icon={<HygoIcons.User fill={COLORS.NIGHT[100]} width={24} height={24} />}
						tourZone={2}
						tourText={t("screens.onboarding.steps.profile")}
					/>
				}
				customRight={
					<HeadersButton
						size={headerElementsHeight}
						tourZone={4}
						tourText={t("screens.onboarding.steps.notifications")}
						onPress={isOnboarding ? null : handleNotificationsClick}
						icon={<HygoIcons.Ring width={24} height={24} />}
					/>
				}
				customTitle={<FarmSelector height={headerElementsHeight} />}
			/>

			<SafeArea withBottomPadding={false} withHorizontalPadding={false}>
				<TourGuideZone zone={5} text={t("screens.onboarding.steps.weather")}>
					{isDataLoading && !meteoError && <Spinner style={styles.spinner} />}
					{meteoError === meteoErrorEnum.NETWORK_ERROR && <NoNetworkMeteo />}
					{!isDataLoading && (
						<FlatList
							ListFooterComponent={() => <View style={styles.flatListEnd} />}
							ListHeaderComponent={() => <View style={styles.flatListStart} />}
							data={weeklyMeteo}
							keyExtractor={(item) => item.timestamps.from}
							scrollEnabled={!isOnboarding}
							horizontal
							showsHorizontalScrollIndicator={false}
							ItemSeparatorComponent={() => <View style={styles.flatListSeparator} />}
							renderItem={({ item, index }) => {
								return (
									<MetricsCard
										meteo={item}
										onClickDetails={(meteo) =>
											isOnboarding ? null : onRequestDetailsMeteo(meteo.timestamps.from, index)
										}
									/>
								);
							}}
						/>
					)}
				</TourGuideZone>

				<LinearGradient style={styles.bodyContainer} colors={GRADIENTS.BACKGROUND_1}>
					<Feature name={featuresEnum.REALTIME}>
						<View style={{ ...styles.realtimeFabButton, bottom: bottomPositionFab }}>
							<TourGuideZone
								zone={9}
								shape="circle"
								text={t("screens.onboarding.steps.realtime")}
								tooltipBottomOffset={spaceBetweenBottomAndFabs}
							>
								<CircularButton
									onPress={hasAssociatedDevices ? onGoRealTime : openAddSensorModal}
									large={false}
									disabled={isOnboarding}
								>
									{hasAssociatedDevices ? (
										<Image source={sensorEnabledImage} style={styles.sensorImage} />
									) : (
										<HygoIcons.AddSensor width={40} height={40} fill={COLORS.LAKE[50]} />
									)}
								</CircularButton>
							</TourGuideZone>
						</View>
					</Feature>
					<View style={{ ...styles.radarFabButton, bottom: bottomPositionFab }}>
						<TourGuideZone
							zone={10}
							shape="circle"
							text={t("screens.onboarding.steps.radar")}
							tooltipBottomOffset={spaceBetweenBottomAndFabs}
						>
							<CircularButton large={false} onPress={goToRadar} disabled={isOnboarding}>
								<HygoIcons.Radar width={40} height={40} fill={COLORS.LAKE[100]} />
							</CircularButton>
						</TourGuideZone>
					</View>
					<Bubbles />
					{(hasTasks || hasConditions) && (
						<View style={styles.actionButtonContainer}>
							<Feature name={featuresEnum.CONDITIONS}>
								<MainFlowButton
									disabled={isOnboarding}
									xStart={0}
									xEnd={1}
									onPress={goToMixtureScreen}
									InnerIcon={HygoIcons.ProductAdd}
									title={t("screens.home.conditionsButton")}
									colors={GRADIENTS.LAKE_GRAD}
									tourZone={6}
									tourText={t("screens.onboarding.steps.conditions")}
								/>
							</Feature>
							{hasTasks && hasConditions && <View style={styles.actionButtonSeparator} />}
							<Feature name={featuresEnum.TASKS}>
								<MainFlowButton
									xStart={1}
									xEnd={0}
									disabled={isOnboarding}
									onPress={goToModulation}
									colors={GRADIENTS.TANGERINE_GRAD}
									InnerIcon={HygoIcons.PulveAdd}
									title={t("screens.home.modulationButton")}
									tourZone={7}
									tourText={t("screens.onboarding.steps.modulation")}
								/>
							</Feature>
						</View>
					)}
					<Feature name={featuresEnum.CONDITIONS}>
						{loading ? (
							<SkeletonMixtureCard />
						) : (
							<>
								{mixtures?.length === 0 && (
									<View style={styles.emptyMixturesWrapper}>
										<HygoIcons.ProductAdd width={40} height={40} fill={COLORS.LAKE[100]} />
										<BoldTitle style={styles.emptyStateText}>
											{t("screens.home.mixtures.emptyState.title")}
										</BoldTitle>
										<ParagraphSB>{t("screens.home.mixtures.emptyState.description")}</ParagraphSB>
									</View>
								)}
								{mixtures?.length > 0 && (
									<FlatList
										data={mixtures}
										contentContainerStyle={{ paddingBottom: spaceBetweenBottomAndFabs }}
										style={{ marginHorizontal: -Math.abs(HORIZONTAL_PADDING) }}
										ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
										keyExtractor={(item) => item.id.toString()}
										showsVerticalScrollIndicator={false}
										renderItem={({ item, index }) => {
											const isFirst = index === 0;
											return (
												<ConditionalWrapper
													condition={isFirst}
													wrapper={(children) => (
														<TourGuideZone
															zone={12}
															tooltipBottomOffset={-272}
															text={t("screens.onboarding.steps.mixture.intro")}
														>
															{children}
														</TourGuideZone>
													)}
												>
													<MixtureCard
														isOnboardingItem={isFirst}
														mixture={item}
														fetchMixtures={fetchMixtures}
														disabled={isOnboarding}
													/>
												</ConditionalWrapper>
											);
										}}
									/>
								)}
							</>
						)}
					</Feature>
				</LinearGradient>
			</SafeArea>
			<TourGuideZoneByPosition
				zone={1}
				isTourGuide
				top={Dimensions.get("window").height - Math.max(HORIZONTAL_PADDING * 2, bottom) - VERTICAL_PADDING}
				text={t("screens.onboarding.steps.intro")}
			/>
			<TourGuideZoneByPosition
				zone={11}
				isTourGuide
				top={Dimensions.get("window").height - Math.max(HORIZONTAL_PADDING * 2, bottom) - VERTICAL_PADDING}
				text={t("screens.onboarding.steps.synthesis")}
			/>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	farmSelector: {
		flex: 8,
	},
	emptyMixturesWrapper: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
		paddingHorizontal: HORIZONTAL_PADDING,
	},
	flatListStart: {
		marginLeft: HORIZONTAL_PADDING,
	},
	realtimeFabButton: {
		position: "absolute",
		bottom: 16,
		right: 92,
		zIndex: 2,
	},
	listSeparator: {
		height: 16,
	},
	radarFabButton: {
		position: "absolute",
		right: 16,
		zIndex: 2,
	},
	emptyStateText: {
		marginVertical: 8,
		textAlign: "center",
	},
	sensorImage: {
		width: 40,
		height: 40,
	},
	flatListEnd: {
		marginRight: HORIZONTAL_PADDING,
	},
	spinner: {
		flex: 0,
	},
	flatListSeparator: {
		width: 8,
	},
	bodyContainer: {
		marginTop: 8,
		paddingHorizontal: HORIZONTAL_PADDING,
		flex: 1,
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
	},
	actionButtonContainer: {
		flexDirection: "row",
		paddingTop: 8,
		marginBottom: 16,
		justifyContent: "space-between",
		alignItems: "center",
	},
	actionButtonSeparator: {
		width: 8,
	},
	bgHome: {
		flex: 1,
	},
});

export default HomeScreen;
