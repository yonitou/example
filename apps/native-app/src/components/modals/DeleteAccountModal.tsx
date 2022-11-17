import { StyleSheet, View } from "react-native";
import COLORS from "@Constants/palette";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import Analytics from "@Analytics";
import * as Updates from "expo-updates";
import BaseButton from "@Components/BaseButton";
import ParagraphSB from "@Components/ParagraphSB";
import { SnackbarContext, SnackTypeEnum } from "@Context/SnackBarContext";
import { deleteUserAccount } from "@Api/hygoApi";
import ParagraphLight from "@Components/ParagraphLight";
import { useContext, useMemo, useState } from "react";
import { UserContext } from "@Context/UserContext";
import Input from "@Components/Input";
import Modal, { ModalPropsType } from "./Modal";

const DeleteAccountModal = ({ modalVisible, hideModal }: ModalPropsType): JSX.Element => {
	const { t } = useTranslation();
	const { control, formState } = useForm({ mode: "all" });
	const { logAnalyticEvent, events } = Analytics;
	const { crops } = useContext(UserContext);
	const { showSnackbar } = useContext(SnackbarContext);
	const [loading, setLoading] = useState<boolean>(false);
	const randomCropName = useMemo(
		() => t(`crops.${crops?.[Math.floor(Math.random() * crops.length)]?.name}`).toUpperCase(),
		[crops, t]
	);

	const onDeleteAccount = async (): Promise<void> => {
		setLoading(true);
		logAnalyticEvent(events.auth.deletion, {});

		try {
			await deleteUserAccount();
			await Updates.reloadAsync();
			showSnackbar(t("common.snackbar.accountDeletion.success"), SnackTypeEnum.OK);
		} catch (e) {
			showSnackbar(t("common.snackbar.accountDeletion.error"), SnackTypeEnum.ERROR);
			hideModal();
		}
	};

	return (
		<Modal
			title={t("modals.deleteAccount.title")}
			modalVisible={modalVisible}
			hideModal={loading ? null : hideModal}
		>
			<View style={styles.container}>
				<ParagraphLight style={styles.description}>{t("modals.deleteAccount.description")}</ParagraphLight>

				<ParagraphSB style={styles.inputHelper}>
					{t("modals.deleteAccount.cropSubline", {
						cropName: randomCropName,
						interpolation: { escapeValue: false },
					})}
				</ParagraphSB>
				<Input
					control={control}
					name="crop-name"
					placeholder={randomCropName}
					autoCapitalize="characters"
					editable={!loading}
					rules={{
						required: true,
						validate: (value: string) => value === randomCropName,
					}}
				/>
				<View style={styles.ctas}>
					<BaseButton
						onPress={hideModal}
						color={COLORS.GASPACHO}
						outlined
						style={styles.btn}
						disabled={loading}
					>
						{t("common.button.cancel")}
					</BaseButton>
					<BaseButton
						onPress={onDeleteAccount}
						color={COLORS.GASPACHO}
						style={styles.btn}
						disabled={!formState.isValid}
						loading={loading}
					>
						{t("common.button.delete")}
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
	description: {
		marginBottom: 16,
	},
	btn: {
		width: "48%",
	},
	inputHelper: {
		marginBottom: 16,
		color: COLORS.LAKE[100],
	},
	ctas: {
		flexDirection: "row",
		marginTop: 16,
		alignItems: "center",
		justifyContent: "space-between",
	},
});

export default DeleteAccountModal;
