import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Button from "@Components/Button";
import { createFieldFromCoords } from "@Api/api";
import { CropsScreenContext, ModeEnum } from "@Context/CropScreenContext";
import { UserContext } from "@Context/UserContext";
import NewFieldForm from "./NewFieldForm";
import NewFieldsList from "./NewFieldsList";
import NoField from "./NoField";

const StyledNewField = styled.div`
	flex: 1;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	.ctas {
		padding: 1.6rem;
		background-color: var(--white);
		button:first-child {
			margin-bottom: 0.8rem;
		}
	}
	.wrapper {
		display: flex;
		flex: 1;
		padding: 1.6rem;
		overflow: hidden;
	}
`;

enum stepEnum {
	NO_FIELD = "NO_FIELD",
	FIELD_LIST = "FIELD_LIST",
	NEW_FIELD_FORM = "NEW_FIELD_FORM",
}

const NewFieldCard = (): JSX.Element => {
	const { t } = useTranslation();
	const {
		newCreatedFields,
		setNewCreatedFields,
		createNewFieldValues,
		setCreateNewFieldValues,
		clickedCoordonates,
		setClickedCoordonates,
		setCurrentMode,
		setSelectedFields,
		currentMode,
	} = useContext(CropsScreenContext);
	const { defaultFarm, refetchFields, setFields } = useContext(UserContext);
	const [step, setStep] = useState<stepEnum>(stepEnum.NO_FIELD);

	const goBackToFieldList = async (): Promise<void> => {
		setFields((fields) => {
			return fields.map((f) => ({ ...f, isEdited: false }));
		});
		setClickedCoordonates(undefined);
		setCreateNewFieldValues(undefined);
		setNewCreatedFields(undefined);
		setCurrentMode(ModeEnum.FIELD_LIST);
		setSelectedFields([]);
	};

	const handleSaveNewFields = async (): Promise<void> => {
		await Promise.all(
			newCreatedFields.map((field) => {
				const coordinates = [
					...field.coordinates.map((c) => {
						return { lat: c[0], lon: c[1] };
					}),
					{ lat: field.coordinates[0][0], lon: field.coordinates[0][1] },
				];
				return createFieldFromCoords({
					coordinates,
					name: field.name,
					cropId: field.crop.id,
					farmId: defaultFarm.id,
				});
			})
		);
		await refetchFields();
		goBackToFieldList();
	};

	useEffect(() => {
		if (newCreatedFields?.length > 0) setStep(stepEnum.FIELD_LIST);
		if ((!newCreatedFields && newCreatedFields?.length <= 0) || clickedCoordonates?.length > 0)
			setStep(stepEnum.NEW_FIELD_FORM);
		if (
			(!clickedCoordonates || clickedCoordonates?.length === 0) &&
			(!newCreatedFields || newCreatedFields?.length === 0)
		)
			setStep(stepEnum.NO_FIELD);
	}, [createNewFieldValues, newCreatedFields, clickedCoordonates]);

	return (
		<StyledNewField>
			<div className="wrapper">
				{step === stepEnum.NEW_FIELD_FORM && (
					<NewFieldForm
						clickedCoordonates={clickedCoordonates}
						createNewFieldValues={createNewFieldValues}
						setCreateNewFieldValues={setCreateNewFieldValues}
						setNewCreatedFields={setNewCreatedFields}
						setClickedCoordonates={setClickedCoordonates}
					/>
				)}
				{step === stepEnum.FIELD_LIST && (
					<NewFieldsList
						newCreatedFields={newCreatedFields}
						setCreateNewFieldValues={setCreateNewFieldValues}
						setNewCreatedFields={setNewCreatedFields}
						setClickedCoordonates={setClickedCoordonates}
					/>
				)}
				{step === stepEnum.NO_FIELD && <NoField />}
			</div>

			<div className="ctas">
				{currentMode === ModeEnum.NEW_FIELD && (
					<Button
						color="lake"
						text={t("screens.dashboard.newFieldCard.createFieldsBtn")}
						disabled={!newCreatedFields || newCreatedFields?.length === 0}
						onClick={handleSaveNewFields}
					/>
				)}
				<Button
					outlined
					color="lake"
					onClick={goBackToFieldList}
					text={
						currentMode === ModeEnum.NEW_FIELD
							? t("screens.dashboard.newFieldCard.cancelFieldCreationBtn")
							: t("common.button.cancel")
					}
				/>
			</div>
		</StyledNewField>
	);
};

export default NewFieldCard;
