import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { activeProductType, productUnitEnum } from "@Types/activeProduct.types";
import COLORS from "@Constants/palette";
import ParagraphLight from "@Components/ParagraphLight";
import BaseButton from "@Components/BaseButton";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import QuantitySelector from "@Components/QuantitySelector";
import Modal, { ModalPropsType } from "./Modal";

export interface DoseInputModalPropsType extends ModalPropsType {
	defaultValue: number;
	setInput: (n: number) => void;
	item: activeProductType;
	dosesSum: number;
	debit: number;
}

const DoseInputModal = ({
	modalVisible,
	defaultValue,
	setInput,
	item,
	hideModal,
	debit,
	dosesSum,
}: DoseInputModalPropsType): JSX.Element => {
	const { t } = useTranslation();
	const [value, setValue] = useState<number>(defaultValue);
	const [error, setError] = useState<boolean>(false);

	useEffect(() => {
		setError(item.unit === productUnitEnum.LITER_PER_HA && value + dosesSum > debit);
	}, [value, dosesSum, debit, item]);

	const handleSave = (): void => {
		setInput(value);
		hideModal();
	};

	const doseRange =
		item.maxDose > item.minDose
			? `${item.minDose} ${item.unit} - ${item.maxDose} ${item.unit}`
			: `${item.minDose} ${item.unit}`;

	const homologatedDoseValue = `${t("modals.doseInput.legalDose")} : ${doseRange}`;

	return (
		<Modal title={item.name.toUpperCase()} modalVisible={modalVisible} hideModal={hideModal}>
			<View style={styles.container}>
				<View style={styles.quantitySelectorWrapper}>
					<QuantitySelector
						step={item?.increment || 0.1}
						unit={item.unit}
						value={value}
						onValueChange={setValue}
						color={value > item.maxDose ? COLORS.GASPACHO[100] : undefined}
					/>
				</View>
				<ParagraphLight style={styles.helperText}>{homologatedDoseValue}</ParagraphLight>
				{error && (
					<ParagraphLight style={styles.error}>
						{t("modals.doseInput.error", { value: debit })}
					</ParagraphLight>
				)}
				<BaseButton color={COLORS.LAKE} onPress={handleSave} disabled={!value || error} style={styles.btn}>
					{t("common.button.confirm")}
				</BaseButton>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: HORIZONTAL_PADDING,
	},
	quantitySelectorWrapper: {
		marginBottom: 4,
	},
	error: {
		color: COLORS.GASPACHO[100],
	},
	btn: {
		marginTop: 16,
	},
	helperText: {
		color: COLORS.NIGHT[50],
		marginTop: 4,
		textAlign: "center",
		marginBottom: 16,
	},
});

export default DoseInputModal;
