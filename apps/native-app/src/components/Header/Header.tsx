import { StyleSheet, StyleProp, View, TextStyle, Dimensions, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getDefaultHeaderHeight, Header as RNHeader } from "@react-navigation/elements";
import Title from "@Components/Title";
import HygoIcons from "@Icons/HygoIcons";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ParagraphSB from "@Components/ParagraphSB";

interface HeaderProps {
	title?: string;
	onBackPress?: () => void;
	headerIcon?: JSX.Element;
	onCancelPress?: () => void;
	backgroundColor?: string;
	customTitle?: JSX.Element;
	customLeft?: JSX.Element;
	customRight?: JSX.Element;
	subtitle?: string;
	textStyle?: StyleProp<TextStyle>;
	headerTitleContainerStyle?: StyleProp<ViewStyle>;
	cancelType?: "delete" | "nav";
}

const Header = ({
	title,
	headerIcon,
	cancelType = "nav",
	onBackPress,
	textStyle,
	customLeft,
	customRight,
	customTitle,
	onCancelPress,
	backgroundColor,
	subtitle,
	headerTitleContainerStyle,
}: HeaderProps): JSX.Element => {
	const marginLeftTitle = headerIcon ? 10 : 0;
	const { top } = useSafeAreaInsets();
	const headerHeight = getDefaultHeaderHeight(
		{
			width: Dimensions.get("window").width,
			height: Dimensions.get("window").height,
		},
		false,
		top
	);
	const sideButtonSize = headerHeight - top;

	return (
		<View style={styles.container}>
			<RNHeader
				title={title}
				headerTitleAlign="center"
				headerTitleContainerStyle={headerTitleContainerStyle}
				headerStyle={{ backgroundColor, ...styles.headerStyle }}
				headerLeftContainerStyle={{ paddingLeft: HORIZONTAL_PADDING }}
				headerRightContainerStyle={{ paddingRight: HORIZONTAL_PADDING }}
				headerLeft={() => {
					return (
						customLeft ??
						(onBackPress && (
							<TouchableOpacity onPress={onBackPress}>
								<HygoIcons.ArrowLeftContained width={sideButtonSize} height={sideButtonSize} />
							</TouchableOpacity>
						))
					);
				}}
				headerTitle={({ children, style }) =>
					customTitle ?? (
						<View style={styles.wrapper}>
							<View style={styles.titleWrapper}>
								{headerIcon}
								<Title style={[style, { marginLeft: marginLeftTitle }]}>{children}</Title>
							</View>
							{subtitle && <ParagraphSB>{subtitle}</ParagraphSB>}
						</View>
					)
				}
				headerRight={() => {
					return (
						customRight ??
						(onCancelPress && (
							<TouchableOpacity onPress={onCancelPress}>
								{cancelType === "nav" ? (
									<HygoIcons.CancelCircleContained width={sideButtonSize} height={sideButtonSize} />
								) : (
									<HygoIcons.Delete width={sideButtonSize} height={sideButtonSize} />
								)}
							</TouchableOpacity>
						))
					);
				}}
				headerTitleStyle={textStyle}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginBottom: 16,
		zIndex: 1,
	},
	headerStyle: {
		elevation: 0,
		shadowOpacity: 0,
	},
	titleWrapper: {
		flexDirection: "row",
		alignItems: "center",
	},
	wrapper: {
		alignItems: "center",
	},
});

export default Header;
