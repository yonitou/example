import COLORS from "@Constants/palette";
import { fontFamilyEnum } from "@Types/font.types";
import { StyleSheet, Text, TextProps } from "react-native";

const BoldTitle = ({ style, children }: TextProps): JSX.Element => {
	return <Text style={[styles.defaultStyle, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
	defaultStyle: {
		fontFamily: fontFamilyEnum.AvenirBlack,
		fontSize: 20,
		color: COLORS.NIGHT[100],
	},
});

export default BoldTitle;
