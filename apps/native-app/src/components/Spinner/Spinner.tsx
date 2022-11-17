import { Image, StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import spinner from "@Assets/spinner.gif";

interface SpinnerProps {
	style?: StyleProp<ViewStyle>;
}
const Spinner = ({ style }: SpinnerProps): JSX.Element => {
	return (
		<View style={[styles.container, style]}>
			<Image source={spinner} style={styles.spinner} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	spinner: {
		width: 80,
		height: 80,
	},
});

export default Spinner;
