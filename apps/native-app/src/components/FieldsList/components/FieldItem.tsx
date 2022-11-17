import ParcelSVG from "@Components/ParcelSVG";
import COLORS from "@Constants/palette";
import HygoIcons from "@Icons/HygoIcons";
import { fieldType } from "@Types/field.types";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Title from "@Components/Title";
import ParagraphSB from "@Components/ParagraphSB";
import { textReducer } from "@Utils/hygoUtils";

interface FieldItemProps {
	selection: boolean;
	onClickFieldCheckbox: (f: fieldType) => void;
	onPressField: (f: fieldType) => void;
	field: fieldType;
	isSelected: boolean;
	area: number;
	isLast: boolean;
}

const FieldItem = ({
	selection,
	onClickFieldCheckbox,
	field,
	onPressField,
	isSelected,
	area,
	isLast,
}: FieldItemProps): JSX.Element => {
	const marginBottom = isLast ? 0 : 16;
	const paddingLeft = selection ? 12 : 0;

	return (
		<TouchableOpacity
			onPress={() => (selection ? onClickFieldCheckbox(field) : onPressField && onPressField(field))}
			style={[styles.touchableField, { marginBottom, paddingLeft }]}
			activeOpacity={1}
		>
			{selection && (
				<View style={styles.checkbox}>
					{isSelected && <HygoIcons.RectChecked width={32} height={32} fill={COLORS.LAKE[100]} />}
					{!isSelected && <HygoIcons.RectUnChecked width={32} height={32} fill={COLORS.NIGHT[50]} />}
				</View>
			)}
			<View style={styles.svg}>
				{field.svg && (
					<ParcelSVG
						path={field.svg}
						height={32}
						width={32}
						fill={COLORS.LAKE[25]}
						stroke={COLORS.LAKE[100]}
					/>
				)}
			</View>
			<View style={styles.textWrapper}>
				<Title>{textReducer(`${field.name}`, 25)}</Title>
				<ParagraphSB style={styles.fieldDetails}>
					{area.toFixed(area < 1 ? 2 : 1)}ha - {field.town}
				</ParagraphSB>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	fieldDetails: {
		color: COLORS.NIGHT[50],
	},
	checkbox: {
		marginRight: 16,
	},
	svg: {
		marginRight: 8,
	},
	touchableField: {
		flexDirection: "row",
		alignItems: "center",
	},
	textWrapper: {
		flex: 1,
	},
});

export default FieldItem;
