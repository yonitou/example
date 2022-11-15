import styled from "styled-components";

import { COLORS } from "@Constants/palette";
import BaseIcons from "@Icons/BaseIcons";
import { useTranslation } from "react-i18next";

const StyledFooterActions = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	height: 10rem;
`;

const StyledButton = styled.div`
	height: 100%;
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	background-color: var(--white);
	cursor: pointer;
	h5 {
		color: var(--night-50);
	}
	&:hover {
		background-color: var(--night-10);
	}
`;

interface FooterActionsProps {
	onClickChangeCrop: () => void;
	onClickDrawNewField: () => void;
}

export const FooterActions = ({ onClickChangeCrop, onClickDrawNewField }: FooterActionsProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<StyledFooterActions>
			<StyledButton onClick={onClickDrawNewField}>
				<BaseIcons.AddParcelle fill={COLORS.NIGHT[50]} fillOpacity={1} width={44} height={44} />
				<h5>{t("components.fieldsListCard.footerActions.newField")}</h5>
			</StyledButton>
			<StyledButton onClick={onClickChangeCrop}>
				<BaseIcons.EditCrop width={44} height={44} fill={COLORS.NIGHT[50]} />
				<h5>{t("components.fieldsListCard.footerActions.editCrops")}</h5>
			</StyledButton>
		</StyledFooterActions>
	);
};
