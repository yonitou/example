import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { productFamilyEnum } from "@Types/activeProduct.types";
import { metricsType } from "@Types/meteo.types";
import { conditionEnum, globalConditionType } from "@Types/condition.types";
import { tankType } from "@Types/tank.types";

export interface MixtureConditionsScreenProps {
	onNavBack: () => void;
	weeklyConditions: conditionEnum[][];
	conditions: globalConditionType[];
	tankIndications: tankType;
	explicabilityKeys: Array<keyof globalConditionType>;
	onPressHelp: () => void;
	onValuesChange: (value: number[]) => void;
	onTabChange: (i: number) => void;
	onPressUpdate: () => void;
	productFamily: productFamilyEnum;
	selectedTime: number;
	loading: boolean;
	metricsOfTheSelectedSlot: metricsType;
	selectedDay: string;
}

export interface MixtureConditionsContainerProps {
	navigation: NativeStackNavigationProp<ParamListBase>;
	route: RouteProp<{
		params: {
			mixtureId: number;
			defaultDay: string;
		};
	}>;
}
