import { useMemo } from "react";
import { StyleSheet, View, StyleProp, ColorValue, ViewStyle } from "react-native";
import { conditionEnum } from "@Types/condition.types";
import { slotType } from "@Types/task.types";
import COLORS, { computeColorFromConditions } from "@Constants/palette";
import ParagraphSB from "@Components/ParagraphSB";

const NUM_ITEMS = 24;
interface ModulationBarProps {
	width: number;
	height?: number;
	values?: number[];
	conditions: conditionEnum[];
	conditionsOfTheSelectedSlot?: conditionEnum;
	slotSize?: number;
	fixedSize?: boolean;
	title?: string;
	continued?: boolean;
	rounded?: boolean;
	hourIndication?: boolean;
	showSelector?: boolean;
	modulation?: number;
	position?: number;
	selectedSlot?: slotType;
}
const ModulationBar = ({
	width,
	height = 45,
	values,
	title,
	conditions,
	position,
	conditionsOfTheSelectedSlot,
	slotSize = 1,
	fixedSize = false,
	continued = true,
	rounded = true,
	hourIndication = true,
	showSelector = true,
	selectedSlot,
	modulation,
}: ModulationBarProps): JSX.Element => {
	const isTiny = height < 8;
	const start = selectedSlot ? selectedSlot?.min : Math.min(position, NUM_ITEMS - slotSize);
	const end = selectedSlot ? selectedSlot?.max : start + slotSize;

	const itemMargin = continued ? 0 : width * 0.002;
	const selectedBorderWidth = isTiny && continued ? 1 : width * 0.012;
	const selectedWidth = isTiny && continued ? 1 : slotSize * (width / NUM_ITEMS);

	const selectedHeight = useMemo(() => {
		if (fixedSize || !values || !values.length || values.length === 0 || modulation === undefined) return height;
		return 15 + (30 * modulation) / 30;
	}, [fixedSize, values, height, modulation]);

	const selectedColor = computeColorFromConditions(conditionsOfTheSelectedSlot || conditions?.[position]);

	const getItemHeight = (i: number): number => {
		if (fixedSize || !values || !values.length || values.length === 0) return height;
		const resp = 15 + (30 * values[i]) / 30;
		if (Number.isNaN(resp) || !Number.isFinite(resp) || resp === 0) return 15;
		return resp;
	};
	const getItemColor = (i: number): ColorValue => {
		const isSelected = i <= end - 1 && start <= i;
		if (isSelected && !isTiny) return "transparent";

		return computeColorFromConditions(conditions?.[i]);
	};

	const getSelectedBorderRadius = (): StyleProp<ViewStyle> => {
		if (!rounded || (isTiny && continued)) return null;
		if (start === 0) return { ...styles.radiusLeft };
		if (end === NUM_ITEMS) return { ...styles.radiusRight };
		return null;
	};

	const selectorBorderColor = continued && isTiny ? COLORS.NIGHT[100] : COLORS.LAKE[100];

	const selectorStyles = {
		borderWidth: selectedBorderWidth,
		borderColor: showSelector ? selectorBorderColor : "transparent",
		width: selectedWidth,
		left: (start * width) / NUM_ITEMS,
		backgroundColor: selectedColor,
		height: isTiny && continued ? selectedHeight * 2 : selectedHeight,
		top: isTiny && continued ? "-50%" : null,
	};

	return (
		<View style={{ width }}>
			{!!title && <ParagraphSB style={styles.label}>{title}</ParagraphSB>}
			<View style={[styles.slotContainer]}>
				<View
					style={{
						...styles.selected,
						...selectorStyles,
						...(getSelectedBorderRadius() as Record<string, string>),
					}}
				/>

				{[...Array(NUM_ITEMS).keys()].map((i, index) => {
					const styleFirst = index === 0 && rounded && styles.radiusLeft;
					const styleLast = index === NUM_ITEMS - 1 && rounded && styles.radiusRight;
					return (
						<View
							key={i}
							style={[
								{ ...styleFirst, ...styleLast },
								styles.slot,
								{
									height: getItemHeight(i),
									backgroundColor: getItemColor(i),
									marginHorizontal: itemMargin,
									width: width / NUM_ITEMS,
								},
							]}
						/>
					);
				})}
			</View>
			{hourIndication && (
				<View style={styles.hoursDetailsContainer}>
					<ParagraphSB>0h</ParagraphSB>
					<ParagraphSB>6h</ParagraphSB>
					<ParagraphSB>12h</ParagraphSB>
					<ParagraphSB>18h</ParagraphSB>
					<ParagraphSB>24h</ParagraphSB>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	slotContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "flex-end",
	},

	selected: {
		marginHorizontal: 0,
		position: "absolute",
		zIndex: 2,
	},
	slot: {
		flex: 1,
	},
	hoursDetailsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	radiusLeft: {
		borderTopLeftRadius: 7,
		borderBottomLeftRadius: 7,
	},
	radiusRight: {
		borderTopRightRadius: 7,
		borderBottomRightRadius: 7,
	},
	label: {
		marginBottom: 8,
	},
});

export default ModulationBar;
