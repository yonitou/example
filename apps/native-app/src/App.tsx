import { useState, useContext, useEffect } from "react";
import LogRocket from "@logrocket/react-native";
import * as Sentry from "sentry-expo";
import i18next from "i18next";
import { AppState, LogBox, Platform, StyleSheet } from "react-native";
import * as Updates from "expo-updates";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Constants from "expo-constants";
import "intl";
import "intl/locale-data/jsonp/en";
import "intl/locale-data/jsonp/fr";
import "intl/locale-data/jsonp/es";
import "intl/locale-data/jsonp/cs";
import "intl/locale-data/jsonp/pt";
import "intl-pluralrules";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";
import NetInfo from "@react-native-community/netinfo";
import { notificationsEnum } from "@Types/notification.types";
import { TourGuideProvider } from "rn-tourguide";
import StepperOnboarding from "@Screens/home/HomeScreen/components/StepperOnboarding";
import SnackbarProvider from "@Context/SnackBarContext";
import NewUpdateScreen from "@Screens/home/NewUpdateScreen";
import ModalsProvider from "@Context/ModalContext";
import AuthProvider, { AuthContext } from "@Context/AuthContext";
import AppNavigationContainer from "@Navigators/index";
import Modals from "@Components/modals";
import { UserStatusEnum } from "@Types/auth.types";
import { handleNotificationResponse, markAsReadAndUpdateBadgeCount } from "@Utils/notifications";
import UserProvider, { UserContext } from "@Context/UserContext";
import ModulationProvider from "@Context/ModulationContext";
import { appStateEnum, ENV_ENUM } from "@Types/app.types";
import ErrorComponent from "@Components/ErrorComponent";
import HygoIcons from "@Icons/HygoIcons";
import { GRADIENTS } from "@Constants/palette";

// Images
import barcodeImage from "@Assets/authentication/barcode.png";
import blueBackgroundImage from "@Assets/authentication/bg.png";
import homeBackground from "@Assets/home/background.png";
import drawerLogo from "@Assets/home/drawer-logo.png";
import cloudy from "@Assets/meteo/cloudy.png";
import rainy from "@Assets/meteo/rainy.png";
import snowy from "@Assets/meteo/snowy.png";
import stormy from "@Assets/meteo/stormy.png";
import sunny from "@Assets/meteo/sunny.png";
import curvedArrow from "@Assets/modulation/curved-arrow.png";
import injectionNozzle from "@Assets/equipment/injection.png";
import lowPressureNozzle from "@Assets/equipment/low-pressure.png";
import pastilleNozzle from "@Assets/equipment/calibrate.png";
import standardNozzle from "@Assets/equipment/standard.png";
import spinner from "@Assets/spinner.gif";
import clara from "@Assets/home/clara.png";
import hveImg from "@Assets/settings/hve.png";
import backgroundLanding from "@Assets/authentication/landing/background.png";
import backgroundSignin from "@Assets/authentication/signin/background.png";
import planStep1 from "@Assets/home/plan-step-1.png";
import planStep2 from "@Assets/home/plan-step-2.png";
import defaultFarmWithoutFields from "@Assets/authentication/activation-error/defaultFarmWithoutFields.png";
import needUpdateVersionStep1 from "@Assets/authentication/activation-error/needUpdateVersion-step1.png";
import needUpdateVersionStep2 from "@Assets/authentication/activation-error/needUpdateVersion-step2.png";
import noDefaultFarm from "@Assets/authentication/activation-error/noDefaultFarm.png";
import noPlan from "@Assets/authentication/activation-error/noPlan.png";
import AnimatedSplashScreen from "@Components/AnimatedSplashScreen";
import splashImage from "@Assets/splash.png";
import { initTranslations } from "@I18n/i18n";

LogBox.ignoreLogs(["Non-serializable values were found in the navigation state."]);

SplashScreen.preventAutoHideAsync().catch(() => {
	/* reloading the app might trigger some race conditions, ignore them */
});

// Uncomment the 2 lines below to delete device's async stroage
// import AsyncStorage from "@react-native-async-storage/async-storage";
// AsyncStorage.clear();

Sentry.init({
	dsn: Constants.manifest.extra.sentryDSN,
	debug: __DEV__,
	release: Constants.manifest.extra.OTA,
});

