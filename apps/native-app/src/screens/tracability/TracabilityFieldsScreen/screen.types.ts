import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { fieldType } from "@Types/field.types";
import { doneTaskType } from "@Types/task.types";

export interface TracabilityFieldsContainerProps {
	navigation: NativeStackNavigationProp<ParamListBase>;
	route: RouteProp<{
		params: {
			task: doneTaskType;
			fromReportScreen: boolean;
		};
	}>;
}
export interface TracabilityFieldsScreenProps {
	fields: fieldType[];
	selectedFields: fieldType[];
	fieldsFiltering: boolean;
	loading: boolean;
	handleFilter: (value: boolean) => void;
	updateList: (item: fieldType, action: "ADD" | "DELETE") => void;
	onNavBack: () => void;
	onNavClose: () => void;
	showSwitchButton: boolean;
	onNavNext: () => void;
}
