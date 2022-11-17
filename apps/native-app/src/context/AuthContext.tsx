import { createContext, useState, useContext, useCallback, SetStateAction, Dispatch, useEffect, useMemo } from "react";
import { onboardingKeyEnum } from "@Types/onboarding.types";
import * as Sentry from "@sentry/react-native";
import { useTranslation } from "react-i18next";
import { generateUUID } from "@Utils/uuid";
import { FlagsProvider } from "flagged";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerForPushNotificationsAsync } from "@Utils/notifications";
import { checkSetup, deletePushToken, getTokenFromUser, getUser } from "@Api/hygoApi";
import Analytics from "@Analytics";
import { userProperties } from "@Types/user.types";
import LogRocket from "@logrocket/react-native";
import { ErrorsEnum, UserStatusEnum } from "@Types/auth.types";
import { SnackbarContext, SnackTypeEnum } from "./SnackBarContext";

interface AuthContextProps {
	logout: () => Promise<void>;
	checkTutorialToken: () => void;
	authError: ErrorsEnum;
	passTutorial: () => void;
	tourKey: onboardingKeyEnum;
	setStatus: (status: UserStatusEnum) => void;
	login: (authToken: string, barCode?: string) => Promise<void>;
	fetchUser: () => Promise<userProperties>;
	createPushToken: () => Promise<string>;
	updateUserStatus: () => Promise<void>;
	setHasConnection: Dispatch<SetStateAction<boolean>>;
	setAuthLoading: Dispatch<SetStateAction<boolean>>;
	signInAsUser: (userId: number) => void;
	checkMixtureTutorialToken: (withMixtures: boolean) => Promise<void>;
	setTourKey: (value: onboardingKeyEnum) => void;
	readonly tester: boolean;
	readonly mixtureTutorialToken: string;
	readonly hasConnection: boolean;
	readonly authLoading: boolean;
	readonly user: userProperties;
	readonly admin: boolean;
	readonly authToken: string;
	readonly tutorialToken: string;
	readonly status: UserStatusEnum;
}

export const AuthContext = createContext({} as AuthContextProps);

const AuthProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
	const { t, ready } = useTranslation();
	const { showSnackbar } = useContext(SnackbarContext);
	const [authToken, setAuthToken] = useState("");
	const [authLoading, setAuthLoading] = useState<boolean>(true);
	const [tutorialToken, setTutorialToken] = useState("");
	const [mixtureTutorialToken, setMixtureTutorialToken] = useState("");
	const [authError, setAuthError] = useState<ErrorsEnum>();
	const [hasConnection, setHasConnection] = useState<boolean>(true);
	const [pushToken, setPushToken] = useState<string>(null);
	const [status, setStatus] = useState<UserStatusEnum>(UserStatusEnum.LOGGED_OUT);
	const [user, setUser] = useState<userProperties>(null);
	const [admin, setAdmin] = useState<boolean>(false);
	const [tester, setTester] = useState<boolean>(false);
	const [tourKey, setTourKey] = useState<onboardingKeyEnum>();

	const { logAnalyticEvent, events, setAmplitudeUser, clearUser } = Analytics;

	const checkTutorialToken = useCallback(async (): Promise<void> => {
		const token = await AsyncStorage.getItem("tutorialToken");
		setTutorialToken(token ?? "pending");
	}, []);

	const passTutorial = useCallback(async (): Promise<void> => {
		await AsyncStorage.setItem(tourKey, "ok");
		switch (tourKey) {
			case onboardingKeyEnum.TUTORIAL_TOKEN:
				setTutorialToken("ok");
				break;
			case onboardingKeyEnum.MIXTURE_TUTORIAL_TOKEN:
				setMixtureTutorialToken("ok");
				break;
			default:
				break;
		}
		setTourKey(null);
	}, [tourKey]);

	const checkMixtureTutorialToken = useCallback(async (hasMixtures: boolean): Promise<void> => {
		const token = await AsyncStorage.getItem("mixtureTutorialToken");
		if (!hasMixtures) return;
		setMixtureTutorialToken(token ?? "pending");
	}, []);

	const createPushToken = async (): Promise<string> => {
		const fetchedPushToken = await registerForPushNotificationsAsync();
		setPushToken(fetchedPushToken);
		return fetchedPushToken;
	};

	const resetState = (withStatus = true): void => {
		setPushToken(null);
		setTester(null);
		setAuthToken(null);
		if (withStatus) setStatus(UserStatusEnum.LOGGED_OUT);
		setUser(null);
	};

	const initSentryUser = useCallback(async (userValue?: userProperties, pushTokenValue?: string): Promise<void> => {
		const uuid = await AsyncStorage.getItem("uuid");
		Sentry.setUser({
			uuid,
			firstName: userValue?.firstName,
			lastName: userValue?.lastName,
			email: userValue?.email,
			id: userValue?.userId?.toString(),
			plan: userValue?.plan?.name,
			pushToken: pushTokenValue,
		});
	}, []);

	const logout = useCallback(
		async (withStatus = true): Promise<void> => {
			try {
				logAnalyticEvent(events.auth.logout, {});
				if (pushToken) await deletePushToken(pushToken);
				await AsyncStorage.removeItem("authtoken");
				resetState(withStatus);
				await clearUser();
				setAdmin(false);
				Sentry.configureScope((scope) => scope.setUser(null));
			} catch (error) {
				showSnackbar(t("common.snackbar.logout.error"), SnackTypeEnum.ERROR);
				throw error;
			}
		},
		[logAnalyticEvent, events, clearUser, showSnackbar, pushToken, t]
	);

	const updateUserStatus = useCallback(async () => {
		try {
			await checkSetup();
			setStatus(UserStatusEnum.LOGGED_IN);
		} catch (e) {
			if (!e?.response?.status) return;
			setAuthError(e?.response?.data?.code);
			if (e?.response?.data?.code === "equipmentMissing") {
				setStatus(UserStatusEnum.NEED_EQUIPMENT);
			} else {
				setStatus(UserStatusEnum.NEED_SETUP);
			}
		}
	}, []);

	const initLogRocket = (userProps: userProperties): void => {
		LogRocket.identify(userProps?.userId?.toString() || userProps?.admin?.userId?.toString(), {
			name: `${userProps?.firstName || userProps?.admin?.firstName} ${
				userProps?.lastName || userProps?.admin?.lastName
			}`,
			email: userProps?.email,
		});
	};

	const login = useCallback(
		async (token: string, barCode?: string): Promise<void> => {
			try {
				initSentryUser();
				await AsyncStorage.setItem("authtoken", token);
				const fetchedUser = await fetchUser();
				setTester(fetchedUser?.tester);
				if (fetchedUser?.admin?.userId) setAdmin(true);
				await setAmplitudeUser(
					fetchedUser?.userId?.toString() || fetchedUser?.admin?.userId?.toString(),
					fetchedUser
				);
				initLogRocket(fetchedUser);
				logAnalyticEvent(events.auth.login, { barCode });
				if (!fetchedUser?.userId) {
					setStatus(UserStatusEnum.ADMIN);
					return;
				}

				initSentryUser(fetchedUser);
				setAuthToken(token);
				try {
					const fetchedPushToken = await createPushToken();
					initSentryUser(fetchedUser, fetchedPushToken);
				} catch (e) {
					Sentry.captureException("Error while creating pushToken");
				}

				await updateUserStatus();
			} catch (e) {
				showSnackbar(t("common.snackbar.login.error"), SnackTypeEnum.ERROR);
				logout();
				throw e;
			}
		},
		[events, setAmplitudeUser, logout, logAnalyticEvent, showSnackbar, initSentryUser, t, updateUserStatus]
	);

	const signInAsUser = useCallback(
		async (userId: number): Promise<void> => {
			setAuthLoading(true);
			const newToken = await getTokenFromUser(userId);
			await logout(false);
			await login(newToken);
			setAuthLoading(false);
		},
		[logout, login]
	);

	const fetchUser = async (): Promise<userProperties> => {
		const userProps = await getUser();
		setUser(userProps);
		return userProps;
	};

	const assignUserUUID = async (): Promise<void> => {
		const uuid = await AsyncStorage.getItem("uuid");
		if (!uuid) await AsyncStorage.setItem("uuid", generateUUID());
	};

	useEffect(() => {
		const tryLoginWithLocalToken = async (): Promise<void> => {
			await assignUserUUID();
			try {
				const storedToken = await AsyncStorage.getItem("authtoken");
				if (!storedToken) return;
				setAuthLoading(true);
				await login(storedToken);
			} catch (e) {
				if (e?.response?.status !== 401) throw e;
			} finally {
				setAuthLoading(false);
			}
		};

		if (ready && status === UserStatusEnum.LOGGED_OUT && !pushToken) tryLoginWithLocalToken();
	}, [status, showSnackbar, login, ready, pushToken]);

	const value = useMemo(
		(): AuthContextProps => ({
			logout,
			authToken,
			hasConnection,
			setHasConnection,
			checkTutorialToken,
			tutorialToken,
			passTutorial,
			fetchUser,
			authError,
			user,
			setTourKey,
			checkMixtureTutorialToken,
			mixtureTutorialToken,
			authLoading,
			updateUserStatus,
			setAuthLoading,
			login,
			status,
			setStatus,
			signInAsUser,
			admin,
			tourKey,
			createPushToken,
			tester,
		}),
		[
			logout,
			tester,
			tourKey,
			authToken,
			mixtureTutorialToken,
			checkMixtureTutorialToken,
			hasConnection,
			passTutorial,
			tutorialToken,
			user,
			authLoading,
			checkTutorialToken,
			login,
			authError,
			status,
			signInAsUser,
			admin,
			updateUserStatus,
		]
	);

	return (
		<AuthContext.Provider value={value}>
			<FlagsProvider features={user?.plan?.features}>{children}</FlagsProvider>
		</AuthContext.Provider>
	);
};

export default AuthProvider;
