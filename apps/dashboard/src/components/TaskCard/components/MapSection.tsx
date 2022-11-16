import { useContext, useMemo } from "react";
import { GoogleMap, Polygon, useJsApiLoader } from "@react-google-maps/api";
import { fieldType } from "@Types/fields.types";
import { COLORS, CONDITIONS_COLORS } from "@Constants/palette";
import BaseLoader from "@Components/Loader";
import Error from "@Components/Error";
import styled from "styled-components";
import { AuthContext } from "@Context/AuthContext";
import i18next from "i18next";

interface MapSectionProps {
	fields: fieldType[];
}

const mapLibs = ["drawing", "places"];

const options = {
	mapTypeId: "hybrid",
	mapTypeControl: false,
	fullscreenControl: false,
	zoomControl: false,
	streetViewControl: false,
};

const defaultCoordinates = { lat: 47.377573, lon: 2.450951 };

const StyledMapSection = styled.section`
	height: 100%;
`;

const MapSection = ({ fields }: MapSectionProps): JSX.Element => {
	const { user } = useContext(AuthContext);
	const userLocation = useMemo(
		() => (user?.location ? { lat: user?.location?.lat, lon: user?.location?.lon } : null),
		[user]
	);

	const { isLoaded, loadError } = useJsApiLoader({
		googleMapsApiKey: process.env.NX_GOOGLE_MAPS_API,
		libraries: mapLibs as ("drawing" | "geometry" | "localContext" | "places" | "visualization")[],
		language: i18next.language,
	});

	const center = useMemo(() => {
		if (fields?.length === 0 || !fields) return userLocation || defaultCoordinates;
		return fields?.reduce(
			(prev, cur, _idx, arr) => {
				return {
					lat: prev.lat + cur.lat / arr.length || 0,
					lon: prev.lon + cur.lon / arr.length || 0,
				};
			},
			{ lat: 0, lon: 0 }
		);
	}, [fields, userLocation]);

	const containerStyle = {
		height: "100%",
		borderRadius: "4px",
	};

	if (loadError) {
		return <Error type={500} />;
	}

	return (
		<StyledMapSection>
			{isLoaded ? (
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={{
						lat: center?.lat,
						lng: center?.lon,
					}}
					zoom={15}
					options={{ ...options }}
				>
					{fields?.map((f) => {
						const coord = f.features.coordinates[0];
						const fillColor = CONDITIONS_COLORS.FIELD?.[f?.condition] || COLORS.SKY[50];
						const strokeColor = CONDITIONS_COLORS.SLOT?.[f?.condition] || COLORS.LAKE[100];
						return (
							<Polygon
								path={coord?.map((c) => ({ lng: c[0], lat: c[1] }))}
								key={f.id}
								options={{
									fillColor,
									strokeColor,
									strokeWeight: 3,
								}}
							/>
						);
					})}
				</GoogleMap>
			) : (
				<BaseLoader />
			)}
		</StyledMapSection>
	);
};
export default MapSection;
