import { useContext, useEffect, useMemo } from "react";
import { UserContext } from "@Context/UserContext";
import styled from "styled-components";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@Components/Button";
import TextInput from "@Components/TextInput";
import ParcelSVG from "@Components/ParcelSVG";
import { COLORS } from "@Constants/palette";

import { newFieldType } from "@Types/newFieldTypes";
import { useTranslation } from "react-i18next";
import CropSelector from "@Components/CropSelector";
import { CropsScreenContext, ModeEnum } from "@Context/CropScreenContext";
import { fieldType } from "@Types/fields.types";

const StyledNewFieldForm = styled.div`
	flex: 1;
	overflow: auto;
	.form-wrapper {
		background-color: var(--white);
		padding: 1.6rem;
		border-radius: 0.4rem;
		.input-wrapper {
			margin-bottom: 1.6rem;
			&.row {
				display: flex;
				align-items: flex-end;
				input {
					flex: 1;
				}
				svg {
					margin-right: 2.4rem;
				}
			}
		}
		.ctas {
			display: flex;
			padding: 0 !important;
			button:first-child {
				margin-right: 2.4rem;
			}
		}
	}
`;

interface NewFieldFormProps {
	clickedCoordonates: number[][];
	createNewFieldValues: newFieldType | fieldType;
	setCreateNewFieldValues: React.Dispatch<React.SetStateAction<newFieldType>>;
	setNewCreatedFields: React.Dispatch<React.SetStateAction<newFieldType[]>>;
	setClickedCoordonates: React.Dispatch<React.SetStateAction<number[][]>>;
}
const NewFieldForm = ({
	clickedCoordonates,
	createNewFieldValues,
	setCreateNewFieldValues,
	setNewCreatedFields,
	setClickedCoordonates,
}: NewFieldFormProps): JSX.Element => {
	const { t } = useTranslation();
	const { crops, refetchFields } = useContext(UserContext);
	const { currentMode, updateFields, resetSelection, setSelectedFields } = useContext(CropsScreenContext);
	const methods = useForm({
		mode: "onChange",
	});

	const defaultValues = useMemo(
		() => ({
			name: createNewFieldValues?.name,
			crop: createNewFieldValues
				? {
						value: createNewFieldValues.crop.id.toString(),
						label: t(`crops.${createNewFieldValues.crop.name}`),
				  }
				: null,
		}),
		[createNewFieldValues, t]
	);

	const convertCoords = clickedCoordonates?.length > 2 && clickedCoordonates.flatMap((coord) => coord).join(" ");

	const onCreateField = ({ name, crop }: { name: string; crop: { value: string; label: string } }): void => {
		const newField = {
			name,
			crop: crops.find((c) => c.id.toString() === crop.value),
			coordinates: clickedCoordonates,
		};
		setNewCreatedFields((prev) => (prev ? [...prev, newField] : [newField]));
		setCreateNewFieldValues(undefined);
		setClickedCoordonates(undefined);
	};

	const onUpdateField = async ({
		name,
		crop,
	}: {
		name: string;
		crop: { value: string; label: string };
	}): Promise<void> => {
		const newCoords = [...clickedCoordonates, clickedCoordonates[0]];
		// Converting coordinates to array of objects for the server to compute it
		const coordinates = [
			...newCoords.map((c) => {
				return { lat: c[0], lon: c[1] };
			}),
		];
		const newField = {
			fieldId: (createNewFieldValues as fieldType).id,
			name,
			cropId: parseInt(crop.value, 10),
			coordinates,
		};
		await updateFields([newField]);
		const fetchedFields = await refetchFields();
		setCreateNewFieldValues(undefined);
		setClickedCoordonates(undefined);
		resetSelection();
		setSelectedFields(
			fetchedFields?.filter((selectedField) => selectedField.id === (createNewFieldValues as fieldType).id)
		);
	};

	const onSave = ({ name, crop }: { name: string; crop: { value: string; label: string } }): void => {
		currentMode === ModeEnum.NEW_FIELD ? onCreateField({ name, crop }) : onUpdateField({ name, crop });
	};

	const onDeleteField = (): void => {
		setCreateNewFieldValues(undefined);
		setClickedCoordonates(undefined);
	};

	useEffect(() => {
		methods.reset(defaultValues);
	}, [methods, defaultValues]);

	return (
		<StyledNewFieldForm>
			<div className="form-wrapper">
				{/* eslint-disable-next-line */}
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSave)} autoComplete="off">
						<div className="input-wrapper row">
							{convertCoords && (
								<ParcelSVG
									path={convertCoords}
									height={40}
									width={40}
									strokeWidth={1}
									fillOpacity={0.5}
									color={COLORS.LAKE[25]}
									stroke={COLORS.LAKE[100]}
								/>
							)}
							<TextInput
								label={t("common.inputs.fieldName.label")}
								name="name"
								// defaultValue={createNewFieldValues?.name}
								rules={{
									required: {
										value: true,
										message: t("common.inputs.fieldName.errors.required"),
									},
								}}
								error={methods.formState.errors.name}
							/>
						</div>
						<div className="input-wrapper">
							<CropSelector control={methods.control} />
						</div>
						{currentMode === ModeEnum.NEW_FIELD ? (
							<div className="ctas">
								<Button
									color="tangerine"
									text={t("common.button.save")}
									isSubmitBtn
									disabled={!methods.formState.isValid || clickedCoordonates?.length < 3}
								/>

								<Button
									outlined
									color="tangerine"
									text={t("common.button.delete")}
									onClick={onDeleteField}
								/>
							</div>
						) : (
							<Button
								color="tangerine"
								text={t("common.button.save")}
								isSubmitBtn
								disabled={!methods.formState.isValid || clickedCoordonates?.length < 3}
							/>
						)}
					</form>
				</FormProvider>
			</div>
		</StyledNewFieldForm>
	);
};

export default NewFieldForm;
