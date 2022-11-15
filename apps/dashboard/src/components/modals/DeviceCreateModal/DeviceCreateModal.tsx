import { useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { UserContext } from "@Context/UserContext";
import { SnackbarContext, snackbarTypeEnum } from "@Context/SnackbarContext";
import { createDevice } from "@Api/api";
import InputTip from "@Components/InputTip";
import TextInput from "../../TextInput";
import BaseModal from "../BaseModal";

export interface DeviceCreateModalPropsType {
	modalVisible?: boolean;
	hideModal?: () => void;
}

const StyledModal = styled.div`
	.input-wrapper:first-child {
		margin-bottom: 1.6rem;
	}
	.input-tip {
		margin-top: 0.8rem;
	}
`;

const DeviceCreateModal = ({ modalVisible, hideModal }: DeviceCreateModalPropsType): JSX.Element => {
	const { t } = useTranslation();
	const { loadDevices } = useContext(UserContext);
	const { showSnackbar } = useContext(SnackbarContext);
	const [loading, setLoading] = useState<boolean>(false);

	const methods = useForm({ mode: "onChange" });

	const onCreateDevice = async ({ name, barcode }: { name: string; barcode: string }): Promise<void> => {
		try {
			setLoading(true);
			await createDevice({ name, barcode });
			await loadDevices();
			showSnackbar(t("common.snackbar.createDevice.success"), snackbarTypeEnum.SUCCESS);
			hideModal();
		} catch (e) {
			methods.setError("barcode", { type: "custom", message: t("common.inputs.barcode.errors.invalid") });
		} finally {
			setLoading(false);
		}
	};

	return (
		<BaseModal
			modalVisible={modalVisible}
			hideModal={hideModal}
			title={t("modals.deviceCreate.title")}
			confirmBtnText={t("modals.deviceCreate.confirmBtn")}
			cancelBtnText={t("common.button.cancel")}
			onCancel={hideModal}
			closeAfterConfirm={false}
			onConfirm={methods.handleSubmit(onCreateDevice)}
			confirmBtnDisabled={!methods.formState.isValid}
			confirmBtnLoading={loading}
			colorCancelBtn="gaspacho"
			colorConfirmBtn="tangerine"
			sideBySideButtons
		>
			<FormProvider {...methods}>
				<StyledModal>
					<div className="input-wrapper">
						<TextInput
							name="name"
							label={t("common.inputs.deviceName.label")}
							rules={{
								required: {
									value: true,
									message: t("common.inputs.deviceName.errors.required"),
								},
							}}
							placeholder={t("common.inputs.deviceName.placeholder")}
							error={methods.formState.errors.name}
						/>
						<InputTip>
							<h5>{t("common.inputs.deviceName.inputTip")}</h5>
						</InputTip>
					</div>

					<div className="input-wrapper">
						<TextInput
							name="barcode"
							label={t("common.inputs.barcode.label")}
							error={methods.formState.errors.barcode}
							rules={{
								required: {
									value: true,
									message: t("common.inputs.barcode.errors.required"),
								},
							}}
						/>
						<InputTip>
							<h5>{t("common.inputs.barcode.inputTip")}</h5>
						</InputTip>
					</div>
				</StyledModal>
			</FormProvider>
		</BaseModal>
	);
};
export default DeviceCreateModal;
