import ConditionalWrapper from "@Components/ConditionalWrapper";
import Title from "@Components/Title";
import COLORS from "@Constants/palette";
import { conditionEnum } from "@Types/condition.types";
import { formatJSDateInDaysName, getXNextDays } from "@Utils/time";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TourGuideZone } from "rn-tourguide";
import ModulationBarTiny from "./ModulationBarTiny";

interface WeekTabProps {
	selectedDay?: string;
	onTabChange: (n: number) => void;
	conditions: conditionEnum[][];
	snapped?: boolean;
	withTourGuideZone?: boolean;
}

const WeekTab = ({ selectedDay, onTabChange, conditions, snapped, withTourGuideZone }: WeekTabProps): JSX.Element => {
	const { t } = useTranslation();
	const availableDays = conditions?.length;
	const days = getXNextDays(availableDays);
	const elevation = Platform.OS === "android" ? 1 : 4;
	const borderRadius = snapped ? 4 : 0;
	const paddingHorizontal = snapped ? 4 : 8;

	return (
		<View style={styles.tabBar}>
			{days.map((d, i) => {
				const dayName = formatJSDateInDaysName(new Date(d)).toUpperCase().slice(0, 3);
				const isLast = i === days.length - 1;
				const marginRight = isLast ? 0 : 4;
				const isFirst = i === 0;
				return (
					<ConditionalWrapper
						condition={withTourGuideZone && isFirst}
						key={dayName}
						wrapper={(children) => (
							<TourGuideZone
								zone={13}
								text={t("screens.onboarding.steps.mixture.condition")}
								keepTooltipPosition
								style={styles.touchableWrapper}
							>
								{children}
							</TourGuideZone>
						)}
					>
						<TouchableOpacity
							containerStyle={styles.touchableWrapper}
							style={[
								styles.tabHeading,
								!selectedDay || selectedDay === d ? styles.headingActive : null,
								{
									marginRight,
									borderBottomLeftRadius: borderRadius,
									borderBottomRightRadius: borderRadius,
									paddingHorizontal,
								},
								snapped ? { ...styles.withShadow, elevation } : null,
							]}
							onPress={() => onTabChange(i)}
						>
							<Title style={[selectedDay === d || !selectedDay ? null : styles.dayNameNoCurrent]}>
								{dayName}
							</Title>
							<View style={styles.tabViewComp}>
								<ModulationBarTiny sizes={conditions[i]} />
							</View>
						</TouchableOpacity>
					</ConditionalWrapper>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	touchableWrapper: {
		flex: 1,
	},
	tabBar: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	tabHeading: {
		paddingVertical: 8,
		alignItems: "center",
		borderTopLeftRadius: 4,
		borderTopRightRadius: 4,
	},
	withShadow: {
		shadowColor: COLORS.LAKE[100],
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.1,
		shadowRadius: 2.62,
	},
	headingActive: {
		backgroundColor: COLORS.WHITE[100],
	},

	dayNameNoCurrent: {
		color: COLORS.NIGHT[50],
	},
	tabViewComp: {
		marginTop: 4,
	},
});

export default WeekTab;
