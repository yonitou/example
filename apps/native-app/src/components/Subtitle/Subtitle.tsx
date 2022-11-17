import COLORS from "@Constants/palette";
import { fontFamilyEnum } from "@Types/font.types";
import { StyleSheet, Text, TextProps } from "react-native";

const Subtitle = ({ style, children }: TextProps): JSX.Element => {
	return <Text style={[styles.defaultStyle, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
	defaultStyle: {
		fontFamily: fontFamilyEnum.NunitoRegular,
		fontSize: 16,
		color: COLORS.NIGHT[100],
	},
});

export default Subtitle;
