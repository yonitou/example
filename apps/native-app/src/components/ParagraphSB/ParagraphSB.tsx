import COLORS from "@Constants/palette";
import { fontFamilyEnum } from "@Types/font.types";
import { StyleSheet, Text, TextProps } from "react-native";

const ParagraphSB = ({ style, children, onPress }: TextProps): JSX.Element => {
	return (
		<Text style={[styles.defaultStyle, style]} onPress={onPress}>
			{children}
		</Text>
	);
};

const styles = StyleSheet.create({
	defaultStyle: {
		fontFamily: fontFamilyEnum.NunitoSemiBold,
		fontSize: 14,
		color: COLORS.NIGHT[100],
	},
});

export default ParagraphSB;
