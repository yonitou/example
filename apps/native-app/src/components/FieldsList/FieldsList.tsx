import { useContext, useMemo } from "react";
import _ from "lodash";
import { ScrollView } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import { fieldType } from "@Types/field.types";
import { UserContext } from "@Context/UserContext";
import List from "./components/List";

interface FieldsListProps {
	authorizedFields: fieldType[];
	onSelect: (item: fieldType) => void;
	onUnSelect: (item: fieldType) => void;
	selectedFieldIds: number[];
	onPressField?: (item: fieldType) => void;
	selection: boolean;
}

interface FieldGroup {
	cropId: string;
	data: fieldType[];
	cropName: string;
}

const FieldsList = ({
	authorizedFields,
	onSelect,
	onPressField,
	onUnSelect,
	selectedFieldIds,
	selection,
}: FieldsListProps): JSX.Element => {
	const { t } = useTranslation();
	const { crops } = useContext(UserContext);

	const sortedFieldsGroupedByCrops: FieldGroup[] = useMemo(() => {
		const fieldsGroupedByCrops = _.groupBy(authorizedFields, "crop.id");
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
	}, [authorizedFields, t, crops]);

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			{sortedFieldsGroupedByCrops?.map((fieldGroup, index, arr) => {
				const crop = crops.find((c) => c.id.toString() === fieldGroup.cropId);
				const isLast = index === arr.length - 1;
				return (
					<List
						isLast={isLast}
						key={fieldGroup.cropId}
						crop={crop}
						fields={fieldGroup.data}
						selection={selection}
						selectedFieldIds={selectedFieldIds}
						onSelect={onSelect}
						onUnSelect={onUnSelect}
						onPressField={onPressField}
					/>
				);
			})}
		</ScrollView>
	);
};

export default FieldsList;
