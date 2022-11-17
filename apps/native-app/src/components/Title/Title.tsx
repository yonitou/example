import COLORS from "@Constants/palette";
import { fontFamilyEnum } from "@Types/font.types";
import { StyleSheet, Animated, TextProps, TextStyle, StyleProp } from "react-native";

interface TitleProps extends Omit<TextProps, "style"> {
	style?: Animated.WithAnimatedValue<StyleProp<TextStyle>>;
}

const Title = ({ style, children, numberOfLines }: TitleProps): JSX.Element => {
	return (
		<Animated.Text style={[styles.defaultStyle, style]} numberOfLines={numberOfLines}>
			{children}
		</Animated.Text>
	);
};

const styles = StyleSheet.create({
	defaultStyle: {
		fontFamily: fontFamilyEnum.NunitoBold,
		fontSize: 16,
		color: COLORS.NIGHT[100],
	},
});

export default Title;
