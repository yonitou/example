import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { nozzleType } from "@Types/nozzle.types";

export interface EquipmentScreenProps {
	firstSetup: boolean;
	onSetupButtonPress: () => void;
	onPressAdvancedConf: () => void;
	nozzles: nozzleType[];
	setupCompleted: boolean;
	loading: boolean;
	onAddNozzle: () => void;
	onEditNozzle: (n: nozzleType) => void;
	onGoBack: () => void;
	logout: () => void;
}

export interface EquipmentContainerProps {
	navigation: NativeStackNavigationProp<ParamListBase>;
}
