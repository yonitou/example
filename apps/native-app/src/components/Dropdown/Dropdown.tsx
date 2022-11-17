import Title from "@Components/Title";

import { useEffect, useRef, useState } from "react";
import { StyleSheet, Modal, View, TouchableOpacity, StatusBar } from "react-native";
import COLORS from "@Constants/palette";
import { FlatList } from "react-native-gesture-handler";
import HygoIcons from "@Icons/HygoIcons";
import { SvgProps } from "react-native-svg";
import { textReducer } from "@Utils/hygoUtils";

type ItemType = {
	label: string;
	value: string;
};

interface DropdownProps {
	value: string;
	data: Array<ItemType>;
	placeholder: string;
	overrideIconColor?: string;
	height?: number;
	Icon?: React.FC<SvgProps>;
	onSelect: (item: ItemType) => void;
	disabled?: boolean;
	theme: "dark" | "light";
	hasError?: boolean;
	sort?: boolean;
}

const Dropdown = ({
	value,
	data,
	onSelect,
	disabled,
	height = 55,
	overrideIconColor,
	theme,
	sort,
	Icon,
	placeholder,
	hasError,
}: DropdownProps): JSX.Element => {
	const ref = useRef<View>();
	const [visible, setVisible] = useState(false);
	const [selected, setSelected] = useState<ItemType>();
	const [dropdownMeasures, setDropdownMeasures] = useState<{ top: number; left: number; width: number }>();
	const isDarkTheme = theme === "dark";

	const backgroundColor = isDarkTheme ? COLORS.NIGHT[100] : COLORS.WHITE[100];
	const chevronOrientation = visible ? "-90deg" : "90deg";
	const sortedItems = sort ? data?.sort((a, b) => a.label.localeCompare(b.label)) : data;
	const getFontColor = (): string => {
		if (hasError) return COLORS.GASPACHO[100];
		if (isDarkTheme) return COLORS.WHITE[100];
		if (disabled) return COLORS.NIGHT[25];
		return COLORS.NIGHT[100];
	};

	const getBorderColor = (): string => {
		if (hasError) return COLORS.GASPACHO[100];
		if (isDarkTheme) return COLORS.NIGHT[100];
		if (disabled) return COLORS.NIGHT[10];
		return COLORS.NIGHT[25];
	};

	const onLayout = (): void => {
		ref.current.measure((_fx, _fy, w, h, px, py) => {
			setDropdownMeasures({ top: py + h - StatusBar.currentHeight + 4, width: w, left: px });
		});
	};

	const onItemPress = (item: ItemType): void => {
		onSelect(item);
		setSelected(item);
		setVisible(false);
	};

	useEffect(() => {
		setSelected(data?.find((item) => item.value === value));
	}, [value, data]);

	return (
		<View ref={ref} onLayout={onLayout} style={{ height }}>
			<TouchableOpacity
				style={[styles.button, { borderColor: getBorderColor(), backgroundColor }]}
				onPress={() => setVisible(!visible)}
				activeOpacity={1}
				disabled={disabled}
			>
				<Modal visible={visible} transparent animationType="none">
					<TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)} activeOpacity={1} />
					<View
						style={[
							styles.dropdown,
							{
								top: dropdownMeasures?.top,
								width: dropdownMeasures?.width,
								backgroundColor,
								borderColor: getBorderColor(),
								left: dropdownMeasures?.left,
							},
						]}
					>
						<FlatList
							data={sortedItems}
							ItemSeparatorComponent={() => !isDarkTheme && <View style={styles.itemSeparator} />}
							renderItem={({ item }) => {
								const itemDisabled = item.value === value;
								return (
									<TouchableOpacity
										onPress={() => onItemPress(item)}
										style={styles.item}
										disabled={itemDisabled}
									>
										{Icon && (
											<Icon
												style={styles.icon}
												width={24}
												height={24}
												fill={
													itemDisabled ? COLORS.DISABLED : overrideIconColor || getFontColor()
												}
											/>
										)}
										<Title style={{ color: itemDisabled ? COLORS.DISABLED : getFontColor() }}>
											{textReducer(item.label, (dropdownMeasures?.width || 200) / 12)}
										</Title>
									</TouchableOpacity>
								);
							}}
							keyExtractor={(item) => item.value.toString()}
						/>
					</View>
				</Modal>
				<View style={styles.selectedItemWrapper}>
					{Icon && (
						<Icon style={styles.icon} width={24} height={24} fill={overrideIconColor || getFontColor()} />
					)}
					<Title style={{ color: getFontColor() }}>
						{textReducer(selected?.label || placeholder, (dropdownMeasures?.width || 200) / 13.5)}
					</Title>
				</View>

				{!disabled && (
					<HygoIcons.ChevronRight
						style={{ transform: [{ rotate: chevronOrientation }] }}
						fill={getFontColor()}
						width={24}
						height={24}
					/>
				)}
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		borderRadius: 4,
		flexDirection: "row",
		height: "100%",
		width: "100%",
		borderWidth: 1,
		padding: 8,
		justifyContent: "space-between",
		alignItems: "center",
	},
	selectedItemWrapper: {
		flexDirection: "row",
		alignItems: "center",
	},
	icon: {
		marginRight: 8,
	},
	itemSeparator: {
		width: "100%",
		backgroundColor: COLORS.NIGHT[5],
		height: 2,
	},
	dropdown: {
		position: "absolute",
		maxHeight: 200,
		borderRadius: 4,
		borderWidth: 1,
	},
	item: {
		flexDirection: "row",
		alignItems: "center",
		padding: 8,
	},
	overlay: {
		flex: 1,
	},
});

export default Dropdown;
