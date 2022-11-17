import { StyleSheet, View, TouchableOpacity, StyleProp, ViewStyle, ImageBackground, Dimensions } from "react-native";
import { RouteProp, ParamListBase } from "@react-navigation/native";
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import ConditionalWrapper from "@Components/ConditionalWrapper";
import COLORS from "@Constants/palette";
import backgroundImage from "@Assets/home/background.png";
import Title from "@Components/Title";

interface TopTabBarProps extends MaterialTopTabBarProps {
	tabBarPositionStyle: StyleProp<ViewStyle>;
	imageBackground?: boolean;
}

const TopTabBar = ({
	state,
	navigation,
	descriptors,
	tabBarPositionStyle,
	imageBackground = false,
}: TopTabBarProps): JSX.Element => {
	const onPress = (route: RouteProp<ParamListBase>, isFocused: boolean): void => {
		const event = navigation.emit({
			type: "tabPress",
			target: route.key,
			canPreventDefault: true,
		});
		if (!isFocused && !event.defaultPrevented) {
			navigation.navigate({ name: route.name, merge: true } as unknown as string);
		}
	};
	const onLongPress = (route: RouteProp<ParamListBase>): void => {
		navigation.emit({
			type: "tabLongPress",
			target: route.key,
		});
	};

	const computeBackgroundColor = (index: number, isFocused: boolean): string => {
		if (index === 0 && isFocused) return COLORS.LAKE[100];
		if (index === 1 && isFocused) return COLORS.TANGERINE[100];
		return COLORS.WHITE[100];
	};

	return (
		<ConditionalWrapper
			condition={imageBackground}
			wrapper={(children) => (
				<ImageBackground
					source={backgroundImage}
					style={styles.backgroundImage}
					imageStyle={{ height: Dimensions.get("window").height }}
				>
					{children}
				</ImageBackground>
			)}
		>
			<View style={tabBarPositionStyle}>
				<View style={styles.container}>
					{state.routes.map((route, index) => {
						const isFocused = state.index === index;
						const {
							options: { tabBarLabel, title },
						} = descriptors[route.key];
						const label = tabBarLabel ?? title ?? "";
						return (
							<TouchableOpacity
								key={route.name}
								onPress={() => onPress(route, isFocused)}
								onLongPress={() => onLongPress(route)}
								style={{ ...styles.button, backgroundColor: computeBackgroundColor(index, isFocused) }}
							>
								<Title style={{ color: isFocused ? COLORS.WHITE[100] : COLORS.NIGHT[50] }}>
									{label as string}
								</Title>
							</TouchableOpacity>
						);
					})}
				</View>
			</View>
		</ConditionalWrapper>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		padding: 4,
		backgroundColor: COLORS.WHITE[100],
		marginHorizontal: 16,
		borderRadius: 32,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
	},
	backgroundImage: {
		width: "auto",
		height: "auto",
	},
	button: {
		borderRadius: 32,
		paddingVertical: 16,
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
	},
});
export default TopTabBar;
