import { MouseEvent, RefObject } from "react";
import Checkbox from "@Components/Checkbox";
import ParcelSVG from "@Components/ParcelSVG";
import { COLORS } from "@Constants/palette";
import { fieldType } from "@Types/fields.types";
import { convertToHa } from "@Utils/convertToHa";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import BaseIcons from "@Icons/BaseIcons";
import FieldErrors from "./FieldErrors";

interface FieldProps {
	field: fieldType;
	isSelectedField: boolean;
	withCheckbox: boolean;
	onClick?: (e: MouseEvent<HTMLDivElement>, field: fieldType) => void;
	fieldRef: RefObject<HTMLDivElement>;
}

const StyledFieldWrapper = styled.div`
	margin-bottom: 1.6rem;
	padding-left: 1.6rem;
	cursor: pointer;
	&:last-child {
		margin-bottom: 0;
	}
	&:hover {
		svg.svg-field {
			stroke: var(--lake-100);
			fill: var(--lake-100);
		}
		.name {
			color: var(--lake-100);
		}
	}
	.field-details {
		display: flex;
		align-items: center;
	}
	.smag-icon {
		margin-right: 0.8rem;
	}

	.checkbox {
		margin-right: 1.6rem;
	}
	.svg-field {
		margin-right: 1.6rem;
	}
	.name {
		margin-right: 1.6rem;
		flex: 1;
		&.tangerine {
			color: var(--tangerine-100);
		}
	}

	.area {
		color: var(--night-50);
	}
`;

const Field = ({ onClick, field, isSelectedField, withCheckbox, fieldRef }: FieldProps): JSX.Element => {
	const { t } = useTranslation();

	return (
		<StyledFieldWrapper onClick={(e) => onClick(e, field)} key={field.id} ref={fieldRef}>
			<div className="field-details">
				{field?.smagCropZoneUid && !withCheckbox && (
					<BaseIcons.Smag width={16} height={16} className="smag-icon" />
				)}
				{withCheckbox && <Checkbox checked={isSelectedField} className="checkbox" />}
				{field?.features?.coordinates && (
					<ParcelSVG
						path={field.svg}
						className="svg-field"
						height={40}
						width={40}
						strokeWidth={1}
						fillOpacity={0.5}
						color={isSelectedField ? COLORS.TANGERINE[25] : COLORS.LAKE[25]}
						stroke={isSelectedField ? COLORS.TANGERINE[100] : COLORS.LAKE[100]}
					/>
				)}

				<h3 className={`name ${isSelectedField ? "tangerine" : null}`}>{field.name}</h3>
				{field.area && (
					<h3 className="area">
						{convertToHa(field.area)} {t("common.units.hectare")}
					</h3>
				)}
			</div>
			{field.needCheck && (
				<FieldErrors
					hasCrop={field?.crop?.id}
					hasZone={field?.features?.coordinates}
					hasName={field?.name}
					hasArea={field?.area}
				/>
			)}
		</StyledFieldWrapper>
	);
};

export default Field;
