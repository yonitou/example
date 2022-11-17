import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { activeProductType } from "@Types/activeProduct.types";
import { nozzleType } from "@Types/nozzle.types";
import { tankType } from "@Types/tank.types";
import { targetType } from "@Types/target.types";

export interface ModulationProductsScreenProps {
	nozzle: nozzleType;
	handleNozzleClick: () => void;
	debit: number;
	handleDebitClick: () => void;
	products: activeProductType[];
	selectedProducts: activeProductType[];
	tankIndications: tankType;
	targetsModalOpened: boolean;
	selectedTargets: targetType[];
	addProduct: (item: activeProductType) => void;
	onSelectTargets: (targets: targetType[]) => void;
	removeProduct: (item: activeProductType) => void;
	onNavBack: () => void;
	onNavNext: () => void;
}

export interface ModulationProductsContainerProps {
	navigation: NativeStackNavigationProp<ParamListBase>;
	route: RouteProp<{
		params: {
			fromReportScreen: boolean;
			targetsModalOpened: boolean;
		};
	}>;
}
