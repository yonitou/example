import { TouchableOpacity, Dimensions, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import HygoIcons from "@Icons/HygoIcons";

import COLORS from "@Constants/palette";

import { TourGuideZone } from "rn-tourguide";
import { useFeature } from "flagged";
import { featuresEnum } from "@Types/feature.types";
import ConditionalWrapper from "@Components/ConditionalWrapper";
import ParagraphSB from "@Components/ParagraphSB";

const BottomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps): JSX.Element => {
	const insets = useSafeAreaInsets();
	const hasTasks = useFeature(featuresEnum.TASKS);
	const { t } = useTranslation();

	return (
		<ConditionalWrapper
			condition={!!hasTasks}
			wrapper={(children) => (
				<TourGuideZone zone={8} text={t("screens.onboarding.steps.tasks")} tooltipBottomOffset={70}>
					{children}
				</TourGuideZone>
			)}
		>
			<View style={[styles.container, { height: 70 + insets.bottom, paddingBottom: insets.bottom }]}>
				{state.routes.map((route, routeIndex) => {
					const { options } = descriptors[route.key];
					const isRouteFocused = routeIndex === state.index;
					const key = `${routeIndex}`;
					const btnWidth = Dimensions.get("screen").width / state.routes.length;
					const backgroundColorHighlighter = isRouteFocused ? COLORS.LAKE[100] : "transparent";
					return (
						<TouchableOpacity
							key={key}
							onPress={() => {
								const event = navigation.emit({
									type: "tabPress",
									target: route.key,
									canPreventDefault: true,
								});

								if (!isRouteFocused && !event.defaultPrevented) {
									// The `merge: true` option makes sure that the params inside the tab screen are preserved
									navigation.navigate({ name: route.name, merge: true } as unknown as string);
								}
							}}
							onLongPress={() => {
								navigation.emit({
									type: "tabLongPress",
									target: route.key,
								});
							}}
							style={[styles.button, { width: btnWidth }]}
							accessibilityLabel={options.tabBarAccessibilityLabel}
						>
							{route.name === "HomeScreen" ? (
								<HygoIcons.Barn
									fill={isRouteFocused ? COLORS.LAKE[100] : COLORS.NIGHT[50]}
									width={24}
									height={24}
								/>
							) : (
								<HygoIcons.PulvEquipment
									fill={isRouteFocused ? COLORS.LAKE[100] : COLORS.NIGHT[50]}
									width={24}
									height={24}
								/>
							)}
							<ParagraphSB
								style={[
									styles.buttonText,
									isRouteFocused && {
										color: COLORS.LAKE[100],
									},
								]}
							>
								{t(`components.mainTabBar.${route.name.toLowerCase()}`)}
							</ParagraphSB>
							<View
								style={[
									{ backgroundColor: backgroundColorHighlighter, width: btnWidth },
									styles.highlighter,
								]}
							/>
						</TouchableOpacity>
					);
				})}
			</View>
		</ConditionalWrapper>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.WHITE[100],
		flexDirection: "row",
		borderTopWidth: 1,
		borderTopColor: COLORS.NIGHT[25],
	},
	button: {
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		color: COLORS.NIGHT[50],
	},
	highlighter: {
		height: 4,
		position: "absolute",
		top: -4,
		borderRadius: 8,
	},
});

export default BottomTabBar;
