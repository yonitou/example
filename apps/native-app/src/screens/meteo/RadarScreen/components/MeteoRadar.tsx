import { useState, useEffect, useRef, useContext } from "react";
import { StyleSheet, View, Image } from "react-native";
import MapView, { Overlay } from "react-native-maps";
import { useIsFocused } from "@react-navigation/native";
import { getMeteoRadar } from "@Api/hygoApi";

import Polygon from "@Components/Polygon";
import { formatJSDateInHoursAndMinutes } from "@Utils/time";
import Spinner from "@Components/Spinner";
import useAbortController from "@Hooks/useAbortController";
import COLORS from "@Constants/palette";
import Title from "@Components/Title";
import { UserContext } from "@Context/UserContext";
import { AuthContext } from "@Context/AuthContext";
import { useFeature } from "flagged";
import { featuresEnum } from "@Types/feature.types";
import { VERTICAL_PADDING } from "@Constants/styleValues";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Slider from "@Components/Slider";
import HygoIcons from "@Icons/HygoIcons";
import CircularButton from "@Components/CircularButton";

const initialCoords = {
	lon_min: -9.518991999949419,
	lon_max: 13.721623908424407,

	lat_min: 38.49171589293103,
	lat_max: 53.86656657651131,
};

const MeteoRadar = (): JSX.Element => {
	const { fields } = useContext(UserContext);
	const { user } = useContext(AuthContext);
	const hasFarmWeather = useFeature(featuresEnum.FARM_WEATHER);
	const insets = useSafeAreaInsets();

	const isFocused = useIsFocused();
	const interval = useRef<NodeJS.Timeout>();
	const mapRef = useRef<MapView>();
	const polygons = useRef([]);
	const getSignal = useAbortController();

	const [loading, setLoading] = useState(true);
	const [images, setImages] = useState([]);
	const [paused, setPaused] = useState(false);
	const [mapLoaded, setMapLoaded] = useState(false);
	const [region, setRegion] = useState(null);
	const [currentWeather, setCurrentWeather] = useState(0);

	const onRegionChangeComplete = (value: { latitude: number; longitude: number }): void => {
		if (mapLoaded) return;
		if (value.latitude !== region.latitude || value.longitude !== region.longitude)
			mapRef.current.animateToRegion(region);
		setMapLoaded(true);
	};

	const onPressPlayPause = (): void => setPaused((p) => !p);

	useEffect(() => {
		const loadMeteoRadar = async (): Promise<void> => {
			const fetchedImages = await getMeteoRadar(getSignal());
			const prefetchedImages = fetchedImages.map((image) => Image.prefetch(image.url));
			await Promise.all(prefetchedImages);
			setImages(fetchedImages);
			setLoading(false);
		};
		loadMeteoRadar();
	}, [getSignal]);

	useEffect(() => {
		if (isFocused && !paused && images.length > 0) {
			interval.current = setInterval(() => {
				setCurrentWeather((prev) => (prev >= images.length - 1 ? 0 : prev + 1));
			}, 500);
		} else if (paused || !isFocused) {
			clearInterval(interval?.current);
		}
		return () => {
			clearInterval(interval?.current);
		};
	}, [paused, images, isFocused, interval]);

	useEffect(() => {
		const computedRegion = {
			lat:
				hasFarmWeather && fields?.length > 0
					? parseFloat(fields[0].features.coordinates[0].map((coordinate) => coordinate[1]).join(""))
					: user.location.lat,
			lon:
				hasFarmWeather && fields?.length > 0
					? parseFloat(fields[0].features.coordinates[0].map((coordinate) => coordinate[0]).join(""))
					: user.location.lon,
		};
		setRegion({
			latitude: computedRegion.lat,
			longitude: computedRegion.lon,
			latitudeDelta: 0.0822,
			longitudeDelta: 0.0521,
		});
	}, [user, hasFarmWeather, fields]);

	const radarDate = formatJSDateInHoursAndMinutes(new Date(images?.[currentWeather]?.d));

	return (
		<View style={styles.container}>
			{loading && <Spinner />}
			{region && !loading && images.length > 0 && (
				<>
					<MapView
						mapType="hybrid"
						initialRegion={region}
						onRegionChangeComplete={onRegionChangeComplete}
						ref={mapRef}
						style={styles.map}
						zoomEnabled
						zoomTapEnabled
					>
						{fields?.map((field, i) => {
							return (
								<Polygon
									key={field.id}
									strokeWidth={1}
									strokeColor={COLORS.LAKE[100]}
									fillColor={COLORS.LAKE[25]}
									onLayout={() =>
										polygons.current[i].setNativeProps({
											fillColor: COLORS.LAKE[25],
										})
									}
									tappable={false}
									coordinates={field.features.coordinates[0].map((coordinate) => {
										return {
											latitude: coordinate[1],
											longitude: coordinate[0],
										};
									})}
								/>
							);
						})}

						<Overlay
							image={images[currentWeather].url}
							bounds={[
								[initialCoords.lat_min, initialCoords.lon_min],
								[initialCoords.lat_max, initialCoords.lon_max],
							]}
						/>
					</MapView>
					{radarDate && images?.length > 0 && (
						<View style={{ ...styles.footer, bottom: Math.max(VERTICAL_PADDING, insets.bottom) }}>
							<View style={styles.timeWrapper}>
								<Title style={styles.time}>{radarDate}</Title>
							</View>
							<View style={styles.sliderContainer}>
								<View style={styles.icon}>
									<CircularButton
										onPress={onPressPlayPause}
										large={false}
										backgroundColor={COLORS.LAKE[100]}
									>
										{!paused ? (
											<HygoIcons.Pause width={24} height={24} fill={COLORS.WHITE[100]} />
										) : (
											<HygoIcons.Play width={24} height={24} fill={COLORS.WHITE[100]} />
										)}
									</CircularButton>
								</View>
								<Slider
									min={0}
									markerSize={32}
									onValuesChange={(value) => setCurrentWeather(value[0])}
									max={images.length - 1}
									values={[currentWeather]}
									customMarker={() => <HygoIcons.SliderMarker width={32} height={32} />}
								/>
							</View>
						</View>
					)}
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	icon: {
		marginRight: 16,
	},
	map: {
		height: "100%",
		width: "100%",
	},
	footer: {
		position: "absolute",
		alignItems: "center",
	},
	sliderContainer: {
		height: 76,
		backgroundColor: COLORS.NIGHT[50],
		borderRadius: 8,
		padding: 8,
		flexDirection: "row",
		alignItems: "center",
	},
	timeWrapper: {
		backgroundColor: COLORS.LAKE[50],
		borderRadius: 24,
		paddingHorizontal: 24,
		paddingVertical: 8,
		marginBottom: 8,
	},
	time: {
		color: COLORS.WHITE[100],
	},
});

export default MeteoRadar;
