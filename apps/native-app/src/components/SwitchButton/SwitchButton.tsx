import Title from "@Components/Title";
import COLORS from "@Constants/palette";
import { StyleSheet, View, Switch, StyleProp, ViewStyle, TextStyle } from "react-native";

interface SwitchButtonProps {
	value: boolean;
	onValueChange: (b: boolean) => void;
	title?: string;
	style?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
	trackColor?: string;
	icon?: JSX.Element;
}

const SwitchButton = ({
	value,
	onValueChange,
	style,
	title,
	trackColor = COLORS.LAKE[100],
	textStyle,
	icon,
}: SwitchButtonProps): JSX.Element => {
	const marginLeft = icon ? 8 : 0;
	return (
		<View style={[styles.container, style]}>
			<View style={styles.titleWrapper}>
				{icon}
				{title && <Title style={[{ marginLeft }, textStyle]}>{title}</Title>}
			</View>

			<Switch
				style={styles.switch}
				value={value}
				trackColor={{ true: trackColor }}
				thumbColor={COLORS.WHITE[100]}
				onValueChange={onValueChange}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	titleWrapper: {
		flexDirection: "row",
		alignItems: "center",
	},
	switch: {
		transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
	},
});

export default SwitchButton;
