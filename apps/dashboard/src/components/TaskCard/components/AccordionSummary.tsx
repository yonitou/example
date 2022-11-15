import Checkbox from "@Components/Checkbox";
import CropIcon from "@Components/CropIcon";
import ParcelSVG from "@Components/ParcelSVG";
import { COLORS } from "@Constants/palette";
import productFamilies from "@Constants/productFamilies";
import { UserContext } from "@Context/UserContext";
import BaseIcons from "@Icons/BaseIcons";
import { doneTaskType, smagStatusEnum } from "@Types/task.types";
import { formatDate } from "@Utils/formatDate";
import { useContext, MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

interface AccordionSummaryProps {
	task: doneTaskType;
	cropIds: number[];
	selectedTasks: number[];
	onClickCheckbox: (checked: boolean, taskId: number) => void;
	checked: boolean;
}

const StyledAccordionSummary = styled.div`
	display: flex;
	align-items: center;
	.smag-status-icon {
		margin-right: 1.6rem;
	}
	.checkbox,
	.selected-slot,
	.category,
	.crops-wrapper,
	.selected-slot {
		margin-right: 3.2rem;
	}
	.category-wrapper {
		display: flex;
		align-items: center;
		svg {
			margin-right: 0.8rem;
		}
	}
	.crops-wrapper {
		display: flex;
		align-items: center;
		.crop {
			padding: 0.8rem 1.6rem;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 3rem;
			background-color: var(--night-5);
			margin-right: 0.8rem;
		}
	}
	.fields-wrapper {
		display: flex;
		align-items: center;
		.svg-field {
			margin-right: 0.8rem;
		}
	}
`;

const AccordionSummary = ({
	task,
	cropIds,
	selectedTasks,
	onClickCheckbox,
	checked,
}: AccordionSummaryProps): JSX.Element => {
	const { t } = useTranslation();
	const { crops } = useContext(UserContext);

	const onClick = (e: MouseEvent<HTMLDivElement>): void => {
		e.stopPropagation();
		onClickCheckbox(checked, task.id);
	};

	const ProductIcon = productFamilies[task.productFamily];
	return (
		<StyledAccordionSummary>
			{!!selectedTasks && <Checkbox checked={checked} onClick={onClick} className="checkbox" />}
			{task?.smagStatus === smagStatusEnum.SUCCEEDED && (
				<BaseIcons.Smag width={24} height={24} className="smag-status-icon" />
			)}
			{task?.smagStatus === smagStatusEnum.FAILED && (
				<BaseIcons.Warning width={24} height={24} className="smag-status-icon" />
			)}
			<h3 className="selected-slot">
				<>
					{formatDate(task.startTime, 30, Math.floor)} - {formatDate(task.endTime, 30, Math.ceil)}
				</>
			</h3>
			<div className="category-wrapper">
				<ProductIcon width={24} height={24} fill={COLORS.NIGHT[100]} />
				<h3 className="category">{t(`products.${task.productFamily}`)}</h3>
			</div>

			<div className="crops-wrapper">
				{cropIds.map((cropId) => {
					const crop = crops.find((c) => c.id === cropId);
					return (
						<h5 className="crop" key={crop.id}>
							<CropIcon crop={crop} fill={COLORS.NIGHT[100]} width={16} height={16} />
							{t(`crops.${crop?.name}`)}
						</h5>
					);
				})}
			</div>
			<div className="fields-wrapper">
				{task.selectedFields.map((field) => {
					return (
						<ParcelSVG
							key={field.id}
							path={field.svg}
							className="svg-field"
							height={40}
							width={40}
							strokeWidth={1}
							fillOpacity={0.5}
							color={COLORS.LAKE[25]}
							stroke={COLORS.LAKE[100]}
						/>
					);
				})}
			</div>
		</StyledAccordionSummary>
	);
};

export default AccordionSummary;
