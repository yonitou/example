import { useContext } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { OADContext } from "@Context/OADContext";
import BaseModal from "../BaseModal";

const StyledModalContent = styled.div`
	text-align: center;
	h3 {
		color: var(--night-50);
	}
`;
export interface SmagLogoutModalPropsType {
	modalVisible?: boolean;
	hideModal?: () => void;
}
const SmagLogoutModal = ({ modalVisible, hideModal }: SmagLogoutModalPropsType): JSX.Element => {
	const { t } = useTranslation();
	const { logoutFromSmag } = useContext(OADContext);

	return (
		<BaseModal
			modalVisible={modalVisible}
			hideModal={hideModal}
			title={t("modals.smagLogout.title")}
			confirmBtnText={t("modals.smagLogout.logoutBtn")}
			cancelBtnText={t("common.button.cancel")}
			onCancel={hideModal}
			onConfirm={logoutFromSmag}
			colorCancelBtn="gaspacho"
			colorConfirmBtn="gaspacho"
			sideBySideButtons
		>
			<StyledModalContent>
				<h3>{t("modals.smagLogout.subline")}</h3>
			</StyledModalContent>
		</BaseModal>
	);
};
export default SmagLogoutModal;
