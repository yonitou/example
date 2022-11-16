import { useTranslation } from "react-i18next";
import BaseIcons from "@Icons/BaseIcons";
import { COLORS } from "@Constants/palette";
import BaseModal from "../BaseModal";

export interface ConfirmOverwriteModalPropsType {
	modalVisible?: boolean;
	hideModal?: () => void;
	onCancelClick: () => void;
	onConfirmClick: () => void;
	onClickCenterButton: () => void;
}
const ConfirmOverwriteModal = ({
	modalVisible,
	hideModal,
	onCancelClick,
	onConfirmClick,
	onClickCenterButton,
}: ConfirmOverwriteModalPropsType): JSX.Element => {
	const { t } = useTranslation();

	return (
		<BaseModal
			modalVisible={modalVisible}
			hideModal={hideModal}
			title={t("modals.confirmOverwrite.title")}
			customBtnText={t("common.button.erase")}
			colorConfirmBtn="lake"
			colorCancelBtn="gaspacho"
			onCancel={onCancelClick}
			closeAfterConfirm
			cancelBtnText={t("common.button.cancel")}
			onConfirm={onConfirmClick}
			colorCustomBtn="lake"
			confirmBtnText={t("common.button.add")}
			onCustom={onClickCenterButton}
			sideBySideButtons
			customBtnIcon={<BaseIcons.ChangeCrops width={24} height={24} />}
			confirmBtnIcon={<BaseIcons.AddParcelle width={24} height={24} fill={COLORS.WHITE} fillOpacity={1} />}
		>
			<h3>{t("modals.confirmOverwrite.body")}</h3>
		</BaseModal>
	);
};
export default ConfirmOverwriteModal;
