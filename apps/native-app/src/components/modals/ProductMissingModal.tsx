import { useContext } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import { useTranslation } from "react-i18next";
import { AuthContext } from "@Context/AuthContext";
import { sendMail } from "@Api/hygoApi";
import COLORS from "@Constants/palette";
import { SnackbarContext, SnackTypeEnum } from "@Context/SnackBarContext";
import Input from "@Components/Input";
import BaseButton from "@Components/BaseButton";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import Modal from "./Modal";

export interface ProductMissingModalPropsType {
	modalVisible?: boolean;
	hideModal?: () => void;
}

const ProductMissingModal = ({ hideModal, modalVisible }: ProductMissingModalPropsType): JSX.Element => {
	const { t } = useTranslation();
	const { control, watch, formState } = useForm({ mode: "all" });
	const value = watch("name");

	const { showSnackbar } = useContext(SnackbarContext);
	const { user } = useContext(AuthContext);

	const handleConfirm = async (): Promise<void> => {
		try {
			const subject = t("modals.productMissing.email.subject", { product: value });
			const htmlBody = t("modals.productMissing.email.body", {
				version: Constants.manifest.extra.version,
				build: Constants.manifest.extra.build,
				userName: user?.firstName,
				lastName: user?.lastName,
			});
			await sendMail({ htmlBody, subject });
			showSnackbar(t("common.snackbar.productMissing.success"), SnackTypeEnum.OK);
		} catch (e) {
			showSnackbar(t("common.snackbar.productMissing.error"), SnackTypeEnum.ERROR);
		} finally {
			hideModal();
		}
	};

	return (
		<Modal title={t("modals.productMissing.title")} modalVisible={modalVisible} hideModal={hideModal}>
			<View style={styles.container}>
				<Input
					control={control}
					name="name"
					autoFocus
					autoCapitalize="characters"
					placeholder={t("modals.productMissing.placeholder")}
					containerStyle={styles.inputContainer}
					error={formState.errors.name}
					rules={{
						required: {
							value: true,
							message: t("common.inputs.product.errors.required"),
						},
					}}
				/>
				<BaseButton color={COLORS.LAKE} onPress={handleConfirm} disabled={!formState.isValid}>
					{t("common.button.confirm")}
				</BaseButton>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		marginBottom: 16,
	},
	container: {
		paddingHorizontal: HORIZONTAL_PADDING,
	},
});

export default ProductMissingModal;
