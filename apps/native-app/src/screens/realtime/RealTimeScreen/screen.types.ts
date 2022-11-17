import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { fieldType } from "@Types/field.types";
import { realTimeDataType } from "@Types/realtimescreen.types";

export interface RealTimeContainerProps {
	navigation: NativeStackNavigationProp<ParamListBase>;
	route: RouteProp<{
		params: {
			deviceId: number;
		};
	}>;
}
export interface RealTimeScreenProps {
	loading: boolean;
	selectedDeviceId: number;
	onRefresh: () => void;
	onUpdateDevice: (deviceId: number) => void;
	realTimeData: realTimeDataType[];
	lastRealTimeData: realTimeDataType;
	onNavBack: () => void;
	fields: fieldType[];
}
