import {
	GooglePlaceDetail,
	GooglePlacesAutocomplete as NativeGooglePlacesAutoComplete,
} from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import * as Localization from "expo-localization";
import { useTranslation } from "react-i18next";

import { Control, useController } from "react-hook-form";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Title from "@Components/Title";
import COLORS from "@Constants/palette";
import { useEffect, useRef, useState } from "react";
import ParagraphLight from "@Components/ParagraphLight";
import { fontFamilyEnum } from "@Types/font.types";

interface GooglePlacesAutoCompleteProps {
	error: { message?: string };
	control: Control;
	editable: boolean;
	setValue: (name: string, value: unknown) => void;
	containerStyle: StyleProp<ViewStyle>;
}

const GooglePlacesAutoComplete = ({
	error,
	control,
	editable,
	containerStyle,
	setValue,
}: GooglePlacesAutoCompleteProps): JSX.Element => {
	const [focused, setFocused] = useState<boolean>(false);
	const { t } = useTranslation();
	const { field } = useController({
		control,
		rules: { required: { value: true, message: t("common.inputs.location.errors.required") } },
		name: "googleAutocomplete",
	});
	const firstRender = useRef(true);

	useEffect(() => {
		firstRender.current = false;
	}, []);

	const hasError = !!error?.message;
	const inputValueStyle = !editable ? { color: COLORS.NIGHT[25] } : { color: COLORS.NIGHT[100] };
	const labelStyle = !editable ? { color: COLORS.NIGHT[25] } : { color: COLORS.NIGHT[100] };
	const disabledInputContainerStyle = !editable
		? { borderColor: COLORS.NIGHT[10] }
		: { borderColor: focused ? COLORS.LAKE[100] : COLORS.NIGHT[25] };

	const onChangeText = (v: string): void => {
		if (!firstRender.current) field.onChange(v);
	};

	const onFocus = (): void => {
		setFocused(true);
	};

	const onBlur = (): void => {
		setFocused(false);
	};

	const onPress = (details: GooglePlaceDetail): void => {
		onChangeText(details.formatted_address);
		setValue("location", {
			lon: details.geometry.location.lng,
			lat: details.geometry.location.lat,
			label: details.formatted_address,
		});
	};

	return (
		<View style={containerStyle}>
			<Title style={hasError ? styles.errorText : labelStyle}>{t("common.inputs.location.label")}</Title>
			<View style={[styles.inputContainer, disabledInputContainerStyle, hasError && styles.errorBorder]}>
				<NativeGooglePlacesAutoComplete
					query={{
						key: Constants.manifest.extra.googleMapsApiKey,
						language: Localization.locale,
						components: "country:fr",
						types: "postal_code|sublocality|locality",
					}}
					placeholder={t("common.inputs.location.placeholder")}
					debounce={200}
					onPress={(_, details) => onPress(details)}
					styles={{
						row: styles.row,
						description: styles.description,
						separator: styles.separator,
					}}
					enablePoweredByContainer={false}
					isRowScrollable={false}
					fetchDetails
					minLength={3}
					textInputProps={{
						clearButtonMode: "never",
						onFocus,
						autoFocus: false,
						value: field.value,
						autoCapitalize: "words",
						onBlur,
						autoComplete: "postal-code",
						onChangeText,
						textContentType: "postalCode",
						editable,
						control,
						selectionColor: hasError ? COLORS.GASPACHO[100] : COLORS.NIGHT[100],
						placeholderTextColor: COLORS.NIGHT[25],
						keyboardType: "default",
						autoCorrect: false,
						style: [styles.input, inputValueStyle, hasError && styles.errorText],
					}}
				/>
			</View>
			{error?.message && <ParagraphLight style={styles.errorText}>{error?.message}</ParagraphLight>}
		</View>
	);
};

const styles = StyleSheet.create({
	errorText: {
		color: COLORS.GASPACHO[100],
	},
	inputContainer: {
		backgroundColor: COLORS.WHITE[100],
		borderRadius: 4,
		borderWidth: 1,
		flexDirection: "row",
		borderStyle: "solid",
		minHeight: 50,
		alignItems: "center",
		paddingHorizontal: 8,
	},
	errorBorder: {
		borderColor: COLORS.GASPACHO[100],
	},
	input: {
		height: "100%",
		flex: 1,
		minHeight: 50,
		fontFamily: fontFamilyEnum.NunitoBold,
		fontSize: 16,
	},
	row: {
		paddingVertical: 12,
		paddingHorizontal: 0,
		height: "auto",
		minHeight: "auto",
	},
	separator: {
		backgroundColor: COLORS.NIGHT[50],
		height: 0.5,
	},
	description: {
		fontFamily: fontFamilyEnum.NunitoSemiBold,
		fontSize: 14,
		color: COLORS.NIGHT[100],
	},
});

export default GooglePlacesAutoComplete;
