import { deleteUserAccount } from "@Api/api";
import TextInput from "@Components/TextInput";
import { UserContext } from "@Context/UserContext";
import { AuthContext } from "@Context/AuthContext";
import { SnackbarContext, snackbarTypeEnum } from "@Context/SnackbarContext";
import { useContext, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import styled from "styled-components";
import BaseModal from "../BaseModal";

export interface AccountDeleteModalPropsType {
	modalVisible?: boolean;
	hideModal?: () => void;
}

const StyledModal = styled.div`
	h3 {
		color: var(--night-50);
	}
	h4 {
		color: var(--lake-100);
	}
	h3,
	h4 {
		text-align: center;
		margin-bottom: 1.6rem;
	}
	input {
		text-transform: uppercase;
	}
`;

const AccountDeleteModal = ({ modalVisible, hideModal }: AccountDeleteModalPropsType): JSX.Element => {
	const { crops } = useContext(UserContext);
	const { signout } = useContext(AuthContext);
	const { showSnackbar } = useContext(SnackbarContext);
	const { t } = useTranslation();
	const [loading, setLoading] = useState<boolean>(false);

	const methods = useForm({ mode: "onChange" });

	const randomCropName = useMemo(
		() => t(`crops.${crops[Math.floor(Math.random() * crops.length)]?.name}`).toUpperCase(),
		[crops, t]
	);

	const deleteAccount = async (): Promise<void> => {
		try {
			setLoading(true);
			await deleteUserAccount();
			signout();
			showSnackbar(t("common.snackbar.accountDelete.success"), snackbarTypeEnum.SUCCESS);
		} catch (e) {
			showSnackbar(t("common.snackbar.accountDelete.error"), snackbarTypeEnum.ERROR);
		} finally {
			setLoading(false);
			hideModal();
		}
	};

	return (
		<BaseModal
			modalVisible={modalVisible}
			hideModal={hideModal}
			closeAfterConfirm={false}
			title={t("modals.accountDelete.title")}
			confirmBtnText={t("common.button.delete")}
			cancelBtnText={t("common.button.cancel")}
			onCancel={hideModal}
			confirmBtnLoading={loading}
			onConfirm={methods.handleSubmit(deleteAccount)}
			confirmBtnDisabled={!methods.formState.isValid}
			colorCancelBtn="gaspacho"
			colorConfirmBtn="gaspacho"
			sideBySideButtons
		>
			<StyledModal>
				<Trans i18nKey="modals.accountDelete.body" tOptions={{ interpolation: { escapeValue: false } }}>
					<h3>All your data and your subscription will be definitively deleted.</h3>
					<h4>
						<>To confirm, enter &quot;{{ randomCropName }}&quot;</>
					</h4>
				</Trans>
				{/* eslint-disable-next-line */}
				<FormProvider {...methods}>
					<TextInput
						name="cropName"
						rules={{
							required: true,
							validate: (value: string) => value.toUpperCase() === randomCropName,
						}}
						placeholder={randomCropName}
						error={methods.formState.errors.cropName}
					/>
				</FormProvider>
			</StyledModal>
		</BaseModal>
	);
};
export default AccountDeleteModal;
