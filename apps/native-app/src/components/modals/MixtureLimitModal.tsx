import { StyleSheet, View } from "react-native";
import COLORS from "@Constants/palette";
import { useTranslation } from "react-i18next";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import BaseButton from "@Components/BaseButton";
import ParagraphLight from "@Components/ParagraphLight";
import Modal, { ModalPropsType } from "./Modal";

const MixtureLimitModal = ({ modalVisible, hideModal }: ModalPropsType): JSX.Element => {
	const { t } = useTranslation();
	return (
		<Modal title={t("modals.mixtureLimitModal.title")} modalVisible={modalVisible} hideModal={hideModal}>
			<View style={styles.container}>
				<ParagraphLight>{t("modals.mixtureLimitModal.body")}</ParagraphLight>
				<BaseButton color={COLORS.LAKE} onPress={hideModal} style={styles.btn}>
					{t("common.button.understood")}
				</BaseButton>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: HORIZONTAL_PADDING,
	},
	btn: {
		marginTop: 16,
	},
});

export default MixtureLimitModal;
