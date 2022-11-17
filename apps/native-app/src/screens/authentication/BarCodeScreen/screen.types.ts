import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Dispatch, SetStateAction } from "react";

export interface BarCodeContainerProps {
	navigation: NativeStackNavigationProp<ParamListBase>;
}

export interface BarCodeScreenProps {
	hasCameraPermission: boolean;
	scanned: boolean;
	tokenLoading: boolean;
	codeError: boolean;
	manual: boolean;
	hasConnection: boolean;
	getPermissionsAsync: () => void;
	toggleManualInput: () => void;
	handleBarCodeScanned: (data: Record<string, unknown>) => void;
	retryScan: () => void;
	codeFromScan: string;
	onGoBack: () => void;
	codeWith8Chars: boolean;
	setCodeWith8Chars: Dispatch<SetStateAction<boolean>>;
}
