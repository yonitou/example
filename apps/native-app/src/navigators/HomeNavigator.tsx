import { useContext } from "react";
import { meteoErrorEnum } from "@Types/meteo.types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";
import { UserContext } from "@Context/UserContext";
import HygoIcons from "@Icons/HygoIcons";

import ErrorComponent from "@Components/ErrorComponent";
import HomeScreen from "@Screens/home/HomeScreen";
import COLORS from "@Constants/palette";
import { useFeature } from "flagged";
import { featuresEnum } from "@Types/feature.types";
import BottomTabBar from "./components/BottomTabBar";
import TasksNavigator from "./TasksNavigator";

const Tab = createBottomTabNavigator();

const HomeNavigator = (): JSX.Element => {
	const { t } = useTranslation();
	const { meteoError } = useContext(UserContext);
	const hasTasks = useFeature(featuresEnum.TASKS);
	if (meteoError === meteoErrorEnum.SOME_FIELDS_DONT_HAVE_WEATHER_YET)
		return (
			<ErrorComponent
				icon={<HygoIcons.WaitingDrop />}
				title={t("screens.error.meteo.title")}
				description={t("screens.error.meteo.description")}
			/>
		);

	return (
		<Tab.Navigator
			tabBar={({ state, navigation, descriptors, insets }) =>
				hasTasks ? (
					<BottomTabBar navigation={navigation} state={state} descriptors={descriptors} insets={insets} />
				) : null
			}
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: COLORS.LAKE[100],
				tabBarInactiveTintColor: COLORS.WHITE[100],
			}}
		>
			<Tab.Screen name="HomeScreen" component={HomeScreen} />
			{hasTasks && <Tab.Screen name="Tasks" component={TasksNavigator} />}
		</Tab.Navigator>
	);
};

export default HomeNavigator;
