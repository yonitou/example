import COLORS from "@Constants/palette";
import { fontFamilyEnum } from "@Types/font.types";

import { TextProps, StyleSheet, Text } from "react-native";

const ParagraphLight = ({ style, children, numberOfLines }: TextProps): JSX.Element => {
	return (
		<Text style={[styles.defaultStyle, style]} numberOfLines={numberOfLines}>
			{children}
		</Text>
	);
};

const styles = StyleSheet.create({
	defaultStyle: {
		fontFamily: fontFamilyEnum.NunitoRegular,
		fontSize: 14,
		color: COLORS.NIGHT[100],
	},
});

export default ParagraphLight;
