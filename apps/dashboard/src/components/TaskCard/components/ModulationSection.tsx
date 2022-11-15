import { COLORS } from "@Constants/palette";
import ProductFamilyIcons from "@Icons/ProductFamilyIcons";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

interface ModulationSectionProps {
	modulation: number;
}

const StyledModulationSection = styled.section`
	background-color: var(--tangerine-100);
	padding: 1.6rem;
	display: flex;
	align-items: center;
	border-radius: 0.4rem;
	svg {
		margin-right: 0.8rem;
	}
	h3 {
		color: var(--white);
	}
`;

const ModulationSection = ({ modulation }: ModulationSectionProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<StyledModulationSection>
			<ProductFamilyIcons.Product width={32} height={32} fill={COLORS.WHITE} />
			<h3>{t("components.taskCard.modulationSection.title", { modulation: modulation?.toFixed(0) || 0 })}</h3>
		</StyledModulationSection>
	);
};

export default ModulationSection;
