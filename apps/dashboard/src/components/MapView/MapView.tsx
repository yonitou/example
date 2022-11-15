import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { GoogleMap, Polygon, Marker, Polyline, useJsApiLoader } from "@react-google-maps/api";
import { fieldType } from "@Types/fields.types";
import { COLORS } from "@Constants/palette";
import marker from "@Assets/marker.svg";
import { CropsScreenContext, ModeEnum } from "@Context/CropScreenContext";
import BaseLoader from "@Components/Loader";
import Error from "@Components/Error";
import { AuthContext } from "@Context/AuthContext";
import i18next from "i18next";

type EventMap = {
	latLng: {
		lat: () => number;
		lng: () => number;
	};
};

const mapLibs = ["drawing", "places"];

const options = {
	mapTypeId: "hybrid",
	mapTypeControl: false,
	fullscreenControl: false,
	zoomControl: true,
	streetViewControl: false,
};

const defaultCoordinates = { lat: 47.377573, lon: 2.450951 };

const MapView = (): JSX.Element => {
	const {
		newCreatedFields,
		clickedCoordonates,
		setClickedCoordonates,
		fields,
		selectedFields,
		setSelectedFields,
		multiSelectionEnabled,
		currentMode,
	} = useContext(CropsScreenContext);

	const { user } = useContext(AuthContext);
	const userLocation = useMemo(
		() => (user?.location ? { lat: user?.location?.lat, lon: user?.location?.lon } : null),
		[user]
	);
	const [zoom, setZoom] = useState<number>(13);
	const [cursor, setCursor] = useState<string>("pointer");
	const [map, setMap] = useState(null);

	const drawingEnabled = currentMode === ModeEnum.NEW_FIELD || currentMode === ModeEnum.UPDATE_FIELD;

	const { isLoaded, loadError } = useJsApiLoader({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_API,
		libraries: mapLibs as ("drawing" | "geometry" | "localContext" | "places" | "visualization")[],
		language: i18next.language,
	});
	const hasSelectedFields = !!selectedFields?.length;

	useEffect(() => {
		drawingEnabled ? setCursor("unset") : setCursor("pointer");
	}, [drawingEnabled]);

	useEffect(() => {
		if (!fields?.length) {
			setZoom(userLocation ? 13 : 5);
			return;
		}

		selectedFields?.length ? setZoom(multiSelectionEnabled ? 13 : 15) : setZoom(13);
	}, [multiSelectionEnabled, selectedFields, fields, userLocation]);

	const center = useMemo(() => {
		const fieldsList = !hasSelectedFields ? fields : selectedFields;
		if (fieldsList?.filter((f) => f?.features?.coordinates)?.length === 0)
			return userLocation || defaultCoordinates;

		return fieldsList
			?.filter((f) => f?.features?.coordinates)
			?.reduce(
				(prev, cur, _idx, arr) => {
					return {
						lat: prev.lat + cur.lat / arr.length,
						lon: prev.lon + cur.lon / arr.length,
					};
				},
				{ lat: 0, lon: 0 }
			);
	}, [fields, selectedFields, hasSelectedFields, userLocation]);

	const containerStyle = {
		height: "100%",
	};

	const color = (field: fieldType): string => {
		return selectedFields?.find((fd: fieldType) => fd.id === field.id) ? COLORS.TANGERINE[100] : COLORS.LAKE[100];
	};

	const isSelected = (current: fieldType): fieldType => selectedFields?.find((field) => field.id === current.id);
	const handleClick = (clickedField: fieldType): void => {
		if (isSelected(clickedField)) {
			setSelectedFields((prev) => prev?.filter((selectedField) => selectedField.id !== clickedField.id));
		} else {
			setSelectedFields((prev) => (multiSelectionEnabled ? [...prev, clickedField] : [clickedField]));
		}
	};

	const onLoad = useCallback((loadedMap: google.maps.Map) => {
		setMap(loadedMap);
	}, []);

	const onMoveMarker = (lng: number, lat: number, index: number): void => {
		setClickedCoordonates((prev) => prev && prev.map((coord, indx) => (indx === index ? [lng, lat] : coord)));
	};

	const onDrawNewField = (lng: number, lat: number): void => {
		setClickedCoordonates((prev) => (prev ? [...prev, [lng, lat]] : [[lng, lat]]));
	};

	const handleDrawNewField = (event: EventMap): void => {
		const {
			latLng: { lat, lng },
		} = event;
		onDrawNewField(lng(), lat());
	};
	const onDragMarker = (event: EventMap, index: number): void => {
		const {
			latLng: { lat, lng },
		} = event;

		onMoveMarker(lng(), lat(), index);
	};
	const onDragMarkerEnd = (event: EventMap, index: number): void => {
		const {
			latLng: { lat, lng },
		} = event;
		onMoveMarker(lng(), lat(), index);
	};

	const onZoomChanged = (): void => {
		const newZoom = map?.getZoom();
		if (newZoom === map?.getZoom() || !map) return;
		setZoom(newZoom);
	};

	if (loadError) {
		return <Error type={500} />;
	}

	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={
				drawingEnabled
					? undefined
					: {
							lat: center?.lat,
							lng: center?.lon,
					  }
			}
			zoom={zoom || 13}
			onClick={drawingEnabled && handleDrawNewField}
			options={{ ...options, draggableCursor: cursor }}
			onLoad={onLoad}
			onZoomChanged={onZoomChanged}
		>
			{fields
				?.filter((f) => !f.isEdited && f?.features?.coordinates)
				?.map((f) => {
					const coord = f.features.coordinates[0];
					return (
						<Polygon
							path={coord?.map((c) => ({ lng: c[0], lat: c[1] }))}
							key={f.id}
							options={{
								fillColor: color(f),
								fillOpacity: 0.5,
								strokeColor: color(f),
								strokeOpacity: 1,
								strokeWeight: 3,
							}}
							onClick={() => handleClick(f)}
						/>
					);
				})}
			{newCreatedFields?.map((field, indx) => {
				const coord = field.coordinates;
				const key = `key-${indx}`;
				return (
					<Polygon
						path={coord?.map((c) => ({ lng: c[0], lat: c[1] }))}
						key={key}
						options={{
							fillColor: COLORS.TANGERINE[100],
							fillOpacity: 0.5,
							strokeColor: COLORS.TANGERINE[100],
							strokeOpacity: 1,
							strokeWeight: 3,
						}}
					/>
				);
			})}
			{!!clickedCoordonates?.length && (
				<Polyline
					path={[
						...clickedCoordonates.map((c) => ({ lng: c[0], lat: c[1] })),
						{ lng: clickedCoordonates?.[0][0], lat: clickedCoordonates?.[0][1] },
					]}
					options={{
						strokeColor: COLORS.TANGERINE[100],
						strokeOpacity: 1,
						strokeWeight: 3,
					}}
				/>
			)}
			{clickedCoordonates &&
				clickedCoordonates?.map((c, index) => {
					const key = `marker-${index}`;
					return (
						<Marker
							key={key}
							position={{ lat: c[1], lng: c[0] }}
							draggable
							icon={marker}
							onDrag={(event: EventMap) => onDragMarker(event, index)}
							onDragEnd={(event: EventMap) => onDragMarkerEnd(event, index)}
						/>
					);
				})}
		</GoogleMap>
	) : (
		<BaseLoader />
	);
};
export default MapView;
