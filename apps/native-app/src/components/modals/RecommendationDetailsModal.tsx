import { StyleSheet, View } from "react-native";
import COLORS from "@Constants/palette";
import { useTranslation } from "react-i18next";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import BaseButton from "@Components/BaseButton";
import ParagraphSB from "@Components/ParagraphSB";
import ParagraphLight from "@Components/ParagraphLight";
import { recommendationType } from "@Types/tank.types";
import Modal from "./Modal";

export interface RecommendationDetailsModalPropsType {
	modalVisible?: boolean;
	hideModal?: () => void;
	withProductsExamples?: boolean;
	recommendation: keyof recommendationType;
	icon: JSX.Element;
}

const RecommendationsDetailsModal = ({
	modalVisible,
	hideModal,
	withProductsExamples,
	recommendation,
	icon,
}: RecommendationDetailsModalPropsType): JSX.Element => {
	const { t } = useTranslation();
	return (
		<Modal
			modalVisible={modalVisible}
			hideModal={hideModal}
			title={t(`recommendations.${recommendation}.modal.title`)}
			icon={icon}
		>
			<View style={styles.container}>
				<ParagraphLight>{t(`recommendations.${recommendation}.modal.description`)}</ParagraphLight>
				{withProductsExamples && (
					<ParagraphSB style={styles.productsExamples}>
						{t(`recommendations.${recommendation}.modal.productsExamples`)}
					</ParagraphSB>
				)}
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
	productsExamples: {
		marginTop: 8,
		color: COLORS.LAKE[100],
	},
	btn: {
		marginTop: 16,
	},
});

export default RecommendationsDetailsModal;
