import { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { fieldType } from "@Types/field.types";
import { updateField } from "@Api/hygoApi";
import { ModalsContext } from "@Context/ModalContext";
import { UserContext } from "@Context/UserContext";
import { FieldsContainerProps } from "./screen.types";
import FieldsScreen from "./FieldsScreen";

const FieldsContainer = ({ navigation, route }: FieldsContainerProps): JSX.Element => {
	const { t } = useTranslation();
	const { setTextInputModalProps } = useContext(ModalsContext);
	const { defaultFarm, fields, fetchFields } = useContext(UserContext);
	const [selection, setSelection] = useState<boolean>(false);
	const [selectedFields, setSelectedFields] = useState<fieldType[]>([]);

	const resetState = (): void => {
		setSelection(false);
		setSelectedFields([]);
	};

	const handleSelectFields = (field: fieldType): void => {
		setSelectedFields((prev) => (prev ? [...prev, field] : [field]));
	};
	const handleUnSelectFields = (unSelectedField: fieldType): void => {
		setSelectedFields((prev) => prev?.filter((field) => field.id !== unSelectedField.id));
	};

	const goToHome = (): void => navigation.goBack();

	const onPressField = (item: fieldType): void => {
		setTextInputModalProps({
			visibility: true,
			props: {
				defaultValue: item?.name,
				title: t("modals.fieldName.title"),
				setValue: async (name: string) => {
					const updatedField = { fieldId: item.id, name };
					await updateField(updatedField, defaultFarm.id);
					await fetchFields();
				},
			},
		});
	};
	const onPress = (): void => {
		if (!selection) setSelection(true);
		else
			navigation.navigate("CropsScreen", {
				selectedFields,
			});
	};

	useEffect(() => {
		if (route?.params?.refresh) resetState();
	}, [route?.params, fetchFields]);

	return (
		<FieldsScreen
			fields={fields}
			selectedFields={selectedFields}
			onSelectField={handleSelectFields}
			onUnSelectFields={handleUnSelectFields}
			onPressField={onPressField}
			onGoHome={goToHome}
			onPress={onPress}
			resetState={resetState}
			selection={selection}
		/>
	);
};

export default FieldsContainer;
