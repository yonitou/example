import { Dispatch, SetStateAction, useMemo, useContext } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import _ from "lodash";
import { UserContext } from "@Context/UserContext";
import { fieldType } from "@Types/fields.types";
import { needCheckToCrop } from "@Constants/needCheckToCrop";
import FieldsList from "./FieldsList";

const StyledFieldsTreeView = styled.div`
	flex: 1;
	overflow: auto;
`;

interface FieldsTreeViewProps {
	fields: fieldType[];
	selectedFields?: fieldType[];
	setSelectedFields: Dispatch<SetStateAction<fieldType[] | undefined>>;
	multiSelectionEnabled: boolean;
}

interface FieldGroup {
	cropId: string;
	data: fieldType[];
	cropName: string;
}

const FieldsTreeView = ({
	fields,
	selectedFields,
	setSelectedFields,
	multiSelectionEnabled,
}: FieldsTreeViewProps): JSX.Element => {
	const { t } = useTranslation();
	const { crops } = useContext(UserContext);

	const sortedFieldsGroupedByCrops: FieldGroup[] = useMemo(() => {
		const fieldsGroupedByCrops = _.groupBy(
			fields?.filter((f) => !f.needCheck),
			"crop.id"
		);
		return Object.keys(fieldsGroupedByCrops)
			?.map((cropId) => {
				const cropName = crops.find((c) => c.id.toString() === cropId)?.name;
				return {
					cropId,
					cropName,
					data: fieldsGroupedByCrops[cropId],
				};
			})
			?.sort((a, b) => {
				return t(`crops.${a.cropName}`).localeCompare(t(`crops.${b.cropName}`));
			});
	}, [fields, t, crops]);

	const fieldsWithNeedCheck = fields?.filter((f) => f.needCheck);

	return (
		<StyledFieldsTreeView>
			{fieldsWithNeedCheck?.length > 0 && (
				<FieldsList
					selectedFields={selectedFields}
					setSelectedFields={setSelectedFields}
					selection={multiSelectionEnabled}
					crop={needCheckToCrop}
					fields={fieldsWithNeedCheck}
					needCheck
				/>
			)}
			{sortedFieldsGroupedByCrops.map((fieldGroup) => {
				const crop = crops.find((c) => c.id.toString() === fieldGroup.cropId);
				return (
					<FieldsList
						key={fieldGroup.cropId}
						selectedFields={selectedFields}
						setSelectedFields={setSelectedFields}
						selection={multiSelectionEnabled}
						crop={crop}
						fields={fieldGroup.data}
					/>
				);
			})}
		</StyledFieldsTreeView>
	);
};

export default FieldsTreeView;
