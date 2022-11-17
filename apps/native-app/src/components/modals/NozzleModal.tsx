import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { nozzleType } from "@Types/nozzle.types";
import { UserContext } from "@Context/UserContext";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import NozzleList, { NozzleListProps } from "@Components/NozzleList";
import Modal, { ModalPropsType } from "./Modal";

export interface NozzleModalPropsType extends ModalPropsType, Omit<NozzleListProps, "nozzles"> {}

const NozzleModal = ({ modalVisible, hideModal, onPressAdd, onPressNozzle }: NozzleModalPropsType): JSX.Element => {
	const { t } = useTranslation();
	const { nozzles } = useContext(UserContext);

	const handlePressAdd = (): void => {
		onPressAdd();
		hideModal();
	};
	const handlePressNozzle = (nozzle: nozzleType): void => {
		onPressNozzle(nozzle);
		hideModal();
	};
	return (
		<Modal title={t("modals.nozzle.title")} modalVisible={modalVisible} hideModal={hideModal}>
			<View style={styles.container}>
				<NozzleList nozzles={nozzles} onPressAdd={handlePressAdd} onPressNozzle={handlePressNozzle} />
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: HORIZONTAL_PADDING,
	},
});

export default NozzleModal;
