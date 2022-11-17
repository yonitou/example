import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export interface AuthenticationLandingContainerProps {
	navigation: NativeStackNavigationProp<ParamListBase>;
}

export interface AuthenticationLandingProps {
	goToBarcode: () => void;
	goToSignin: () => void;
	goToSignup: () => void;
}
