import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { nozzleFamilyEnum, nozzleType } from "@Types/nozzle.types";

export interface EquipmentEditContainerProps {
	navigation: NativeStackNavigationProp<ParamListBase>;
	route: RouteProp<{
		params: {
			nozzle: nozzleType;
			lastNozzle: boolean;
			fromModulation?: boolean;
			fromReport?: boolean;
			nozzleAddCallback: (id: string) => void;
		};
	}>;
}

export interface EquipmentEditScreenProps {
	nozzle: nozzleType;
	lastNozzle: boolean;
	submitting: boolean;
	onGoBack: () => void;
	handleChangeName: (n: string) => void;
	handleFamilyClick: (f: nozzleFamilyEnum) => void;
	handleColorClick: () => void;
	handleHeightClick: () => void;
	handleSpeedChange: (s: number) => void;
	handlePressureChange: (p: number) => void;
	handleCreateNozzle: () => void;
	handleUpdateNozzle: () => void;
	handleDeleteNozzle: () => void;
}
