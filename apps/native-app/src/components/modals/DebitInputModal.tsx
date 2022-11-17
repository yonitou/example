import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import ParagraphLight from "@Components/ParagraphLight";
import { AuthContext } from "@Context/AuthContext";
import { productUnitEnum } from "@Types/activeProduct.types";
import COLORS from "@Constants/palette";
import { patchDebit } from "@Api/hygoApi";
import BaseButton from "@Components/BaseButton";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import QuantitySelector from "../QuantitySelector";
import Modal, { ModalPropsType } from "./Modal";

export interface DebitInputModalPropsType extends ModalPropsType {
	defaultValue: number;
	setInput: (a: number) => void;
	dosesSum: number;
}

const DebitInputModal = ({
	modalVisible,
	defaultValue,
	hideModal,
	setInput,
	dosesSum,
}: DebitInputModalPropsType): JSX.Element => {
	const { t } = useTranslation();
	const { fetchUser } = useContext(AuthContext);
	const [value, setValue] = useState<number>(defaultValue);
	const [error, setError] = useState<boolean>(false);

	const handleSave = async (): Promise<void> => {
		setInput(value);
		await patchDebit(value);
		await fetchUser();
		hideModal();
	};

	useEffect(() => {
		setError(dosesSum > value);
	}, [value, dosesSum]);

	return (
		<Modal title={t("modals.debitInput.title")} modalVisible={modalVisible} hideModal={hideModal}>
			<View style={styles.container}>
				<View style={styles.quantitySelectorWrapper}>
					<QuantitySelector
						step={10}
						unit={productUnitEnum.LITER_PER_HA}
						value={value}
						onValueChange={setValue}
					/>
				</View>
				{error && (
					<ParagraphLight style={styles.error}>
						{t("modals.debitInput.error", { value: dosesSum })}
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
		marginBottom: 16,
	},
	error: {
		color: COLORS.GASPACHO[100],
	},
	btn: {
		marginTop: 16,
	},
});

export default DebitInputModal;
