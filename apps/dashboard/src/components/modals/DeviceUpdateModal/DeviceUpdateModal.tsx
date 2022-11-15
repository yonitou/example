import { useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { deviceType } from "@Types/device.types";
import { UserContext } from "@Context/UserContext";
import { SnackbarContext, snackbarTypeEnum } from "@Context/SnackbarContext";
import { updateDevice } from "@Api/api";
import InputTip from "@Components/InputTip";
import TextInput from "../../TextInput";
import BaseModal from "../BaseModal";

export interface DeviceUpdateModalPropsType {
	modalVisible?: boolean;
	hideModal?: () => void;
	device: deviceType;
}

const StyledModal = styled.div`
	.input-tip {
		margin-top: 0.8rem;
		margin-bottom: 1.6rem;
	}
`;

const DeviceUpdateModal = ({ device, modalVisible, hideModal }: DeviceUpdateModalPropsType): JSX.Element => {
	const { t } = useTranslation();
	const { loadDevices } = useContext(UserContext);
	const { showSnackbar } = useContext(SnackbarContext);
	const [loading, setLoading] = useState<boolean>(false);

	const methods = useForm({
		mode: "onChange",
		defaultValues: {
			name: device.name,
			barcode: device.barcode,
		},
	});

	const onUpdateDevice = async ({ name }: { name: string }): Promise<void> => {
		try {
			setLoading(true);
			await updateDevice(device.id, name);
			await loadDevices();
			showSnackbar(t("common.snackbar.updateDevice.success"), snackbarTypeEnum.SUCCESS);
		} catch (e) {
			showSnackbar(t("common.snackbar.updateDevice.error"), snackbarTypeEnum.ERROR);
		} finally {
			setLoading(false);
			hideModal();
		}
	};

	return (
		<BaseModal
			modalVisible={modalVisible}
			hideModal={hideModal}
			title={t("modals.deviceUpdate.title")}
			confirmBtnText={t("common.button.update")}
			cancelBtnText={t("common.button.cancel")}
			onCancel={hideModal}
			closeAfterConfirm={false}
			onConfirm={methods.handleSubmit(onUpdateDevice)}
			confirmBtnDisabled={!methods.formState.isValid}
			confirmBtnLoading={loading}
			colorCancelBtn="gaspacho"
			colorConfirmBtn="tangerine"
			sideBySideButtons
		>
			{/* eslint-disable-next-line */}
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
					</div>
					<InputTip>
						<h5>{t("common.inputs.deviceName.inputTip")}</h5>
					</InputTip>
					<div className="input-wrapper">
						<TextInput name="barcode" label={t("common.inputs.barcode.label")} disabled />
					</div>
				</StyledModal>
			</FormProvider>
		</BaseModal>
	);
};
export default DeviceUpdateModal;
