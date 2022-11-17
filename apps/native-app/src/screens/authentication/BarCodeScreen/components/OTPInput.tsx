import COLORS from "@Constants/palette";
import { fontFamilyEnum } from "@Types/font.types";
import Title from "@Components/Title";
import BaseButton from "@Components/BaseButton";

import { useState, useEffect, useRef } from "react";
import { View, TextInput, TouchableWithoutFeedback, Keyboard, TextStyle, StyleSheet, StyleProp } from "react-native";

interface OTPInputPackageProps {
	pinCount: number;
	codeInputFieldStyle: TextStyle;
	codeInputHighlightStyle: TextStyle;
	onCodeFilled: (code: string) => void;
	autoFocusOnLoad: boolean;
	pointerEvents: "auto" | "none" | "box-none" | "box-only";
	editable: boolean;
	selectionColor: string;
	data?: string;
}

const OTPInputView = ({
	pinCount,
	autoFocusOnLoad,
	codeInputFieldStyle,
	codeInputHighlightStyle,
	pointerEvents,
	onCodeFilled,
	data,
	editable,
	selectionColor,
}: OTPInputPackageProps): JSX.Element => {
	const keyboardDidHideListener = useRef(null);
	const fields = useRef([]);

	const [digits, setDigits] = useState([]);
	const [selectedIndex, setSelectedIndex] = useState(autoFocusOnLoad ? 0 : -1);

	const focusField = (index: number): void => {
		if (index < fields.current.length) {
			const field = fields.current[index] as TextInput;
			if (field) {
				setTimeout(() => {
					field.focus();
				}, 50);
			}
			setSelectedIndex(index);
		}
	};

	const blurAllFields = (): void => {
		fields?.current?.forEach((field: TextInput | null) => (field as TextInput)?.blur());
		setSelectedIndex(-1);
	};

	useEffect(() => {
		if (autoFocusOnLoad) {
			focusField(0);
		}
		keyboardDidHideListener.current = Keyboard.addListener("keyboardDidHide", blurAllFields);
		return () => keyboardDidHideListener.current?.remove();
	}, [autoFocusOnLoad]);

	const handleChangeText = (index: number, text: string): void => {
		let currentIndex = index;
		let newdigits = digits.slice();
		if (text.length === 0) {
			if (newdigits.length > 0) {
				newdigits = newdigits.slice(0, newdigits.length - 1);
			}
		} else {
			text.split("").forEach((value) => {
				if (currentIndex < pinCount) {
					newdigits[currentIndex] = value;
					currentIndex += 1;
				}
			});
			currentIndex -= 1;
		}
		setDigits(newdigits);

		const result = newdigits.join("");
		if (result.length >= pinCount) {
			onCodeFilled && onCodeFilled(result);
			focusField(pinCount - 1);
			blurAllFields();
		} else if (text.length > 0 && index < pinCount - 1) {
			focusField(index + 1);
		}
	};

	const handleKeyPressTextInput = (index: number, key: string): void => {
		if (key === "Backspace") {
			if (!digits[index] && index > 0) {
				handleChangeText(index - 1, "");
				focusField(index - 1);
			}
		}
	};

	const renderOneInputField = (_: TextInput, index: number): JSX.Element => {
		return (
			<View pointerEvents="none" key={`${index}view`}>
				<TextInput
					underlineColorAndroid="rgba(0,0,0,0)"
					style={
						selectedIndex === index
							? [packageInputStyles.defaultTextField, codeInputFieldStyle, codeInputHighlightStyle]
							: [packageInputStyles.defaultTextField, codeInputFieldStyle]
					}
					ref={(ref) => {
						fields.current[index] = ref;
					}}
					onChangeText={(text) => {
						handleChangeText(index, text);
					}}
					onKeyPress={({ nativeEvent: { key } }) => {
						handleKeyPressTextInput(index, key);
					}}
					value={data ? data.charAt(index) : digits[index]}
					keyboardType="default"
					key={index}
					selectionColor={selectionColor}
					secureTextEntry={false}
					editable={editable}
					autoCorrect={false}
					autoFocus={false}
					autoCapitalize="characters"
				/>
			</View>
		);
	};

	const renderTextFields = (): Array<JSX.Element> => {
		const array = new Array(pinCount).fill(0);
		return array.map(renderOneInputField);
	};

	return (
		<View pointerEvents={pointerEvents}>
			<TouchableWithoutFeedback
				onPress={() => {
					const filledPinCount = digits.filter((digit) => {
						return digit !== null && digit !== undefined;
					}).length;
					focusField(Math.min(filledPinCount, pinCount - 1));
				}}
			>
				<View style={packageInputStyles.view}>{renderTextFields()}</View>
			</TouchableWithoutFeedback>
		</View>
	);
};

