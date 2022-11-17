import { useCallback, useEffect } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Dimensions, Keyboard, KeyboardAvoidingView, Platform, TextInput, ViewProps } from "react-native";
import { useKeyboard } from "@react-native-community/hooks";

interface Props extends ViewProps {
	headerOffset?: number;
	children: JSX.Element | JSX.Element[];
}

const KeyboardShift = (props: Props): JSX.Element => {
	const { children, headerOffset, style, ...others } = props;
	const shift = useSharedValue(0);

	const keyboard = useKeyboard();

	// On mount, add keyboard show and hide listeners
	// On unmount, remove them
	const handleKeyboardDidShow = useCallback(() => {
		"worklet";

		const { height: windowHeight } = Dimensions.get("window");
		const { keyboardHeight } = keyboard;
		const currentlyFocusedInputRef = TextInput.State.currentlyFocusedInput();
		currentlyFocusedInputRef.measure((_x, _y, _width, height, _pageX, pageY) => {
			"worket";

			const gap = windowHeight - keyboardHeight - (pageY + height);
			if (gap >= 0) return;

			shift.value = withTiming(gap, { duration: 1000 });
		});
	}, [shift, keyboard]);

	const handleKeyboardDidHide = useCallback(() => {
		"worklet";

		shift.value = withTiming(0, { duration: 1000 });
	}, [shift]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: shift.value }],
		};
	});

	useEffect(() => {
		const showListener = Keyboard.addListener("keyboardDidShow", handleKeyboardDidShow);
		const hideListener = Keyboard.addListener("keyboardDidHide", handleKeyboardDidHide);
		return () => {
			if (showListener) {
				showListener.remove();
			}
			if (hideListener) {
				hideListener.remove();
			}
		};
	}, [handleKeyboardDidShow, handleKeyboardDidHide]);

	// Android: we need an animated view since the keyboard style can vary widely
	// And React Native's KeyboardAvoidingView isn't always reliable
	if (Platform.OS === "android") {
		return (
			<Animated.View style={[animatedStyle, style]} {...others}>
				{children}
			</Animated.View>
		);
	}

	// iOS: React Native's KeyboardAvoidingView with header offset and
	// behavior 'padding' works fine on all ios devices (and keyboard types)

	return (
		<KeyboardAvoidingView keyboardVerticalOffset={headerOffset || 0} style={style} behavior="padding" {...others}>
			{children}
		</KeyboardAvoidingView>
	);
};

export default KeyboardShift;
