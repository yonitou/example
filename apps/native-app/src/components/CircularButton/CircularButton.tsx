import { StyleProp, StyleSheet, TextStyle, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import COLORS from "@Constants/palette";
import ParagraphSB from "@Components/ParagraphSB";
import Title from "@Components/Title";

interface CircularButtonProps {
	onPress?: () => void;
	children?: JSX.Element;
	title?: string;
	large?: boolean;
	backgroundColor?: string;
	textStyle?: StyleProp<TextStyle>;
	disabled?: boolean;
}

const CircularButton = ({
	children,
	disabled,
	onPress,
	title,
	large = true,
	backgroundColor = COLORS.WHITE[100],
	textStyle,
}: CircularButtonProps): JSX.Element => {
	const size = large ? 80 : 60;
	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={onPress}
				style={[styles.btn, { backgroundColor, width: size, height: size }]}
				disabled={disabled}
			>
				{children}
			</TouchableOpacity>
			{title && !large && <ParagraphSB style={[styles.label, textStyle]}>{title}</ParagraphSB>}
			{title && large && <Title style={[styles.label, textStyle]}>{title}</Title>}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
	},
	label: {
		marginTop: 4,
	},
	btn: {
		shadowColor: COLORS.NIGHT[50],
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.19,
		shadowRadius: 5.62,
		elevation: 6,
		borderRadius: 40,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default CircularButton;
