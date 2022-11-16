import { useContext } from "react";
import styled from "styled-components";
import { OADContext, smagStepEnum } from "@Context/OADContext";
import { useTranslation } from "react-i18next";

const StyledSmagTooltip = styled.div`
	background-color: var(--white);
	border: 1px solid var(--tangerine-100);
	border-radius: 0.4rem;
	margin: 0 1.6rem;
	z-index: 1;
	position: absolute;
	bottom: 10rem;
	.tangerine-bg {
		padding: 0.8rem;
		background-color: var(--tangerine-25);
		.cta {
			color: var(--tangerine-100);
			margin-top: 0.8rem;
			text-align: right;
			&:hover {
				cursor: pointer;
				text-decoration: underline;
			}
		}
	}
`;

const SmagTooltip = (): JSX.Element => {
	const { t } = useTranslation();
	const { setSmagStepCookie } = useContext(OADContext);

	const closeTooltip = (): void => {
		setSmagStepCookie(smagStepEnum.HIDE_IMPORT_TOOLTIP);
	};

	return (
		<StyledSmagTooltip>
			<div className="tangerine-bg">
				<h5>{t("components.smagTooltip.body")}</h5>
				<div className="cta" onClick={closeTooltip} onKeyDown={closeTooltip} role="button" tabIndex={0}>
					<h5>{t("common.button.understood")}</h5>
				</div>
			</div>
		</StyledSmagTooltip>
	);
};

export default SmagTooltip;
