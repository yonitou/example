import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { fieldType } from "@Types/field.types";
import { cropType } from "@Types/crop.types";

export interface CropsContainerProps {
	navigation: NativeStackNavigationProp<ParamListBase>;
	route: RouteProp<{
		params: {
			selectedFields: fieldType[];
		};
	}>;
}

export interface CropsScreenProps {
	crops: cropType[];
	loading: boolean;
	onGoHome: () => void;
	onNavBack: () => void;
	onSelectCrop: (crop: cropType) => void;
}
