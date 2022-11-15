import styled from "styled-components";
import { useEffect, useContext, useMemo } from "react";
import { CropsScreenContext, ModeEnum } from "@Context/CropScreenContext";

import { fieldType } from "@Types/fields.types";
import { COLORS } from "@Constants/palette";
import ParcelSVG from "@Components/ParcelSVG";
import BaseIcons from "@Icons/BaseIcons";
import { FormProvider, useForm } from "react-hook-form";
import TextInput from "@Components/TextInput";
import Button from "@Components/Button";
import { convertToHa } from "@Utils/convertToHa";
import { useTranslation } from "react-i18next";
import CropSelector from "@Components/CropSelector";
import { UserContext } from "@Context/UserContext";

const StyledEditSingleField = styled.div`
	width: 100%;
	flex: 1;
	padding: 1.6rem 2.4rem;
	position: relative;
	.cross {
		cursor: pointer;
		position: absolute;
		right: 0.5rem;
		top: 0.5rem;
	}
	form {
		.input-wrapper.inline {
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			svg {
				margin-right: 1.6rem;
			}
		}
		.input-wrapper {
			margin-bottom: 1.6rem;
		}
		.ctas {
			button:nth-child(2) {
				margin: 1.6rem 0;
			}
		}
	}
`;

interface EditSingleFieldProps {
	selectedField: fieldType;
	onRequestUpdate: (value: fieldType) => void;
	onRequestDelete: () => void;
}
const EditSingleField = ({ selectedField, onRequestUpdate, onRequestDelete }: EditSingleFieldProps): JSX.Element => {
	const { t } = useTranslation();
	const defaultValues = useMemo(() => {
		return {
			area: selectedField.area ? convertToHa(selectedField.area) : null,
			crop: selectedField?.crop?.id
				? { value: selectedField.crop.id.toString(), label: t(`crops.${selectedField.crop.name}`) }
				: null,
			name: selectedField.name,
		};
	}, [selectedField, t]);
	const methods = useForm({
		mode: "onChange",
	});
	const { setFields } = useContext(UserContext);
	const { resetSelection, crops, setCurrentMode, setCreateNewFieldValues } = useContext(CropsScreenContext);

	useEffect(() => {
		methods.reset(defaultValues);
	}, [selectedField, methods, defaultValues]);

	const onClickActionEditSave = ({
		area,
		crop,
		name,
	}: {
		name: string;
		area: number;
		crop: { label: string; value: string };
	}): void => {
		const newField = {
			...selectedField,
			crop: crops.find((c) => c.id.toString() === crop.value),
			area: area * 10000,
			name,
		};
		onRequestUpdate(newField);
	};

	const onEditZone = (): void => {
		// Override selectedField with isEdited flag to hide it on the map when redrawing the zone
		setFields((fields) => {
			return fields.map((f) => (f.id === selectedField.id ? { ...f, isEdited: true } : f));
		});
		setCurrentMode(ModeEnum.UPDATE_FIELD);
		setCreateNewFieldValues(selectedField);
	};

	return (
		<StyledEditSingleField>
			<BaseIcons.Close width={24} height={24} onClick={resetSelection} className="cross" />
			{/* eslint-disable-next-line */}
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onClickActionEditSave)}>
					<div className="input-wrapper inline">
						{selectedField?.features?.coordinates && (
							<ParcelSVG
								path={selectedField.svg}
								height={40}
								width={40}
								strokeWidth={1}
								fillOpacity={0.5}
								color={COLORS.TANGERINE[25]}
								stroke={COLORS.TANGERINE[100]}
							/>
						)}
						<TextInput
							label={t("common.inputs.fieldName.label")}
							name="name"
							rules={{
								required: {
									value: true,
									message: t("common.inputs.fieldName.errors.required"),
								},
							}}
							error={methods.formState.errors.name}
							defaultValue={defaultValues.name}
						/>
					</div>
					<div className="input-wrapper">
						<CropSelector control={methods.control} defaultValue={defaultValues.crop} />
					</div>
					<div className="input-wrapper">
						<TextInput
							label={t("common.inputs.area.label")}
							name="area"
							unit={t("common.units.hectare")}
							rules={{
								required: {
									value: true,
									message: t("common.inputs.area.errors.required"),
								},
								valueAsNumber: true,
								validate: (value: number) => value > 0 || t("common.inputs.area.errors.invalid"),
							}}
							error={methods.formState.errors.area}
							defaultValue={defaultValues.area}
						/>
					</div>
					<div className="ctas">
						<Button
							outlined
							color="tangerine"
							icon={<BaseIcons.Pencil width={24} height={24} />}
							text={t("screens.dashboard.editSingleField.drawFieldBtn")}
							onClick={onEditZone}
						/>
						<Button
							color="tangerine"
							text={t("common.button.save")}
							isSubmitBtn
							disabled={!methods.formState.isValid}
						/>
						<Button
							outlined
							color="gaspacho"
							icon={<BaseIcons.Trash width={24} height={24} />}
							text={t("screens.dashboard.editSingleField.deleteFieldBtn")}
							onClick={onRequestDelete}
						/>
					</div>
				</form>
			</FormProvider>
		</StyledEditSingleField>
	);
};

export default EditSingleField;
