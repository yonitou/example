import styled from "styled-components";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@Components/Button";
import Accordion from "@Components/Accordion";
import TextInput from "@Components/TextInput";
import ParcelSVG from "@Components/ParcelSVG";
import { newFieldType } from "@Types/newFieldTypes";
import { COLORS } from "@Constants/palette";
import { useTranslation } from "react-i18next";

const StyledNewFieldsList = styled.div`
	overflow: auto;
	height: 100%;
	flex: 1;
	.accordion {
		margin-bottom: 1rem;
	}
	.ctas {
		display: flex;
		padding: 0 !important;
		margin-top: 1.6rem;
		button:first-child {
			margin-right: 2.4rem;
		}
	}
`;

const StyledAccordionSummary = styled.div`
	display: flex;
	align-items: center;
	svg {
		margin-right: 1.6rem;
	}
`;

interface NewFieldsListProps {
	newCreatedFields: newFieldType[];
	setClickedCoordonates: React.Dispatch<React.SetStateAction<number[][]>>;
	setCreateNewFieldValues: React.Dispatch<React.SetStateAction<newFieldType>>;
	setNewCreatedFields: React.Dispatch<React.SetStateAction<newFieldType[]>>;
}

const AccordionSummary = ({ name, path }: { name: string; path: string }): JSX.Element => {
	return (
		<StyledAccordionSummary>
			<ParcelSVG
				path={path}
				height={40}
				width={40}
				strokeWidth={1}
				fillOpacity={0.5}
				color={COLORS.LAKE[25]}
				stroke={COLORS.LAKE[100]}
			/>
			<h3>{name}</h3>
		</StyledAccordionSummary>
	);
};

const NewFieldsList = ({
	newCreatedFields,
	setClickedCoordonates,
	setCreateNewFieldValues,
	setNewCreatedFields,
}: NewFieldsListProps): JSX.Element => {
	const { t } = useTranslation();
	const methods = useForm();
	const deleteField = (index: number): void => {
		setNewCreatedFields((prev) => prev.filter((_, indx) => indx !== index));
	};

	const handleClickEdit = (field: newFieldType, index: number): void => {
		setClickedCoordonates(field.coordinates);
		setNewCreatedFields((fields) => fields.filter((_, indx) => indx !== index));
		setCreateNewFieldValues({ ...field, isEdited: true });
	};

	return (
		<StyledNewFieldsList>
			{!!newCreatedFields?.length &&
				newCreatedFields.map((field, index) => {
					const convertCoords = field.coordinates.flatMap((coord) => coord).join(" ");
					const key = `key-${index}`;

					return (
						<Accordion
							chevronColor={COLORS.NIGHT[100]}
							summary={<AccordionSummary path={convertCoords} name={field.name} />}
							key={key}
							className="accordion"
						>
							{/* eslint-disable-next-line */}
							<FormProvider {...methods}>
								<TextInput
									name="crop"
									disabled
									defaultValue={field.crop.name}
									label={t("common.inputs.crop.label")}
								/>
							</FormProvider>
							<div className="ctas">
								<Button
									color="tangerine"
									onClick={() => handleClickEdit(field, index)}
									text={t("common.button.edit")}
								/>

								<Button
									outlined
									color="tangerine"
									onClick={() => deleteField(index)}
									text={t("common.button.delete")}
								/>
							</div>
						</Accordion>
					);
				})}
		</StyledNewFieldsList>
	);
};

export default NewFieldsList;
