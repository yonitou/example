import { useContext } from "react";
import { Trans, useTranslation } from "react-i18next";
import styled from "styled-components";
import InputTip from "@Components/InputTip";
import { OADContext } from "@Context/OADContext";
import { SnackbarContext, snackbarTypeEnum } from "@Context/SnackbarContext";
import BaseModal from "../BaseModal";

export interface SmagLoginModalPropsType {
	modalVisible?: boolean;
	hideModal?: () => void;
}

const StyledModal = styled.div`
	.main-infos {
		h5,
		h3 {
			margin-bottom: 0.8rem;
		}
		h5 {
			color: var(--night-50);
		}
	}
	.input-tip {
		h5 {
			color: var(--night-50);
			&.night {
				color: var(--night-100);
			}
		}
	}
`;

const SmagLoginModal = ({ modalVisible, hideModal }: SmagLoginModalPropsType): JSX.Element => {
	const { t } = useTranslation();
	const { showSnackbar } = useContext(SnackbarContext);
	const { loginToSmag } = useContext(OADContext);

	const onConfirm = async (): Promise<void> => {
		try {
			await loginToSmag();
		} catch (e) {
			if (e?.response?.data?.code === "featureInConstruction")
				showSnackbar(t("common.snackbar.smagAuth.error"), snackbarTypeEnum.ERROR, 10);
			else throw e;
		}
	};

	return (
		<BaseModal
			modalVisible={modalVisible}
			hideModal={hideModal}
			title={t("modals.smagLogin.title")}
			confirmBtnText={t("common.button.letsgo")}
			onConfirm={onConfirm}
			colorConfirmBtn="tangerine"
		>
			<StyledModal>
				<div className="main-infos">
					<Trans i18nKey="modals.smagLogin.mainInfos">
						<h5>
							You will be able to communicate directly between your HYGO tasks and your Smag Farmer
							Account
						</h5>
						<h3>
							<span role="img" aria-label="Pourquoi">
								🤔
							</span>
							How will it work ?
						</h3>
						<h5>
							We&apos;ll ask you to login with your smag credentials to link your account. We&apos;ll then
							invite you to import your Smag fields in HYGO
						</h5>
					</Trans>
				</div>

				<InputTip>
					<Trans i18nKey="modals.smagLogin.inputTip">
						<h5 className="night">
							<span role="img" aria-label="Ampoule">
								💡
							</span>{" "}
							Why is it important to import my Smag fields ?
						</h5>
						<h5>
							This will enable us to make the link between each field to show you the corresponding tasks.
						</h5>
					</Trans>
				</InputTip>
			</StyledModal>
		</BaseModal>
	);
};
export default SmagLoginModal;
