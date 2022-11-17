import COLORS from "@Constants/palette";
import { View, StyleSheet } from "react-native";

const Bubbles = (): JSX.Element => {
	return (
		<View style={[styles.wrapper, StyleSheet.absoluteFill]}>
			<View style={[styles.bubble, styles.big]}>
				<View style={[styles.bubble, styles.small, styles.leftPosition]} />
				<View style={[styles.bubble, styles.small, styles.rightPosition]} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
	},
	bubble: {
		backgroundColor: COLORS.WHITE[100],
		borderRadius: 100,
	},
	big: {
		width: 131,
		height: 131,
	},
	small: {
		position: "absolute",
		width: 22,
		height: 22,
	},
	leftPosition: {
		left: -9,
		top: 5,
	},
	rightPosition: {
		right: -9,
		top: 0,
	},
});

export default Bubbles;
