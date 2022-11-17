import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import { slotType } from "@Types/task.types";
import COLORS from "@Constants/palette";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import HygoIcons from "@Icons/HygoIcons";
import BigTitle from "@Components/BigTitle";

import BaseButton from "@Components/BaseButton";
import Modal, { ModalPropsType } from "./Modal";

export interface SlotSelectorModalPropsType extends ModalPropsType {
	slot: slotType;
	setSlot: (s: slotType) => void;
	onNavNext: (s: slotType) => void;
}

const SlotSelectorModal = ({
	modalVisible,
	slot,
	setSlot,
	onNavNext,
	hideModal,
}: SlotSelectorModalPropsType): JSX.Element => {
	const { t } = useTranslation();
	const [value, setValue] = useState(slot);

	const handleValueChange = (newVal: slotType): void => {
		setValue(newVal);
		setSlot(newVal);
	};

	const handleConfirm = (): void => {
		hideModal();
		onNavNext(value);
	};

	const changeSlotSize = (slotSize: number): void => {
		const { min, max } = value;
		const nextDuration = max + slotSize - min;
		if (nextDuration < 1) return;
		if (max + slotSize <= 23 && nextDuration <= 6) handleValueChange({ ...value, max: max + slotSize });
		else if (min > 0 && max - (min - slotSize) >= 0 && nextDuration <= 6)
			handleValueChange({ ...value, min: min - slotSize });
	};

	const hours = value.max - value.min;

	return (
		<Modal title={t("modals.slotSelector.title")} modalVisible={modalVisible} hideModal={hideModal}>
			<View style={styles.container}>
				<View style={styles.quantityWrapper}>
					<BaseButton onPress={() => changeSlotSize(-1)} color={COLORS.LAKE} style={styles.btns}>
						<HygoIcons.Minus width={24} height={24} fill={COLORS.WHITE[100]} />
					</BaseButton>
					<View style={styles.boxHours}>
						<BigTitle style={styles.inactive}>{hours > 1 && `${hours - 1}H`}</BigTitle>
						<BigTitle style={styles.active}>{`${hours}H`}</BigTitle>
						<BigTitle style={styles.inactive}>{hours < 6 && `${hours + 1}H`}</BigTitle>
					</View>

					<BaseButton onPress={() => changeSlotSize(1)} color={COLORS.LAKE} style={styles.btns}>
						<HygoIcons.Add width={24} height={24} fill={COLORS.WHITE[100]} />
					</BaseButton>
				</View>

				<BaseButton color={COLORS.LAKE} onPress={handleConfirm} style={styles.btn}>
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
	btns: {
		width: 48,
		borderRadius: 4,
		height: 48,
	},
	quantityWrapper: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		paddingHorizontal: 20,
	},
	btn: {
		marginTop: 24,
	},
	boxHours: {
		flex: 1,
		marginHorizontal: 20,
		borderRadius: 4,
		flexDirection: "row",
		backgroundColor: COLORS.WHITE[100],
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 8,
		paddingHorizontal: 16,
		shadowColor: COLORS.NIGHT[50],
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.19,
		shadowRadius: 5.62,
		elevation: 6,
	},
	inactive: {
		color: COLORS.NIGHT[50],
	},
	active: {
		color: COLORS.LAKE[100],
	},
});

export default SlotSelectorModal;