const IMAGES_LIST = [
	barcodeImage,
	blueBackgroundImage,
	homeBackground,
	planStep1,
	planStep2,
	defaultFarmWithoutFields,
	needUpdateVersionStep1,
	needUpdateVersionStep2,
	noDefaultFarm,
	noPlan,
	drawerLogo,
	cloudy,
	rainy,
	stormy,
	snowy,
	hveImg,
	sunny,
	curvedArrow,
	injectionNozzle,
	lowPressureNozzle,
	pastilleNozzle,
	standardNozzle,
	backgroundLanding,
	backgroundSignin,
	spinner,
	clara,
];

const App = (): JSX.Element => {
	const [updateRequired, setUpdateRequired] = useState(false);

	const { status, setHasConnection, tester } = useContext(AuthContext);
	const { updateDefaultFarm, setAppState, appState } = useContext(UserContext);
	const lastNotificationResponse = Notifications.useLastNotificationResponse();

	useEffect(() => {
		const checkUpdate = async (): Promise<void> => {
			try {
				const { isAvailable } = await Updates.checkForUpdateAsync();

				if (isAvailable) setUpdateRequired(true);
			} catch (e) {
				setUpdateRequired(false);
			}
		};
		if (appState === appStateEnum.ACTIVE) checkUpdate();
	}, [appState]);

	useEffect(() => {
		if (
			status === UserStatusEnum.LOGGED_IN &&
			lastNotificationResponse &&
			lastNotificationResponse.notification.request.content.data
		) {
			const { farmId, type, taskId, notificationId, deviceId, associatedComingTaskIds } = lastNotificationResponse
				.notification.request.content.data as {
				associatedComingTaskIds: number[];
				type: notificationsEnum;
				taskId: number;
				notificationId: number;
				farmId: number;
				deviceId: number;
			};
			handleNotificationResponse({ farmId, type, taskId, deviceId, associatedComingTaskIds }).then(async () => {
				if (farmId) updateDefaultFarm(farmId as number);
				await markAsReadAndUpdateBadgeCount([notificationId]);
			});
		}
	}, [lastNotificationResponse, updateDefaultFarm, status]);

	useEffect(() => {
		const subscription = AppState.addEventListener("change", (nextAppState) => setAppState(nextAppState));
		const networkSnackBarUnsubscribe = NetInfo.addEventListener((state) => setHasConnection(state.isConnected));
		return () => {
			networkSnackBarUnsubscribe();
			(subscription as unknown as HTMLElement).remove();
		};
	}, [setHasConnection, setAppState]);

	useEffect(() => {
		if (Constants.manifest.extra.appEnv !== ENV_ENUM.DEVELOPMENT && Platform.OS !== "android" && tester === false) {
			LogRocket.init(Constants.manifest.extra.logRocketAppId);
		} else {
			LogRocket.shutdown();
		}
	}, [tester]);

	return (
		<AnimatedSplashScreen imagesList={IMAGES_LIST} image={splashImage}>
			{updateRequired ? <NewUpdateScreen onError={() => setUpdateRequired(false)} /> : <AppNavigationContainer />}
		</AnimatedSplashScreen>
	);
};

export default (): JSX.Element => {
	useEffect(() => {
		initTranslations();
	}, []);

	return (
		<SafeAreaProvider>
			<GestureHandlerRootView style={styles.container}>
				<Sentry.Native.ErrorBoundary
					fallback={({ resetError }) => {
						return (
							<ErrorComponent
								onClick={resetError}
								icon={<HygoIcons.SadDrop colors={GRADIENTS.LAKE_GRAD} />}
								title={i18next.t("screens.error.generic.title")}
								description={i18next.t("screens.error.generic.description")}
							/>
						);
					}}
				>
					<SnackbarProvider>
						<AuthProvider>
							<TourGuideProvider
								preventOutsideInteraction
								tooltipComponent={StepperOnboarding}
								androidStatusBarVisible
							>
								<UserProvider>
									<ModulationProvider>
										<ModalsProvider>
											<App />
											<Modals />
										</ModalsProvider>
									</ModulationProvider>
								</UserProvider>
							</TourGuideProvider>
						</AuthProvider>
					</SnackbarProvider>
				</Sentry.Native.ErrorBoundary>
			</GestureHandlerRootView>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
