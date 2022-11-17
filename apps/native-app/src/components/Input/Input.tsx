import ParagraphLight from "@Components/ParagraphLight";
import Title from "@Components/Title";
import COLORS from "@Constants/palette";
import HygoIcons from "@Icons/HygoIcons";
import { fontFamilyEnum } from "@Types/font.types";
import { Ref, useEffect, useState } from "react";
import { Control, RegisterOptions, useController } from "react-hook-form";
import { StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface InputProps extends Omit<TextInputProps, "onChange"> {
	onChange?: (v: string) => void;
	label?: string;
	icon?: JSX.Element;
	clearable?: boolean;
	handleFocusOrBlur?: (v: boolean) => void;
	inputRef?: Ref<TextInput>;
	textStyle?: StyleProp<TextStyle>;
	containerStyle?: StyleProp<ViewStyle>;
	control: Control;
	name: string;
	rules?: Exclude<RegisterOptions, "valueAsNumber" | "valueAsDate" | "setValueAs">;
	error?: { message?: string };
	unit?: string;
}

const Input = ({
	autoCapitalize = "none",
	autoComplete,
	autoCorrect = false,
	name,
	control,
	defaultValue,
	editable = true,
	keyboardType,
	label,
	style,
	value,
	onChange,
	placeholder,
	error,
	secureTextEntry,
	multiline,
	handleFocusOrBlur,
	textContentType,
	rules,
	inputRef,
	autoFocus,
	icon,
	unit,
	textStyle,
	clearable,
	containerStyle,
	returnKeyType,
}: InputProps): JSX.Element => {
	const [focused, setFocused] = useState<boolean>(false);
	const { field } = useController({
		control,
		defaultValue: defaultValue ?? "",
		rules,
		name,
	});

	const onChangeText = (v: string): void => {
		field.onChange(v);
		onChange && onChange(v);
	};

	const onFocus = (): void => {
		setFocused(true);
		handleFocusOrBlur && handleFocusOrBlur(true);
	};

	const onBlur = (): void => {
		setFocused(false);
		handleFocusOrBlur && handleFocusOrBlur(false);
	};

	useEffect(() => {
		if (value) field.onChange(value);
	}, [value, field]);

	const inputValueStyle = !editable ? { color: COLORS.NIGHT[25] } : { color: COLORS.NIGHT[100] };
	const disabledInputContainerStyle = !editable
		? { borderColor: COLORS.NIGHT[10] }
		: { borderColor: focused ? COLORS.LAKE[100] : COLORS.NIGHT[25] };
	const labelStyle = !editable ? { color: COLORS.NIGHT[25] } : { color: COLORS.NIGHT[100] };
	const marginLeftInput = icon ? 8 : 0;
	const clearInput = (): void => onChangeText("");
	const hasError = !!error?.message;

	return (
		<View style={containerStyle}>
			{label && <Title style={hasError ? styles.errorText : labelStyle}>{label}</Title>}
			<View style={[styles.inputContainer, disabledInputContainerStyle, style, hasError && styles.errorBorder]}>
				{icon}
				<TextInput
					autoCapitalize={autoCapitalize}
					autoComplete={autoComplete}
					autoCorrect={autoCorrect}
					autoFocus={autoFocus}
					style={[
						styles.input,
						inputValueStyle,
						{ marginLeft: marginLeftInput },
						textStyle,
						hasError && styles.errorText,
					]}
					selectionColor={hasError ? COLORS.GASPACHO[100] : COLORS.NIGHT[100]}
					editable={editable}
					placeholderTextColor={COLORS.NIGHT[25]}
					onBlur={onBlur}
					onFocus={onFocus}
					keyboardType={keyboardType}
					onChangeText={onChangeText}
					multiline={multiline}
					placeholder={placeholder}
					ref={inputRef}
					secureTextEntry={secureTextEntry}
					textContentType={textContentType}
					value={field.value}
					returnKeyType={returnKeyType}
				/>
				{unit && <Title>{unit}</Title>}
				{clearable && !!field.value && (
					<TouchableOpacity onPress={clearInput}>
						<HygoIcons.Close
							fill={hasError ? COLORS.GASPACHO[50] : COLORS.NIGHT[50]}
							width={24}
							height={24}
						/>
					</TouchableOpacity>
				)}
			</View>
			{error?.message && <ParagraphLight style={styles.errorText}>{error?.message}</ParagraphLight>}
		</View>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		backgroundColor: COLORS.WHITE[100],
		borderRadius: 4,
		borderWidth: 1,
		flexDirection: "row",
		borderStyle: "solid",
		height: 50,
		alignItems: "center",
		paddingHorizontal: 8,
	},
	input: {
		height: "100%",
		flex: 1,
		fontFamily: fontFamilyEnum.NunitoBold,
		fontSize: 16,
	},
	errorText: {
		color: COLORS.GASPACHO[100],
	},
	errorBorder: {
		borderColor: COLORS.GASPACHO[100],
	},
});

export default Input;
