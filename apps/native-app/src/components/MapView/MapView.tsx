import { useState, useEffect, useRef } from "react";
import { Dimensions, StyleSheet } from "react-native";
import NativeMapView, { Marker } from "react-native-maps";
import { fieldType } from "@Types/field.types";
import COLORS, { CONDITIONS_COLORS } from "@Constants/palette";
import { formatJSDateInHoursAndMinutes } from "@Utils/time";
import ParagraphSB from "@Components/ParagraphSB";
import HygoIcons from "@Icons/HygoIcons";
import { useTranslation } from "react-i18next";
import Polygon from "../Polygon";

interface MapViewProps {
	selectedFields: fieldType[];
	timestamp?: string;
	position?: { lat: number; lon: number };
}
const MapView = ({ selectedFields, timestamp, position }: MapViewProps): JSX.Element => {
	const { t } = useTranslation();
	const [region, setRegion] = useState(null);
	const [loaded, setLoaded] = useState(false);
	const [selected, setSelected] = useState<fieldType>(null);

	const polygons = useRef([]);
	const mapRef = useRef<NativeMapView>();

	useEffect(() => {
		if (selectedFields?.length > 0) {
			const firstFieldCoordinates = {
				lat: parseFloat(selectedFields[0].features.coordinates[0].map((coordinate) => coordinate[1]).join("")),
				long: parseFloat(selectedFields[0].features.coordinates[0].map((coordinate) => coordinate[0]).join("")),
			};

			setRegion({
				latitude: position ? position.lat : firstFieldCoordinates.lat,
				longitude: position ? position.lon : firstFieldCoordinates.long,
				latitudeDelta: 0.0222,
				longitudeDelta: 0.0121,
			});
		}
	}, [position, selectedFields]);

	const onRegionChangeComplete = (value: { latitude: number; longitude: number }): void => {
		if (loaded) return;
		if (value.latitude !== region.latitude || value.longitude !== region.longitude)
			mapRef.current.animateToRegion(region);
		setLoaded(true);
	};

	return (
		region && (
			<>
				<NativeMapView
					ref={mapRef}
					onRegionChangeComplete={onRegionChangeComplete}
					mapType="hybrid"
					initialRegion={region}
					style={{
						width: Dimensions.get("window").width,
						height: Dimensions.get("window").width,
					}}
					zoomEnabled
					zoomTapEnabled
				>
					{selectedFields.map((field: fieldType, i) => {
						const fillColor = CONDITIONS_COLORS.FIELD?.[field?.condition] || COLORS.SKY[50];
						const strokeColor = CONDITIONS_COLORS.SLOT?.[field?.condition] || COLORS.LAKE[100];
						return (
							<Polygon
								key={field.id}
								strokeWidth={selected === field ? 4 : 1}
								strokeColor={selected === field ? COLORS.WHITE[100] : strokeColor}
								fillColor={fillColor}
								onLayout={() =>
									polygons.current[i].setNativeProps({
										fillColor,
									})
								}
								tappable
								onPress={() => setSelected((prev) => (field === prev ? null : field))}
								coordinates={field.features.coordinates[0].map((coordinate) => ({
									latitude: coordinate[1],
									longitude: coordinate[0],
								}))}
							/>
						);
					})}
					{position && (
						<Marker coordinate={{ latitude: position.lat, longitude: position.lon }}>
							<HygoIcons.SensorPin width={40} height={50} fill={COLORS.LAKE[100]} />
						</Marker>
					)}
				</NativeMapView>
				{timestamp && (
					<ParagraphSB style={styles.timestamp}>
						{t("components.mapView.timestampTooltip", {
							time: formatJSDateInHoursAndMinutes(new Date(timestamp)),
						})}
					</ParagraphSB>
				)}
			</>
		)
	);
};

const styles = StyleSheet.create({
	timestamp: {
		color: COLORS.WHITE[100],
		top: 8,
		left: 16,
		position: "absolute",
	},
});

export default MapView;
