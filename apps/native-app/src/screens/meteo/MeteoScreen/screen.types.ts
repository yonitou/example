import { ParamListBase, RouteProp } from "@react-navigation/native";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { metricsType } from "@Types/meteo.types";
import { FlatList } from "react-native-gesture-handler";

export interface MeteoContainerProps {
	route: RouteProp<{
		params: {
			index: number;
			selectedDay: string;
		};
	}>;
	navigation: MaterialTopTabNavigationProp<ParamListBase>;
}

export interface MeteoScreenProps {
	weeklyMeteo?: metricsType[];
	meteoOfTheSelectedDay?: metricsType[];
	onNavBack: () => void;
	onRequestDetails: (selectedDay: string) => void;
	scrollByDayRef: React.RefObject<FlatList>;
	scrollByHourRef: React.RefObject<FlatList>;
}
