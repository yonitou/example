import { ParamListBase } from "@react-navigation/native";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";

export interface RadarScreenProps {
	onNavBack: () => void;
}

export interface RadarContainerProps {
	navigation: MaterialTopTabNavigationProp<ParamListBase>;
}
