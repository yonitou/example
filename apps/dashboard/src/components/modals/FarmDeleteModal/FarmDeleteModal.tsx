import { useContext } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { deleteFarm } from "@Api/api";
import { UserContext } from "@Context/UserContext";
import BaseModal from "../BaseModal";
import FarmSelector from "../../FarmSelector";

const StyledModalContent = styled.div`
	text-align: center;
	h3 {
		margin-bottom: 3.2rem;
	}
`;
export interface FarmDeleteModalPropsType {
	modalVisible?: boolean;
	hideModal?: () => void;
}
const FarmDeleteModal = ({ modalVisible, hideModal }: FarmDeleteModalPropsType): JSX.Element => {
	const { t } = useTranslation();
	const { loadFarms, updateDefaultFarm, setLoading, defaultFarm, farms } = useContext(UserContext);
	const onDeleteFarm = async (): Promise<void> => {
		setLoading(true);
		await deleteFarm(defaultFarm.id);
		await loadFarms();
		await updateDefaultFarm(farms.find((f) => f.id !== defaultFarm.id));
		setLoading(false);
	};
	return (
		<BaseModal
			modalVisible={modalVisible}
			hideModal={hideModal}
			title={t("modals.farmDelete.title")}
			confirmBtnText={t("common.button.delete")}
			cancelBtnText={t("common.button.cancel")}
			onCancel={hideModal}
			onConfirm={onDeleteFarm}
			colorCancelBtn="gaspacho"
			colorConfirmBtn="gaspacho"
			sideBySideButtons
		>
			<StyledModalContent>
				<h3>{t("modals.farmDelete.body")}</h3>
				<FarmSelector crudActions={false} disabled />
			</StyledModalContent>
		</BaseModal>
	);
};
export default FarmDeleteModal;
