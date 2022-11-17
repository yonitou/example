import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState, Dispatch, SetStateAction, useContext } from "react";
import { getAuthorizedFieldsByProductIds } from "@Api/hygoApi";
import { UserContext } from "@Context/UserContext";
import { activeProductType } from "@Types/activeProduct.types";
import { fieldType } from "@Types/field.types";
import { doneTaskType, taskTypeEnum } from "@Types/task.types";

interface useSelectedFieldsProps {
	navigation: NativeStackNavigationProp<ParamListBase>;
	fromReportScreen: boolean;
	selectedProducts: activeProductType[];
	initialFields: fieldType[];
	type: taskTypeEnum;
}

interface useSelectedFieldsResult {
	onNavBack: () => void;
	onNavClose: () => void;
	onNavNext: (taskParam?: doneTaskType) => void;
	addField: (item: fieldType) => void;
	removeField: (item: fieldType) => void;
	loading: boolean;
	authorizedFields: fieldType[];
	fieldsFiltering: boolean;
	setFieldsFiltering: Dispatch<SetStateAction<boolean>>;
	selectedFields: fieldType[];
}

const useSelectedFields = ({
	navigation,
	fromReportScreen,
	selectedProducts = [],
	initialFields = [],
	type,
}: useSelectedFieldsProps): useSelectedFieldsResult => {
	const { defaultFarm, fields } = useContext(UserContext);
	const [selectedFields, setSelectedFields] = useState<fieldType[]>(initialFields);
	const [authorizedFields, setAuthorizedFields] = useState<fieldType[]>([]);
	const [fieldsFiltering, setFieldsFiltering] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(false);
	const isDoneTask = type === taskTypeEnum.DONE;
	useEffect(() => {
		const loadFields = async (): Promise<void> => {
			setLoading(true);
			const fetchedFields: fieldType[] = fieldsFiltering
				? await getAuthorizedFieldsByProductIds(
						defaultFarm,
						selectedProducts.map((p) => p.id)
				  )
				: fields;
			setLoading(false);
			if (!fetchedFields) return;
			setAuthorizedFields(fetchedFields);
		};
		loadFields();
	}, [fieldsFiltering, selectedProducts, defaultFarm, fields]);

	const addField = (item: fieldType): void => {
		setSelectedFields((prevSelectedFields) => [...prevSelectedFields.filter((f) => f.id !== item.id), item]);
	};
	const removeField = (item: fieldType): void => {
		setSelectedFields((prevSelectedFields) => [...prevSelectedFields.filter((f) => f.id !== item.id)]);
	};

	const onNavClose = (): void => {
		isDoneTask ? navigation.pop() : navigation.navigate("Tabs", { screen: "HomeScreen" });
	};

	const tracabilityNavigation = (taskParam?: doneTaskType): void => {
		if (fromReportScreen) {
			navigation.replace("DoneTaskReportScreen", {
				task: taskParam,
			});
		} else {
			navigation.navigate("TracabilityProductsScreen", { task: taskParam });
		}
	};

	const modulationNavigation = (): void => {
		if (!fromReportScreen) navigation.push("ModulationSlotScreen");
		else navigation.replace("ComingTaskReportScreen");
	};

	const onNavNext = (taskParam?: doneTaskType): void => {
		isDoneTask ? tracabilityNavigation(taskParam) : modulationNavigation();
	};

	const onNavBack = (): void => {
		if (!isDoneTask && fromReportScreen) navigation.navigate("ComingTaskReportScreen");
		else navigation.goBack();
	};

	useEffect(() => {
		if (initialFields?.length > 0) setSelectedFields(initialFields);
	}, [initialFields]);

	return {
		onNavBack,
		onNavClose,
		onNavNext,
		addField,
		removeField,
		loading,
		authorizedFields,
		fieldsFiltering,
		setFieldsFiltering,
		selectedFields,
	};
};

export default useSelectedFields;
