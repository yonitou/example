import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { activeProductType } from "@Types/activeProduct.types";
import { tankType } from "@Types/tank.types";
import { targetType } from "@Types/target.types";

export interface MixtureScreenProps {
	onNavBack: () => void;
	selectedTargets: targetType[];
	products: activeProductType[];
	onAddProduct: (prod: activeProductType) => void;
	updateTargetsList: (targets: targetType[]) => void;
	selectedProducts: activeProductType[];
	tankIndications: tankType;
	onSubmit: () => void;
	removeProduct: (item: activeProductType) => void;
	loading: boolean;
	mixtureId: number;
	submitting: boolean;
}

export interface MixtureContainerProps {
	navigation: NativeStackNavigationProp<ParamListBase>;
	route: RouteProp<{
		params: {
			mixtureId: number;
		};
	}>;
}
