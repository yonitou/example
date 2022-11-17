import { StyleSheet, StatusBar, View, StyleProp, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HORIZONTAL_PADDING, VERTICAL_PADDING } from "@Constants/styleValues";

interface SafeAreaProps {
	children: JSX.Element | JSX.Element[];
	withBottomPadding?: boolean;
	withHorizontalPadding?: boolean;
	style?: StyleProp<ViewStyle>;
}

const SafeArea = ({
	children,
	style,
	withBottomPadding = true,
	withHorizontalPadding = true,
}: SafeAreaProps): JSX.Element => {
	const { bottom } = useSafeAreaInsets();

	const paddingBottom = withBottomPadding ? Math.max(VERTICAL_PADDING, bottom) : 0;
	const paddingHorizontal = withHorizontalPadding ? HORIZONTAL_PADDING : 0;

	return (
		<View
			style={[
				styles.safeArea,
				style,
				{
					paddingBottom,
					paddingHorizontal,
				},
			]}
		>
			<StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
			{children}
		</View>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "transparent",
	},
});

export default SafeArea;
