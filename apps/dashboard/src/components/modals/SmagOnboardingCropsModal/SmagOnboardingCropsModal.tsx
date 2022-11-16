import { useContext } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { OADContext, smagStepEnum } from "@Context/OADContext";
import BaseIcons from "@Icons/BaseIcons";
import { UserContext } from "@Context/UserContext";
import ParcelSVG from "@Components/ParcelSVG";
import { convertToHa } from "@Utils/convertToHa";
import { COLORS } from "@Constants/palette";
import BaseModal from "../BaseModal";

export interface SmagOnboardingCropsModalPropsType {
	modalVisible?: boolean;
	hideModal?: () => void;
	onConfirm: () => void;
}

const StyledModal = styled.div`
	.field {
		display: flex;
		align-items: center;
		justify-content: center;
		.smag-icon {
			margin-right: 0.8rem;
		}
		.svg-field {
			margin-right: 1.6rem;
		}
		.name {
			margin-right: 1.6rem;
		}
		.area {
			color: var(--night-50);
		}
	}
	h3.subline {
		margin-top: 1.6rem;
		text-align: center;
		color: var(--night-50);
	}
`;

const SmagOnboardingCropsModal = ({
	modalVisible,
	hideModal,
	onConfirm,
}: SmagOnboardingCropsModalPropsType): JSX.Element => {
	const { t } = useTranslation();
	const { setSmagStepCookie } = useContext(OADContext);
	const { fields } = useContext(UserContext);
	const exampleField = fields?.filter((f) => !f.needCheck)?.[0];

	const onDismiss = (): void => {
		setSmagStepCookie(smagStepEnum.SHOW_ONBOARDING_TASKS);
		hideModal();
	};

	return (
		<BaseModal
			modalVisible={modalVisible}
			hideModal={onDismiss}
			title={t("modals.smagOnboardingCrops.title")}
			confirmBtnText={t("common.button.understood")}
			onConfirm={onConfirm}
			colorConfirmBtn="tangerine"
		>
			<StyledModal>
				<div className="field">
					<BaseIcons.Smag width={24} height={24} className="smag-icon" />
					<ParcelSVG
						path={exampleField.svg}
						className="svg-field"
						height={32}
						width={32}
						strokeWidth={1}
						fillOpacity={0.5}
						color={COLORS.LAKE[25]}
						stroke={COLORS.LAKE[100]}
					/>
					<h3 className="name">{exampleField.name}</h3>

					<h3 className="area">
						{convertToHa(exampleField.area)} {t("common.units.hectare")}
					</h3>
				</div>
				<h3 className="subline">{t("modals.smagOnboardingCrops.subline")}</h3>
			</StyledModal>
		</BaseModal>
	);
};
export default SmagOnboardingCropsModal;
