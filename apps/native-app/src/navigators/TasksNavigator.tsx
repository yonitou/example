import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ComingTasksScreen from "@Screens/tasks/ComingTasksScreen";
import DoneTasksScreen from "@Screens/tasks/DoneTasksScreen";
import COLORS from "@Constants/palette";
import TopTabBar from "./components/TopTabBar";

const Tab = createMaterialTopTabNavigator();

const TasksNavigator = (): JSX.Element => {
	const { t } = useTranslation();
	const insets = useSafeAreaInsets();
	return (
		<Tab.Navigator
			style={{ backgroundColor: COLORS.WHITE[100] }}
			sceneContainerStyle={styles.sceneStyle}
			screenOptions={{ swipeEnabled: false }}
			tabBar={({ state, descriptors, navigation, position, layout, jumpTo }: MaterialTopTabBarProps) => (
				<TopTabBar
					tabBarPositionStyle={{ ...styles.tabBarPositionStyle, marginTop: Math.max(insets.top, 32) }}
					navigation={navigation}
					position={position}
					descriptors={descriptors}
					state={state}
					layout={layout}
					jumpTo={jumpTo}
					imageBackground
				/>
			)}
		>
			<Tab.Screen
				name="ComingTasksScreen"
				component={ComingTasksScreen}
				options={{ tabBarLabel: t("components.tasksTabBar.comingTasks") }}
			/>
			<Tab.Screen
				name="DoneTasksScreen"
				component={DoneTasksScreen}
				options={{ tabBarLabel: t("components.tasksTabBar.doneTasks") }}
			/>
		</Tab.Navigator>
	);
};

const styles = StyleSheet.create({
	tabBarPositionStyle: {
		marginBottom: 16,
	},
	sceneStyle: {
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
	},
});

export default TasksNavigator;
