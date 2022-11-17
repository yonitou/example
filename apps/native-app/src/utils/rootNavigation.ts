import { createNavigationContainerRef, ParamListBase } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef<ParamListBase>();

const navigate = (name: string, params: ParamListBase | { screen: string }): void => {
	if (navigationRef.isReady()) {
		navigationRef.navigate(name, params);
	}
};

export default navigate;
