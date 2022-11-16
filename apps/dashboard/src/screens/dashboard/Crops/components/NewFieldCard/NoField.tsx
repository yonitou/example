import BaseIcons from "@Icons/BaseIcons";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const StyledNoField = styled.div`
	display: flex;
	align-items: center;
	flex: 1;
	flex-direction: column;
	justify-content: center;
	text-align: center;

	.description {
		color: var(--night-50);
	}
`;

const NoField = (): JSX.Element => {
	const { t } = useTranslation();
	return (
		<StyledNoField>
			<BaseIcons.DrawField />
			<h3>{t("screens.dashboard.noField.title")}</h3>
			<h3 className="description">{t("screens.dashboard.noField.description")}</h3>
		</StyledNoField>
	);
};

export default NoField;
