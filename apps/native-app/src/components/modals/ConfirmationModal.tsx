import { StyleSheet, View } from "react-native";
import ParagraphSB from "@Components/ParagraphSB";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import BaseButton from "@Components/BaseButton";
import Modal, { ModalPropsType } from "./Modal";

export interface ConfirmationModalPropsType extends ModalPropsType {
	body?: string;
	handleConfirm: () => void;
	btnColorPalette: Record<number, string>;
	confirmLabel: string;
	dismissLabel: string;
}

const ConfirmationModal = ({
	modalVisible,
	title,
	btnColorPalette,
	handleConfirm,
	confirmLabel,
	dismissLabel,
	hideModal,
	body,
}: ConfirmationModalPropsType): JSX.Element => {
	const handleSave = (): void => {
		hideModal();
		handleConfirm && handleConfirm();
	};
	return (
		<Modal title={title} modalVisible={modalVisible} hideModal={hideModal}>
			<View style={styles.container}>
				{body && <ParagraphSB style={styles.body}>{body}</ParagraphSB>}
				<View style={styles.ctas}>
					<BaseButton onPress={hideModal} color={btnColorPalette} outlined style={styles.btn}>
						{dismissLabel}
					</BaseButton>
					<BaseButton onPress={handleSave} color={btnColorPalette} style={styles.btn}>
						{confirmLabel}
					</BaseButton>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: HORIZONTAL_PADDING,
	},
	body: {
		marginBottom: 16,
	},
	ctas: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	btn: {
		width: "48%",
	},
});

export default ConfirmationModal;
