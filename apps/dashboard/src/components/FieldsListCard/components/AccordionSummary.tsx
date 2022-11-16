import { MouseEvent } from "react";
import Checkbox from "@Components/Checkbox";
import { COLORS } from "@Constants/palette";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { cropType } from "@Types/crops.types";
import CropIcon from "@Components/CropIcon";

interface AccordionSummaryProps {
	crop: cropType;
	numberOfFields: number;
	withCheckbox: boolean;
	onClickCheckbox?: (e: MouseEvent<HTMLDivElement>, crop: string) => void;
	checked: boolean;
	isIndeterminate: boolean;
	area: number;
	needCheck: boolean;
}

const StyledAccordionSummary = styled.div<{ needCheck: boolean }>`
	display: flex;
	align-items: center;
	color: var(${(props) => (props.needCheck ? "--gaspacho-100" : "--night-100")});
	.number-of-fields,
	.area {
		color: var(${(props) => (props.needCheck ? "--gaspacho-100" : "--night-50")});
	}
	.area,
	.name {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.name {
		margin-right: 0.8rem;
	}
	.number-of-fields {
		margin-right: 1.6rem;
	}
	.checkbox {
		margin-right: 1.6rem;
	}
`;

const AccordionSummary = ({
	crop,
	numberOfFields,
	area,
	withCheckbox,
	onClickCheckbox,
	checked,
	isIndeterminate,
	needCheck,
}: AccordionSummaryProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<StyledAccordionSummary needCheck={needCheck}>
			{withCheckbox && (
				<Checkbox
					onClick={(e) => onClickCheckbox(e, crop?.name)}
					checked={checked}
					isIndeterminate={isIndeterminate}
					className="checkbox"
				/>
			)}
			<CropIcon crop={crop} fill={needCheck ? COLORS.GASPACHO[100] : COLORS.NIGHT[100]} />
			<h3 className="name">{t(`crops.${crop.name}`)}</h3>
			<h3 className="number-of-fields">({numberOfFields})</h3>
			<h3 className="area">
				{area} {t("common.units.hectare")}
			</h3>
		</StyledAccordionSummary>
	);
};

export default AccordionSummary;
