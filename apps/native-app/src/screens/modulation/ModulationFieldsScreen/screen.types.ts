import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { fieldType } from "@Types/field.types";

export interface ModulationFieldsContainerProps {
	navigation: NativeStackNavigationProp<ParamListBase>;
	route: RouteProp<{
		params: {
			fromReportScreen: boolean;
		};
	}>;
}
export interface ModulationFieldsScreenProps {
	fields: fieldType[];
	selectedFields: fieldType[];
	fieldsFiltering: boolean;
	showSlotSelectorModal: () => void;
	loading: boolean;
	handleFilter: (b: boolean) => void;
	updateList: (item: fieldType, action: "ADD" | "DELETE") => void;
	onNavBack: () => void;
	onNavClose: () => void;
}
