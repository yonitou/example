import { SvgProps } from "react-native-svg";
import { StyleSheet, StyleProp, TextStyle, ActivityIndicator } from "react-native";
import COLORS from "@Constants/palette";
import Title from "@Components/Title";
import { TouchableOpacity } from "react-native-gesture-handler";
import ParagraphSB from "@Components/ParagraphSB";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";

interface BaseButtonProps {
	onPress?: () => void;
	color: Record<number, string>;
	style?: StyleProp<TextStyle>;
	disabled?: boolean;
	outlined?: boolean;
	loading?: boolean;
	Icon?: React.FC<SvgProps>;
	fillIcon?: boolean;
	strokeIcon?: boolean;
	borderRadius?: number;
	children: string | JSX.Element;
	tiny?: boolean;
	centered?: boolean;
}

const BaseButton = ({
	children,
	centered = true,
	color,
	Icon,
	loading,
	borderRadius = 8,
	style,
	outlined,
	disabled,
	onPress,
	fillIcon,
	tiny,
	strokeIcon,
}: BaseButtonProps): JSX.Element => {
	const getBackgroundColor = (): string => {
		if (outlined) return COLORS.WHITE[100];
		if (disabled) return color[25];
		if (loading) return color[50];
		return color[100];
	};

	const getBtnStyle = (): StyleProp<TextStyle> => {
		if (outlined) {
			return {
				borderWidth: tiny ? 1 : 2,
				borderColor: disabled ? COLORS.NIGHT[25] : color[50],
				backgroundColor: getBackgroundColor(),
			};
		}
		return { backgroundColor: getBackgroundColor() };
	};

	const getFontColor = (): string => {
		if (outlined) {
			return disabled ? COLORS.NIGHT[50] : color[100];
		}
		return COLORS.WHITE[100];
	};

	const justifyContent = centered ? "center" : "flex-start";

	return (
		<TouchableOpacity
			containerStyle={[styles.container, style]}
			onPress={onPress}
			style={[{ ...styles.btn, justifyContent }, getBtnStyle(), { borderRadius }]}
			disabled={disabled || loading}
		>
			{Icon && (
				<Icon
					style={styles.icon}
					width={tiny ? 16 : 24}
					height={tiny ? 16 : 24}
					fill={fillIcon && getFontColor()}
					stroke={strokeIcon && getFontColor()}
				/>
			)}
			{typeof children === "string" ? (
				<>
					{!tiny && <Title style={{ ...styles.text, color: getFontColor() }}>{children}</Title>}
					{tiny && <ParagraphSB style={{ ...styles.text, color: getFontColor() }}>{children}</ParagraphSB>}
				</>
			) : (
				children
			)}
			{loading && <ActivityIndicator color={getFontColor()} style={styles.loader} />}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: 56,
	},
	btn: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		width: "100%",
		paddingHorizontal: HORIZONTAL_PADDING,
	},
	text: {
		textAlign: "center",
	},
	icon: {
		marginRight: 8,
	},
	loader: {
		marginLeft: 8,
	},
});

export default BaseButton;
