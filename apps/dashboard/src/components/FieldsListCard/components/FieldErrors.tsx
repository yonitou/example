import styled from "styled-components";
import { useTranslation } from "react-i18next";
import InputTip from "@Components/InputTip";

interface FieldErrorsProps {
	hasCrop: number;
	hasZone: number[][][];
	hasName: string;
	hasArea: number;
}

const StyledFieldErrors = styled.div`
	.input-tip:first-child {
		margin-top: 0.4rem;
	}
	.input-tip:not(:last-child) {
		margin-bottom: 0.8rem;
	}
`;

const FieldErrors = ({ hasCrop, hasName, hasArea, hasZone }: FieldErrorsProps): JSX.Element => {
	const { t } = useTranslation();
	const errors = [!hasCrop && "noCrop", !hasName && "noName", !hasArea && "noArea", !hasZone && "noZone"]?.filter(
		(e) => e
	);
	return (
		<StyledFieldErrors>
			{errors?.map((e, i) => {
				const key = `${e}-${i}`;
				return (
					<InputTip key={key}>
						<h5>{t(`components.fieldsListCard.fieldErrors.${e}`)}</h5>
					</InputTip>
				);
			})}
		</StyledFieldErrors>
	);
};

export default FieldErrors;
