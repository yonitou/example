import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { CropsScreenContext } from "@Context/CropScreenContext";
import BaseLoader from "@Components/Loader";
import { fieldType } from "@Types/fields.types";
import { SnackbarContext, snackbarTypeEnum } from "@Context/SnackbarContext";
import { UserContext } from "@Context/UserContext";
import EditSingleField from "./EditSingleField";

const StyledFieldDescriptionCard = styled.div`
	background-color: var(--white);
	border-radius: 0.4rem;
	position: absolute;
	left: 1rem;
	top: calc(5.2rem + 1.6rem + 2rem);
	min-width: 29rem;
	min-height: 50%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

interface FieldDescriptionCardProps {
	selectedField: fieldType;
}

const FieldDescriptionCard = ({ selectedField }: FieldDescriptionCardProps): JSX.Element => {
	const { t } = useTranslation();
	const { deleteFieldById, setSelectedFields, updateFields } = useContext(CropsScreenContext);
	const { refetchFields } = useContext(UserContext);

	const { showSnackbar } = useContext(SnackbarContext);
	const [loading, setLoading] = useState<boolean>(false);

	const onRequestUpdate = async (field: fieldType): Promise<void> => {
		setLoading(true);
		try {
			await updateFields([{ name: field.name, area: field.area, cropId: field.crop.id, fieldId: field.id }]);
			await refetchFields();
			setSelectedFields([field]);
			showSnackbar(t("common.snackbar.updateField.success"), snackbarTypeEnum.SUCCESS);
		} catch (e) {
			showSnackbar(t("common.snackbar.updateField.error"), snackbarTypeEnum.ERROR);
			throw e;
		} finally {
			setLoading(false);
		}
	};

	const onRequestDelete = async (): Promise<void> => {
		setLoading(true);
		try {
			await deleteFieldById(selectedField.id);
			showSnackbar(t("common.snackbar.deleteField.success"), snackbarTypeEnum.SUCCESS);
		} catch (e) {
			showSnackbar(t("common.snackbar.deleteField.error"), snackbarTypeEnum.ERROR);
		} finally {
			setLoading(false);
		}
	};

	return (
		<StyledFieldDescriptionCard>
			{loading ? (
				<BaseLoader />
			) : (
				<EditSingleField
					selectedField={selectedField}
					onRequestUpdate={onRequestUpdate}
					onRequestDelete={onRequestDelete}
				/>
			)}
		</StyledFieldDescriptionCard>
	);
};
export default FieldDescriptionCard;
