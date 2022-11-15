import { COLORS } from "@Constants/palette";
import BaseIcons from "@Icons/BaseIcons";
import { fieldType } from "@Types/fields.types";
import { tankType } from "@Types/tank.types";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import FieldCard from "./FieldCard";

interface FieldsSectionProps {
	fields: fieldType[];
	tankIndications: tankType;
}

const StyledFieldsSection = styled.section`
	.title-wrapper {
		display: flex;
		align-items: center;
		h3 {
			margin-left: 0.8rem;
		}
	}
	.field-card-wrapper {
		overflow-x: auto;
		margin: 0 -1.6rem;
		padding: 0.8rem 1.6rem 2.4rem 1.6rem;
		white-space: nowrap;
	}
`;

const FieldsSection = ({ fields, tankIndications }: FieldsSectionProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<StyledFieldsSection>
			<div className="title-wrapper">
				<BaseIcons.Parcelle width={24} height={24} fill={COLORS.LAKE[100]} />
				<h3>{t("components.taskCard.fieldsSection.title")}</h3>
			</div>
			{!!fields?.length && (
				<div className="field-card-wrapper">
					{fields.map((field) => {
						return <FieldCard field={field} key={field?.id} tankIndications={tankIndications} />;
					})}
				</div>
			)}
		</StyledFieldsSection>
	);
};

export default FieldsSection;
