import { StyleSheet, RefreshControl, ScrollView, View, Image, Dimensions } from "react-native";
import { useTranslation } from "react-i18next";
import { getDefaultHeaderHeight } from "@react-navigation/elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import HygoIcons from "@Icons/HygoIcons";
import Header from "@Components/Header";
import SafeArea from "@Components/SafeArea";
import COLORS, { GRADIENTS } from "@Constants/palette";
import Spinner from "@Components/Spinner";
import Title from "@Components/Title";
import BigTitle from "@Components/BigTitle";
import { convertMsToKmh } from "@Utils/quantityConverters";
import { smoothData } from "@Utils/math";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import sensorDisabledImg from "@Assets/realtime/sensor-disabled.png";
import MapView from "@Components/MapView";
import SensorCard from "./components/SensorCard";
import { RealTimeScreenProps } from "./screen.types";
import Chart from "./components/Chart";
import SensorSelector from "./components/SensorSelector";

const RealTimeScreen = ({
	loading,
	onRefresh,
	realTimeData,
	lastRealTimeData,
	onNavBack,
	onUpdateDevice,
	selectedDeviceId,
	fields,
}: RealTimeScreenProps): JSX.Element => {
	const { t } = useTranslation();
	const { top } = useSafeAreaInsets();

	const headerHeight = getDefaultHeaderHeight(
		{
			width: Dimensions.get("window").width,
			height: Dimensions.get("window").height,
		},
		false,
		top
	);

	const headerElementsHeight = headerHeight - top;
	const windLabelSize = lastRealTimeData?.windSpeed ? 24 : 14;

	return (
		<LinearGradient colors={GRADIENTS.BACKGROUND_2} style={styles.container}>
			<Header
				onBackPress={onNavBack}
				customTitle={
					<SensorSelector
						height={headerElementsHeight}
						onSelectItem={onUpdateDevice}
						selectedDeviceId={selectedDeviceId}
					/>
				}
			/>
			<SafeArea withHorizontalPadding={false}>
				{loading ? (
					<Spinner />
				) : (
					<>
						{lastRealTimeData && (
							<ScrollView
								showsVerticalScrollIndicator={false}
								refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
							>
								<View style={[styles.gaugeContainer, styles.withMargin]}>
									<View style={styles.meteoReportIconContainer}>
										<HygoIcons.Temperature width={60} height={60} />
										<BigTitle style={styles.textMeteo}>
											{lastRealTimeData?.temp
												? `${Math.round(lastRealTimeData.temp)}${t("common.units.degrees")}C`
												: "N/A"}
										</BigTitle>
									</View>
									<View style={styles.meteoReportIconContainer}>
										<HygoIcons.WaterFill width={60} height={60} fill={COLORS.LAKE[100]} />
										<BigTitle style={styles.textMeteo}>
											{lastRealTimeData?.humi
												? `${Math.round(lastRealTimeData.humi)}${t("common.units.percentage")}`
												: "N/A"}
										</BigTitle>
									</View>

									<View style={styles.meteoReportIconContainer}>
										<HygoIcons.Wind
											fill={
												lastRealTimeData?.windSpeed || lastRealTimeData?.windSpeed === 0
													? COLORS.LAKE[100]
													: COLORS.LAKE[50]
											}
											width={60}
											height={60}
										/>
										<BigTitle style={{ ...styles.textMeteo, fontSize: windLabelSize }}>
											{(lastRealTimeData?.windSpeed || lastRealTimeData?.windSpeed === 0) &&
												`${convertMsToKmh(lastRealTimeData?.windSpeed)?.toFixed(1)}${t(
													"common.units.kmPerHour"
												)}`}
										</BigTitle>
									</View>
								</View>

								<View style={[styles.chartContainer, styles.withMargin]}>
									<View style={styles.chartLabelWrapper}>
										<HygoIcons.Temperature width={24} height={24} />
										<Title style={styles.chartLabel}>
											{t("screens.realtime.charts.temperature")}
										</Title>
									</View>
									<Chart
										data={smoothData(
											realTimeData.map((h) => {
												return { x: new Date(h.timestamp), y: h.temp };
											})
										)}
										yUnit={t("common.units.degrees")}
									/>
								</View>
								<View style={[styles.chartContainer, styles.withMargin]}>
									<View style={styles.chartLabelWrapper}>
										<HygoIcons.WaterFill width={24} height={24} fill={COLORS.LAKE[100]} />
										<Title style={styles.chartLabel}>
											{t("screens.realtime.charts.hygrometry")}
										</Title>
									</View>
									<Chart
										data={smoothData(
											realTimeData.map((h) => {
												return { x: new Date(h.timestamp), y: h.humi };
											})
										)}
										paddingLeft={60}
										yUnit={t("common.units.percentage")}
									/>
								</View>
								<View style={styles.chartContainer}>
									<View style={styles.chartLabelWrapper}>
										<HygoIcons.Location width={24} height={24} />
										<Title style={styles.chartLabel}>{t("screens.realtime.map.title")}</Title>
									</View>
									<View style={styles.mapWrapper}>
										<MapView
											selectedFields={fields}
											timestamp={lastRealTimeData?.timestamp}
											position={lastRealTimeData?.position}
										/>
									</View>
								</View>
							</ScrollView>
						)}
						{!lastRealTimeData && (
							<View style={[styles.sensorContainer, styles.withMargin]}>
								<SensorCard
									title={t("screens.realtime.sensorCard.title")}
									description={t("screens.realtime.sensorCard.description")}
									Asset={<Image source={sensorDisabledImg} style={styles.sensorImage} />}
								/>
							</View>
						)}
					</>
				)}
			</SafeArea>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	gaugeContainer: {
		marginHorizontal: HORIZONTAL_PADDING,
		shadowColor: COLORS.LAKE[100],
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.19,
		shadowRadius: 5.62,
		elevation: 6,
		backgroundColor: COLORS.WHITE[100],
		borderRadius: 4,
		paddingVertical: 8,
		paddingHorizontal: HORIZONTAL_PADDING,
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
	},
	mapWrapper: {
		marginHorizontal: -16,
	},
	sensorImage: {
		width: 86,
		height: 86,
	},
	sensorContainer: {
		paddingHorizontal: HORIZONTAL_PADDING,
	},
	meteoReportIconContainer: {
		alignItems: "center",
	},
	textMeteo: {
		marginTop: 4,
	},
	withMargin: {
		marginBottom: 16,
	},
	chartContainer: {
		padding: 16,
		shadowColor: COLORS.LAKE[100],
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.19,
		shadowRadius: 5.62,
		elevation: 6,
		backgroundColor: COLORS.WHITE[100],
	},
	chartLabelWrapper: {
		alignItems: "center",
		flexDirection: "row",
		marginBottom: 16,
	},
	chartLabel: {
		marginLeft: 8,
	},
});

export default RealTimeScreen;
