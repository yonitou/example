import { useContext } from "react";
import { ImageBackground, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import backgroundImage from "@Assets/authentication/bg.png";
import { navigationRef } from "@Utils/rootNavigation";
import { AuthContext } from "@Context/AuthContext";
import LogoLoading from "@Components/LogoLoading";
import { UserStatusEnum } from "@Types/auth.types";
import COLORS from "@Constants/palette";
import AuthenticationLandingScreen from "@Screens/authentication/AuthenticationLandingScreen";
import BarCodeScreen from "@Screens/authentication/BarCodeScreen";
import SigninScreen from "@Screens/authentication/SigninScreen";
import SignupScreen from "@Screens/authentication/SignupScreen";
import NeedSetupScreen from "@Screens/authentication/NeedSetupScreen";
import AdminLandingScreen from "@Screens/authentication/AdminLandingScreen";
import EquipmentScreen from "@Screens/equipment/EquipmentScreen";
import EquipmentEditScreen from "@Screens/equipment/EquipmentEditScreen";
import EquipmentAdvancedScreen from "@Screens/equipment/EquipmentAdvancedScreen";
import { featuresEnum } from "@Types/feature.types";
import { useFeature } from "flagged";
import MixtureConditionsScreen from "@Screens/conditions/MixtureConditionsScreen";
import MeteoScreen from "@Screens/meteo/MeteoScreen";
import RadarScreen from "@Screens/meteo/RadarScreen";
import RealTimeScreen from "@Screens/realtime/RealTimeScreen";
import SettingsScreen from "@Screens/settings/SettingsScreen";
import NotificationsScreen from "@Screens/notifications/NotificationsScreen";
import DoneTaskReportScreen from "@Screens/tasks/DoneTaskReportScreen";
import ModulationFieldsScreen from "@Screens/modulation/ModulationFieldsScreen";
import ModulationProductsScreen from "@Screens/modulation/ModulationProductsScreen";
import TracabilityFieldsScreen from "@Screens/tracability/TracabilityFieldsScreen";
import TracabilityProductsScreen from "@Screens/tracability/TracabilityProductsScreen";
import CreateDoneTaskScreen from "@Screens/tracability/CreateDoneTaskScreen";
import MixtureScreen from "@Screens/conditions/MixtureScreen";
import FieldsScreen from "@Screens/fields/FieldsScreen";
import CropsScreen from "@Screens/fields/CropsScreen";
import ModulationSlotScreen from "@Screens/modulation/ModulationSlotScreen";
import ComingTaskReportScreen from "@Screens/modulation/ComingTaskReportScreen";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createNativeStackNavigator();

const AppNavigationContainer = (): JSX.Element => {
	const { status, authLoading } = useContext(AuthContext);
	const hasTasks = useFeature(featuresEnum.TASKS);
	const hasRealtime = useFeature(featuresEnum.REALTIME);
	const hasFarmWeather = useFeature(featuresEnum.FARM_WEATHER);

	return (
		<>
			{authLoading && (
				<View style={styles.containers}>
					<ImageBackground source={backgroundImage} style={styles.container}>
						<View style={[StyleSheet.absoluteFill, styles.layer]} />
						<LogoLoading color={COLORS.WHITE[100]} />
					</ImageBackground>
				</View>
			)}

			{!authLoading && (
				<View style={styles.containers}>
					<NavigationContainer ref={navigationRef}>
						<Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
							{status === UserStatusEnum.LOGGED_IN ? (
								<Stack.Group>
									<Stack.Screen name="DrawerScreen" component={DrawerNavigator} />
									<Stack.Screen name="MeteoScreen" component={MeteoScreen} />
									<Stack.Screen name="RadarScreen" component={RadarScreen} />
									<Stack.Group>
										<Stack.Screen name="EquipmentScreen" component={EquipmentScreen} />
										<Stack.Screen name="EquipmentEditScreen" component={EquipmentEditScreen} />
										<Stack.Screen
											name="EquipmentAdvancedScreen"
											component={EquipmentAdvancedScreen}
										/>
									</Stack.Group>
									<Stack.Group>
										<Stack.Screen
											name="MixtureScreen"
											component={MixtureScreen}
											options={{ animation: "slide_from_bottom" }}
										/>
										<Stack.Screen
											name="MixtureConditionsScreen"
											component={MixtureConditionsScreen}
										/>
									</Stack.Group>
									{hasTasks && (
										<Stack.Group>
											<Stack.Screen
												name="DoneTaskReportScreen"
												component={DoneTaskReportScreen}
											/>
											<Stack.Screen
												name="TracabilityFieldsScreen"
												component={TracabilityFieldsScreen}
											/>
											<Stack.Screen
												name="TracabilityProductsScreen"
												component={TracabilityProductsScreen}
											/>
											<Stack.Screen
												name="CreateDoneTaskScreen"
												component={CreateDoneTaskScreen}
											/>
										</Stack.Group>
									)}
									{hasTasks && (
										<Stack.Group>
											<Stack.Screen
												name="ModulationProductsScreen"
												component={ModulationProductsScreen}
											/>
											<Stack.Screen
												name="ModulationFieldsScreen"
												component={ModulationFieldsScreen}
											/>
											<Stack.Screen
												name="ModulationSlotScreen"
												component={ModulationSlotScreen}
											/>
											<Stack.Screen
												name="ComingTaskReportScreen"
												component={ComingTaskReportScreen}
											/>
										</Stack.Group>
									)}
									{hasRealtime && <Stack.Screen name="RealTimeScreen" component={RealTimeScreen} />}
									{hasFarmWeather && (
										<Stack.Group>
											<Stack.Screen name="FieldsScreen" component={FieldsScreen} />
											<Stack.Screen name="CropsScreen" component={CropsScreen} />
										</Stack.Group>
									)}
									<Stack.Screen name="SettingsScreen" component={SettingsScreen} />

									<Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
								</Stack.Group>
							) : (
								<Stack.Group>
									{status === UserStatusEnum.LOGGED_OUT && (
										<Stack.Group screenOptions={{ gestureEnabled: false, headerShown: false }}>
											<Stack.Screen
												name="AuthenticationLandingScreen"
												component={AuthenticationLandingScreen}
											/>
											<Stack.Screen name="BarCodeScreen" component={BarCodeScreen} />
											<Stack.Screen name="SigninScreen" component={SigninScreen} />
											<Stack.Screen name="SignupScreen" component={SignupScreen} />
										</Stack.Group>
									)}
									{status === UserStatusEnum.NEED_SETUP && (
										<Stack.Screen name="NeedSetupScreen" component={NeedSetupScreen} />
									)}
									{status === UserStatusEnum.ADMIN && (
										<Stack.Screen name="AdminLandingScreen" component={AdminLandingScreen} />
									)}
									{status === UserStatusEnum.NEED_EQUIPMENT && (
										<Stack.Group>
											<Stack.Screen name="NeedSetupEquipmentScreen" component={EquipmentScreen} />
											<Stack.Screen name="EquipmentEditScreen" component={EquipmentEditScreen} />
											<Stack.Screen
												name="EquipmentAdvancedScreen"
												component={EquipmentAdvancedScreen}
											/>
										</Stack.Group>
									)}
								</Stack.Group>
							)}
						</Stack.Navigator>
					</NavigationContainer>
				</View>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	containers: {
		flex: 1,
	},
	container: {
		justifyContent: "center",
		flex: 1,
		alignItems: "center",
	},
	layer: {
		backgroundColor: "#000",
		opacity: 0.6,
	},
});

export default AppNavigationContainer;
