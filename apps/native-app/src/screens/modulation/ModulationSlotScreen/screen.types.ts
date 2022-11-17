import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { conditionEnum } from "@Types/condition.types";
import { metricsType } from "@Types/meteo.types";
import { modulationStatusEnum } from "@Types/modulation.types";
import { tankType } from "@Types/tank.types";
import { slotType } from "@Types/task.types";

export interface ModulationSlotScreenProps {
	onNavBack: () => void;
	onNavClose: () => void;
	onNavNext: () => void;
	onTabChange: (i: number) => void;
	slot: slotType;
	tankIndications: tankType;
	metricsOfTheSelectedSlot: metricsType;
	modulationOfTheSelectedSlot: number;
	modulationStatus: modulationStatusEnum;
	conditionsOfTheSelectedSlot: conditionEnum;
	modulationOfTheSelectedDay: number[];
	conditionsOfTheSelectedDay: conditionEnum[];
	selectedDay: string;
	modulationDisabled: boolean;
	conditions: conditionEnum[][];
	slotSize: number;
	modulationError: string;
	onValuesChange: (values: number[]) => void;
	loading: boolean;
}
export interface ModulationSlotContainerProps {
	navigation: NativeStackNavigationProp<ParamListBase>;
	route: RouteProp<{
		params: {
			fromReportScreen: boolean;
		};
	}>;
}
