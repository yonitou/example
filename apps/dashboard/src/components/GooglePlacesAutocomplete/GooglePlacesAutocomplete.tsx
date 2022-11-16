import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import TextInput from "@Components/TextInput";
import { useCallback, useState } from "react";
import { RegisterOptions } from "react-hook-form";
import i18next from "i18next";

interface GooglePlacesAutocompleteProps {
	name: string;
	label?: string;
	error?: { message?: string };
	placeholder?: string;
	rules?: Exclude<RegisterOptions, "valueAsNumber" | "valueAsDate" | "setValueAs">;
	onChange: (coordinates: { lat: number; lon: number; label: string }) => void;
}

const mapLibs = ["drawing", "places"];

const GooglePlacesAutocompleteComponent = ({
	error,
	label,
	name,
	onChange,
	placeholder,
	rules,
}: GooglePlacesAutocompleteProps): JSX.Element => {
	const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete>();

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: process.env.NX_GOOGLE_MAPS_API,
		libraries: mapLibs as ("drawing" | "geometry" | "localContext" | "places" | "visualization")[],
		language: i18next.language,
	});

	const onLoad = useCallback((autocompleteComp: google.maps.places.Autocomplete) => {
		setAutocomplete(autocompleteComp);
	}, []);

	const onPlaceChanged = (): void => {
		if (!autocomplete) return;
		const place = autocomplete.getPlace();
		onChange({
			lon: place.geometry.location.lng(),
			lat: place.geometry.location.lat(),
			label: place.formatted_address,
		});
	};
	return (
		isLoaded && (
			<Autocomplete
				onLoad={onLoad}
				onPlaceChanged={onPlaceChanged}
				restrictions={{ country: "fr" }}
				types={["postal_code", "sublocality", "locality"]}
			>
				<TextInput placeholder={placeholder} name={name} label={label} rules={rules} error={error} />
			</Autocomplete>
		)
	);
};

export default GooglePlacesAutocompleteComponent;