const packageInputStyles = StyleSheet.create({
	defaultTextField: {
		width: 45,
		height: 45,
		textAlign: "center",
	},
	view: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});

interface OTPInputProps {
	handleInputFilled: (value: string) => void;
	focus: boolean;
	error: boolean;
	success: boolean;
	errorNotice: string;
	successNotice: string;
	handlePress?: () => void;
	buttonText?: string;
	data?: string;
	noticeStyle: StyleProp<TextStyle>;
	editable: boolean;
	selectionColor: string;
	pinCount: number;
}

const OTPInput = ({
	handleInputFilled,
	focus,
	error,
	pinCount,
	success,
	errorNotice,
	successNotice,
	handlePress = null,
	buttonText = null,
	data,
	selectionColor,
	noticeStyle,
	editable,
}: OTPInputProps): JSX.Element => {
	const inputWidth = 63 - pinCount * 3.75;
	const inputHeight = inputWidth + 12;
	const errorToStyleInputs = (highlightStyle: boolean): Record<string, unknown> => {
		if (error && !success) {
			return {
				...styles.inputStyle,
				...styles.errorInputs,
				width: inputWidth,
				height: inputHeight,
			};
		}
		if (success && !error) {
			return {
				...styles.inputStyle,
				...styles.successInputs,
				width: inputWidth,
				height: inputHeight,
			};
		}
		return highlightStyle
			? {
					...styles.inputStyle,
					...styles.activeInput,
					width: inputWidth,
					height: inputHeight,
			  }
			: { ...styles.inputStyle, width: inputWidth, height: inputHeight };
	};

	return (
		<>
			<OTPInputView
				pointerEvents={focus ? "auto" : "none"}
				pinCount={pinCount}
				selectionColor={selectionColor}
				autoFocusOnLoad={focus}
				editable={editable}
				codeInputFieldStyle={errorToStyleInputs(false)}
				codeInputHighlightStyle={errorToStyleInputs(true)}
				onCodeFilled={(code) => handleInputFilled(code)}
				data={data}
			/>
			{error && <Title style={noticeStyle}>{errorNotice}</Title>}
			{buttonText && (
				<BaseButton onPress={handlePress} style={styles.button} color={COLORS.LAKE}>
					{buttonText}
				</BaseButton>
			)}
			{success && <Title style={noticeStyle}>{successNotice}</Title>}
		</>
	);
};

const styles = StyleSheet.create({
	inputStyle: {
		backgroundColor: COLORS.NIGHT[100],
		color: COLORS.WHITE[100],
		borderWidth: 0,
		fontFamily: fontFamilyEnum.AvenirBlack,
		fontSize: 24,
		borderRadius: 8,
	},
	activeInput: {
		borderWidth: 2,
		borderColor: COLORS.LAKE[100],
	},
	errorInputs: {
		borderWidth: 2,
		borderColor: COLORS.GASPACHO[100],
	},
	successInputs: {
		borderWidth: 2,
		borderColor: COLORS.GRASS[100],
	},
	button: {
		marginTop: 16,
	},
});

export default OTPInput;
