import { useEffect, useState, createContext, useCallback, useMemo, Dispatch, SetStateAction } from "react";
import * as Sentry from "@sentry/react";
import { getTokenFromUser, getUser } from "@Api/api";
import { userLevelEnum, userType } from "@Types/user.types";
import { planStatusEnum } from "@Types/plan.types";
import { FlagsProvider } from "flagged";

interface AuthContextProps {
	isAuth: boolean;
	loading: boolean;
	user: userType;
	admin: boolean;
	superAdmin: boolean;
	planId: string;
	farmerSelected: boolean;
	hasActivePlan: boolean;
	setIsAuth: Dispatch<SetStateAction<boolean>>;
	signin: (token: string, storeToken?: boolean) => void;
	signout: () => void;
	refetchUserProps: () => Promise<void>;
	signInAsUser: (userId: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider = ({ children }: { children: JSX.Element | JSX.Element[] }): JSX.Element => {
	const [isAuth, setIsAuth] = useState<boolean>(null);
	const [user, setUser] = useState<userType>(null);
	const [admin, setAdmin] = useState<boolean>(false);
	const [superAdmin, setSuperAdmin] = useState<boolean>(false);

	const loading = isAuth === null;
	const farmerSelected = !!user?.userId;
	const planId = user?.plan?.name;
	const hasActivePlan = user?.plan?.status && user?.plan?.status !== planStatusEnum.CANCELLED;

	const storeAuthCookie = (cookie: string): void => {
		localStorage.setItem("hygoCookie", cookie);
	};

	const deleteAuthCookie = (): void => {
		localStorage.removeItem("hygoCookie");
	};

	const signout = useCallback((): void => {
		setUser(null);
		setAdmin(false);
		setIsAuth(false);
		setSuperAdmin(false);
		Sentry.setTag("email", null);
		Sentry.configureScope((scope) => scope.setUser(null));
		deleteAuthCookie();
	}, []);

	const signin = useCallback(
		async (token: string, storeToken = true): Promise<void> => {
			if (storeToken) storeAuthCookie(token);
			try {
				const userDetails = await getUser();
				const isAdmin = !!userDetails?.admin?.userId;
				if (isAdmin) setAdmin(true);
				if (userDetails?.admin?.level === userLevelEnum.ADMIN) setSuperAdmin(true);
				Sentry.setUser({
					firstName: userDetails?.admin?.firstName || userDetails?.firstName,
					lastName: userDetails?.admin?.lastName || userDetails?.lastName,
					email: userDetails?.admin?.email || userDetails?.email,
					id: userDetails?.admin?.userId?.toString() || userDetails?.userId?.toString(),
					admin: isAdmin,
				});

				Sentry.setTag("email", userDetails.email);
				setUser(userDetails);
				setIsAuth(true);
			} catch (e) {
				signout();
			}
		},
		[signout]
	);

	const refetchUserProps = useCallback(async (): Promise<void> => {
		const fetchedUser = await getUser();
		setUser(fetchedUser);
	}, []);

	const signInAsUser = useCallback(
		async (userId: string): Promise<void> => {
			setIsAuth(null);
			const newToken = await getTokenFromUser(parseInt(userId, 10));
			storeAuthCookie(newToken);
			await refetchUserProps();
			setIsAuth(true);
		},
		[refetchUserProps]
	);

	useEffect(() => {
		const token = localStorage.getItem("hygoCookie");
		token ? signin(token, false) : signout();
	}, [signin, signout]);

	const value = useMemo(
		() => ({
			isAuth,
			loading,
			user,
			farmerSelected,
			admin,
			superAdmin,
			setIsAuth,
			signin,
			signout,
			refetchUserProps,
			signInAsUser,
			hasActivePlan,
			planId,
		}),
		[
			isAuth,
			hasActivePlan,
			loading,
			signout,
			user,
			farmerSelected,
			admin,
			superAdmin,
			signin,
			refetchUserProps,
			signInAsUser,
			planId,
		]
	);

	return (
		<AuthContext.Provider value={value}>
			<FlagsProvider features={user?.plan?.features}>{children}</FlagsProvider>
		</AuthContext.Provider>
	);
};

export default AuthProvider;
