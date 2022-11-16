import { useContext, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { SnackbarContext, snackbarTypeEnum } from "@Context/SnackbarContext";
import { UserContext } from "@Context/UserContext";
import { deleteDoneTask } from "@Api/api";
import BaseModal from "../BaseModal";

export interface TaskDeleteModalPropsType {
	modalVisible?: boolean;
	hideModal?: () => void;
	onDelete: () => void;
	taskId: number;
}

const StyledModal = styled.div`
	h3 {
		color: var(--night-100);
		text-align: center;
	}
`;

const TaskDeleteModal = ({ modalVisible, hideModal, taskId, onDelete }: TaskDeleteModalPropsType): JSX.Element => {
	const { t } = useTranslation();
	const { defaultFarm } = useContext(UserContext);
	const { showSnackbar } = useContext(SnackbarContext);
	const [loading, setLoading] = useState<boolean>(false);

	const onDeleteDevice = async (): Promise<void> => {
		try {
			setLoading(true);
			await deleteDoneTask({ id: taskId, farmId: defaultFarm.id });
			onDelete();
			showSnackbar(t("common.snackbar.deleteTask.success"), snackbarTypeEnum.SUCCESS);
		} catch (e) {
			showSnackbar(t("common.snackbar.deleteTask.error"), snackbarTypeEnum.ERROR);
		} finally {
			setLoading(false);
			hideModal();
		}
	};

	return (
		<BaseModal
			modalVisible={modalVisible}
			hideModal={hideModal}
			title={t("modals.taskDelete.title")}
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
			<StyledModal>
				<h3>{t("modals.taskDelete.body")}</h3>
			</StyledModal>
		</BaseModal>
	);
};
export default TaskDeleteModal;
