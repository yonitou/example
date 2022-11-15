import { useContext, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { deviceType } from "@Types/device.types";
import { UserContext } from "@Context/UserContext";
import { SnackbarContext, snackbarTypeEnum } from "@Context/SnackbarContext";
import { deleteDevice } from "@Api/api";
import BaseIcons from "@Icons/BaseIcons";
import BaseModal from "../BaseModal";

export interface DeviceDeleteModalPropsType {
	modalVisible?: boolean;
	hideModal?: () => void;
	device: deviceType;
}

const StyledModal = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	svg {
		margin-right: 1.6rem;
	}
`;

const DeviceDeleteModal = ({ device, modalVisible, hideModal }: DeviceDeleteModalPropsType): JSX.Element => {
	const { t } = useTranslation();

	const { loadDevices } = useContext(UserContext);
	const { showSnackbar } = useContext(SnackbarContext);
	const [loading, setLoading] = useState<boolean>(false);

	const onDeleteDevice = async (): Promise<void> => {
		try {
			setLoading(true);
			await deleteDevice(device.id);
			await loadDevices();
			showSnackbar(t("common.snackbar.deleteDevice.success"), snackbarTypeEnum.SUCCESS);
		} catch (e) {
			showSnackbar(t("common.snackbar.deleteDevice.error"), snackbarTypeEnum.ERROR);
		} finally {
			setLoading(false);
			hideModal();
		}
	};

	return (
		<BaseModal
			modalVisible={modalVisible}
			hideModal={hideModal}
			title={t("modals.deviceDelete.title")}
			confirmBtnText={t("common.button.delete")}
			cancelBtnText={t("common.button.cancel")}
			onCancel={hideModal}
			closeAfterConfirm={false}
			onConfirm={onDeleteDevice}
			confirmBtnLoading={loading}
			colorCancelBtn="gaspacho"
			colorConfirmBtn="gaspacho"
			sideBySideButtons
		>
			{/* eslint-disable-next-line */}

			<StyledModal>
				<BaseIcons.FilledSensor width={40} height={40} />
				<div className="details">
					<h3>{device.name}</h3>
					<p>{device.barcode}</p>
				</div>
			</StyledModal>
		</BaseModal>
	);
};
export default DeviceDeleteModal;
