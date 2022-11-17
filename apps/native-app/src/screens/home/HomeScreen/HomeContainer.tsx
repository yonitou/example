import { useCallback, useContext, useEffect, useState } from "react";
import { DrawerActions, useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useFeature } from "flagged";
import { featuresEnum } from "@Types/feature.types";
import { AuthContext } from "@Context/AuthContext";
import Analytics from "@Analytics";
import { ModulationContext } from "@Context/ModulationContext";
import { UserContext } from "@Context/UserContext";
import { UserStatusEnum } from "@Types/auth.types";
import { ModalsContext } from "@Context/ModalContext";
import { SnackbarContext, SnackTypeEnum } from "@Context/SnackBarContext";
import { useTourGuideController } from "rn-tourguide";
import { getMixtures } from "@Api/hygoApi";
import { mixtureType } from "@Types/mixture.types";
import { onboardingKeyEnum } from "@Types/onboarding.types";
import { HomeContainerProps } from "./screen.types";
import HomeScreen from "./HomeScreen";
import { lastStepNumber } from "./components/StepperOnboarding.constants";

const { logAnalyticEvent, events } = Analytics;
const HomeContainer = ({ navigation }: HomeContainerProps): JSX.Element => {
	const { t } = useTranslation();
	const { user, status, hasConnection, tutorialToken, checkMixtureTutorialToken, mixtureTutorialToken, setTourKey } =
		useContext(AuthContext);
	const { showSnackbar } = useContext(SnackbarContext);
	const { meteo, devices, meteoError, defaultFarm } = useContext(UserContext);
	const { setAddSensorModalProps, setMixtureLimitModalProps } = useContext(ModalsContext);
	const { resetState } = useContext(ModulationContext);
	const isFocused = useIsFocused();
	const { canStart, start } = useTourGuideController();

	const [mixtures, setMixtures] = useState<mixtureType[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const hasTasks = useFeature(featuresEnum.TASKS);
	const hasConditions = useFeature(featuresEnum.CONDITIONS);

	const handleMenuClick = (): void => navigation.dispatch(DrawerActions.toggleDrawer());
	const handleNotificationsClick = (): void => navigation.navigate("NotificationsScreen");

	const goToModulation = (): void => {
		logAnalyticEvent(events.home.homeScreen.clickGoToModulation, {});
		navigation.navigate("ModulationProductsScreen");
	};

	const goToMeteo = (selectedDay: string, index: number): void => {
		logAnalyticEvent(events.home.homeScreen.clickMeteo, {});
		navigation.navigate("MeteoScreen", {
			selectedDay,
			index,
		});
	};

	const goToMixtureScreen = (): void => {
		logAnalyticEvent(events.home.homeScreen.clickAddMixture, {});
		if (mixtures?.length >= 5) {
			setMixtureLimitModalProps({ visibility: true, props: {} });
			return;
		}
		navigation.navigate("MixtureScreen");
	};

	const goToRadar = (): void => {
		logAnalyticEvent(events.home.homeScreen.clickGoToRadar, {});
		navigation.navigate("RadarScreen");
	};

	const goToRealTime = (): void => {
		logAnalyticEvent(events.home.homeScreen.clickGoToRealTime, {});
		navigation.navigate("RealTimeScreen");
	};

	const openAddSensorModal = (): void => {
		setAddSensorModalProps({
			visibility: true,
			props: {},
		});
	};

	const fetchMixtures = useCallback(async (): Promise<void> => {
		if (!defaultFarm) return;
		setLoading(true);
		const fetchedMixtures = await getMixtures(defaultFarm.id);
		setMixtures(fetchedMixtures);
		setLoading(false);
	}, [defaultFarm]);

	useEffect(() => {
		if (isFocused) {
			resetState();
			hasConditions && fetchMixtures();
		}
	}, [isFocused, resetState, fetchMixtures, hasConditions]);

	useEffect(() => {
		if (status === UserStatusEnum.LOGGED_IN && tutorialToken === "ok") {
			showSnackbar(
				t(hasConnection ? "common.snackbar.network.success" : "common.snackbar.network.error"),
				hasConnection ? SnackTypeEnum.OK : SnackTypeEnum.ERROR,
				hasConnection ? undefined : 10000000
			);
		}
	}, [hasConnection, showSnackbar, status, tutorialToken, t]);

	useEffect(() => {
		if (canStart && tutorialToken !== "ok") {
			setTourKey(onboardingKeyEnum.TUTORIAL_TOKEN);
			start();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [canStart, setTourKey, tutorialToken, checkMixtureTutorialToken]);

	useEffect(() => {
		checkMixtureTutorialToken(!loading && mixtures?.length > 0);
		if (
			canStart &&
			mixtureTutorialToken === "pending" &&
			tutorialToken === "ok" &&
			!loading &&
			mixtures?.length > 0
		) {
			setTourKey(onboardingKeyEnum.MIXTURE_TUTORIAL_TOKEN);
			start(lastStepNumber[onboardingKeyEnum.TUTORIAL_TOKEN] + 1);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [canStart, mixtureTutorialToken, tutorialToken, setTourKey, checkMixtureTutorialToken, loading, mixtures]);

	return (
		<HomeScreen
			weeklyMeteo={meteo?.aggregationBy24Hour}
			goToModulation={goToModulation}
			mixtures={mixtures}
			goToMixtureScreen={goToMixtureScreen}
			fetchMixtures={fetchMixtures}
			meteoError={meteoError}
			handleMenuClick={handleMenuClick}
			handleNotificationsClick={handleNotificationsClick}
			onRequestDetailsMeteo={goToMeteo}
			onGoRealTime={goToRealTime}
			userName={user?.firstName}
			openAddSensorModal={openAddSensorModal}
			isOnboarding={tutorialToken === "pending" || mixtureTutorialToken === "pending"}
			goToRadar={goToRadar}
			hasAssociatedDevices={devices?.length > 0}
			loading={loading}
			hasTasks={!!hasTasks}
			hasConditions={!!hasConditions}
		/>
	);
};

export default HomeContainer;
