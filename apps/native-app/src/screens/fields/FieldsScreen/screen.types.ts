import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { fieldType } from "@Types/field.types";

export interface FieldsContainerProps {
	navigation: NativeStackNavigationProp<ParamListBase>;
	route: RouteProp<{
		params: {
			refresh: boolean;
		};
	}>;
}

export interface FieldsScreenProps {
	fields: fieldType[];
	selectedFields: fieldType[];
	onSelectField: (field: fieldType) => void;
	onPressField: (field: fieldType) => void;
	onUnSelectFields: (field: fieldType) => void;
	onGoHome: () => void;
	selection?: boolean;
	onPress: () => void;
	resetState: () => void;
}
