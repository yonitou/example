import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { meteoErrorEnum, metricsType } from "@Types/meteo.types";
import { mixtureType } from "@Types/mixture.types";

export interface HomeScreenProps {
	weeklyMeteo: metricsType[];
	goToModulation: () => void;
	goToMixtureScreen: (mixture?: mixtureType) => void;
	handleMenuClick: () => void;
	onRequestDetailsMeteo: (selectedDay: string, cardPositionX: number) => void;
	onGoRealTime: () => void;
	openAddSensorModal: () => void;
	handleNotificationsClick: () => void;
	goToRadar: () => void;
	fetchMixtures: () => void;
	hasTasks: boolean;
	hasConditions: boolean;
	mixtures: mixtureType[];
	meteoError: meteoErrorEnum;
	hasAssociatedDevices: boolean;
	userName: string;
	loading: boolean;
	isOnboarding: boolean;
}

export interface HomeContainerProps {
	navigation: NativeStackNavigationProp<ParamListBase>;
}
