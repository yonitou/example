import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ENV_ENUM } from "@Types/app.types";

export interface SettingsContainerProps {
	navigation: NativeStackNavigationProp<ParamListBase>;
}
export interface SettingsScreenProps {
	onNavBack: () => void;
	updateHveMode: (value: boolean) => void;
	onDeleteLocalData: () => void;
	appEnv: ENV_ENUM;
	hveMode: boolean;
	admin: boolean;
}
