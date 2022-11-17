import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { activeProductType } from "@Types/activeProduct.types";
import { nozzleType } from "@Types/nozzle.types";
import { tankType } from "@Types/tank.types";
import { targetType } from "@Types/target.types";
import { doneTaskType } from "@Types/task.types";

export interface TracabilityProductsScreenProps {
	products: activeProductType[];
	selectedProducts: activeProductType[];
	addProduct: (item: activeProductType) => void;
	activeModulation: boolean;
	modulation: number;
	nozzle: nozzleType;
	debit: number;
	tankIndications: tankType;
	selectedTargets: targetType[];
	targetsModalOpened: boolean;
	handleDebitClick: () => void;
	onSelectTargets: (targets: targetType[]) => void;
	handleNozzleClick: () => void;
	removeProduct: (item: activeProductType) => void;
	onNavBack: () => void;
	onNavClose: () => void;
	onNavNext: () => void;
}

export interface TracabilityProductsContainerProps {
	navigation: NativeStackNavigationProp<ParamListBase>;
	route: RouteProp<{
		params: {
			task: doneTaskType;
			fromReportScreen: boolean;
			targetsModalOpened: boolean;
		};
	}>;
}
