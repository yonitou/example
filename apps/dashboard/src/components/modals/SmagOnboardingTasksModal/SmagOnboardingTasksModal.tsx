import { useContext } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { OADContext, smagStepEnum } from "@Context/OADContext";
import BaseModal from "../BaseModal";

export interface SmagOnboardingTasksModalPropsType {
	modalVisible?: boolean;
	hideModal?: () => void;
	onConfirm: () => void;
}

const StyledModal = styled.div`
	h3 {
		color: var(--night-50);
		text-align: center;
	}
`;

const SmagOnboardingTasksModal = ({
	modalVisible,
	hideModal,
	onConfirm,
}: SmagOnboardingTasksModalPropsType): JSX.Element => {
	const { t } = useTranslation();
	const { setSmagStepCookie } = useContext(OADContext);

	const onDismiss = (): void => {
		setSmagStepCookie(smagStepEnum.DONE);
		hideModal();
	};

	return (
		<BaseModal
			modalVisible={modalVisible}
			hideModal={onDismiss}
			title={t("modals.smagOnboardingTasks.title")}
			confirmBtnText={t("common.button.understood")}
			onConfirm={onConfirm}
			colorConfirmBtn="tangerine"
		>
			<StyledModal>
				<h3>{t("modals.smagOnboardingTasks.subline")}</h3>
			</StyledModal>
		</BaseModal>
	);
};
export default SmagOnboardingTasksModal;
