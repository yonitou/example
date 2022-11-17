import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerCustom from "./components/DrawerCustom";
import HomeNavigator from "./HomeNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = (): JSX.Element => {
	return (
		<Drawer.Navigator
			drawerContent={({ navigation, state, descriptors }) => (
				<DrawerCustom navigation={navigation} state={state} descriptors={descriptors} />
			)}
			screenOptions={{
				drawerStyle: { width: 300 },
				headerShown: false,
				swipeEnabled: false,
			}}
		>
			<Drawer.Screen name="Tabs" component={HomeNavigator} />
		</Drawer.Navigator>
	);
};

export default DrawerNavigator;
