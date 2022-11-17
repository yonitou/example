import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import COLORS from "@Constants/palette";
import ParagraphSB from "@Components/ParagraphSB";
import HygoIcons from "@Icons/HygoIcons";
import BaseButton from "@Components/BaseButton";
import { fontFamilyEnum } from "@Types/font.types";
import { countDecimals } from "@Utils/math";
import Input from "../Input";

interface QuantitySelectorProps {
	unit: string;
	value: number;
	onValueChange: (n: number) => void;
	step: number;
	color?: string;
	onFocus?: () => void;
	onBlur?: () => void;
}

const QuantitySelector = ({
	unit,
	value,
	onValueChange,
	color = COLORS.NIGHT[100],
	step,
	onFocus,
	onBlur,
}: QuantitySelectorProps): JSX.Element => {
	const { control, watch, setValue } = useForm();
	const quantity = watch("quantity") ?? value;

	const onClick = (substraction: boolean): void => {
		const computation = substraction ? parseFloat(quantity || "0") - step : parseFloat(quantity || "0") + step;
		const result = computation.toFixed(countDecimals(step));
		setValue("quantity", result);
	};

	const handleFocus = (): void => onFocus && onFocus();
	const handleBlur = (): void => onBlur && onBlur();

	useEffect(() => {
		if (quantity) onValueChange(parseFloat(quantity.toString().replace(",", ".")));
	}, [quantity, onValueChange]);

	return (
		<View style={styles.container}>
			<View style={styles.quantityWrapper}>
				<BaseButton onPress={() => onClick(true)} color={COLORS.LAKE} style={styles.btns} borderRadius={4}>
					<HygoIcons.Minus width={24} height={24} fill={COLORS.WHITE[100]} />
				</BaseButton>
				<Input
					name="quantity"
					control={control}
					style={styles.input}
					defaultValue={value?.toFixed(countDecimals(step)) || ""}
					keyboardType="numeric"
					handleFocusOrBlur={(val) => (val ? handleFocus() : handleBlur())}
					textStyle={[styles.text, { color }]}
				/>

				<BaseButton onPress={() => onClick(false)} color={COLORS.LAKE} style={styles.btns} borderRadius={4}>
					<HygoIcons.Add width={24} height={24} fill={COLORS.WHITE[100]} />
				</BaseButton>
			</View>

			<ParagraphSB style={styles.unit}>({unit})</ParagraphSB>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
	},
	btns: {
		width: 50,
		height: 50,
	},
	input: {
		width: 150,
		marginHorizontal: 20,
	},
	unit: {
		marginTop: 4,
	},
	quantityWrapper: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
	},
	text: {
		fontFamily: fontFamilyEnum.AvenirBlack,
		fontSize: 24,
		color: COLORS.NIGHT[100],
		textAlign: "center",
	},
});

export default QuantitySelector;
