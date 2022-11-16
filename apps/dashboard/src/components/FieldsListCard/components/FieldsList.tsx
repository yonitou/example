import { Dispatch, SetStateAction, useEffect, useState, MouseEvent, useContext } from "react";
import styled from "styled-components";
import { fieldType } from "@Types/fields.types";
import { CropsScreenContext } from "@Context/CropScreenContext";
import { convertToHa } from "@Utils/convertToHa";
import { cropType } from "@Types/crops.types";
import { COLORS } from "@Constants/palette";
import Accordion from "@Components/Accordion";
import Field from "./Field";
import AccordionSummary from "./AccordionSummary";

const StyledFieldsList = styled.div`
	margin: 0 1.6rem;
	margin-bottom: 0.8rem;
`;

interface FieldsListProps {
	crop: cropType;
	fields: fieldType[];
	selection: boolean;
	selectedFields: fieldType[];
	setSelectedFields: Dispatch<SetStateAction<fieldType[]>>;
	needCheck?: boolean;
}

const FieldsList = ({
	fields,
	selectedFields,
	setSelectedFields,
	selection,
	crop,
	needCheck,
}: FieldsListProps): JSX.Element => {
	const [opened, setOpened] = useState<boolean>(false);
	const { fieldsRef, multiSelectionEnabled } = useContext(CropsScreenContext);

	const totalCropSurfaceinHa = fields.reduce((acc: number, next: fieldType) => acc + next.area, 0);
	const numberOfFieldsWithSameCrop = fields.length;

	const isCropCheck = fields.every((field: fieldType) =>
		selectedFields?.find((selected: fieldType) => selected.id === field.id)
	);

	const onClickCropCheckbox = (event: MouseEvent<HTMLDivElement>): void => {
		event.stopPropagation();
		if (!isCropCheck) {
			setSelectedFields((prev) => [...prev, ...fields]);
		} else {
			setSelectedFields((prev) =>
				prev?.filter((el) => {
					const isSelectedField = fields.find((e) => e.id === el.id);
					return !isSelectedField;
				})
			);
		}
	};

	const isIndeterminate = fields.some((field: fieldType) =>
		selectedFields?.find((selected: fieldType) => selected.id === field.id)
	);

	const isSelectedFields = (field: fieldType): boolean => {
		return Boolean(selectedFields?.find((selected) => selected.id === field.id));
	};
	const onClickFieldCheckbox = (event: MouseEvent<HTMLDivElement>, field: fieldType): void => {
		event.stopPropagation();
		if (!selection) {
			setSelectedFields(() => (isSelectedFields(field) ? [] : [field]));
		} else if (isSelectedFields(field)) {
			setSelectedFields((f) => f?.filter((fd) => fd.id !== field.id));
		} else {
			setSelectedFields((f) => [...f, field]);
		}
	};

	useEffect(() => {
		const scrollToSelectedField = (): void => {
			if (fieldsRef[selectedFields[0].id].current) {
				fieldsRef[selectedFields[0].id].current.scrollIntoView({
					behavior: "smooth",
					block: "nearest",
				});
			}
		};
		setOpened(!!selectedFields?.find((f) => f.crop.name === crop.name));
		if (selectedFields?.length === 1 && !multiSelectionEnabled && crop.id === selectedFields[0].crop.id)
			setTimeout(() => {
				scrollToSelectedField();
			}, 500);
	}, [selectedFields, crop, fieldsRef, multiSelectionEnabled]);

	return (
		<StyledFieldsList>
			<Accordion
				summary={
					<AccordionSummary
						crop={crop}
						withCheckbox={selection}
						onClickCheckbox={onClickCropCheckbox}
						numberOfFields={numberOfFieldsWithSameCrop}
						area={convertToHa(totalCropSurfaceinHa)}
						checked={isCropCheck}
						isIndeterminate={isIndeterminate}
						needCheck={needCheck}
					/>
				}
				opened={opened}
				needCheck={needCheck}
				chevronColor={needCheck ? COLORS.GASPACHO[100] : COLORS.NIGHT[100]}
			>
				{fields
					.sort((a, b) => a.name.localeCompare(b.name))
					.map((field: fieldType) => {
						return (
							<Field
								isSelectedField={isSelectedFields(field)}
								field={field}
								fieldRef={fieldsRef[field.id]}
								key={field.id}
								onClick={onClickFieldCheckbox}
								withCheckbox={selection}
							/>
						);
					})}
			</Accordion>
		</StyledFieldsList>
	);
};

export default FieldsList;
