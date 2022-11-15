import { deleteSmagToken, getSmagToken } from "@Api/api";
import { createContext, useMemo, useContext, useCallback, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export enum smagStepEnum {
	SHOW_IMPORT_TOOLTIP = "SHOW_IMPORT_TOOLTIP",
	HIDE_IMPORT_TOOLTIP = "HIDE_IMPORT_TOOLTIP",
	SHOW_ONBOARDING_CROPS = "SHOW_ONBOARDING_CROPS",
	SHOW_ONBOARDING_TASKS = "SHOW_ONBOARDING_TASKS",
	DONE = "DONE",
}

interface OADContextProps {
	loggedInSmag: boolean;
	smagOnboardingStep: smagStepEnum;
	setSmagStepCookie: (value: smagStepEnum) => void;
	loginToSmag: () => Promise<void>;
	logoutFromSmag: () => Promise<void>;
}

export const OADContext = createContext<OADContextProps>({} as OADContextProps);

const OADProvider = ({ children }: { children: JSX.Element | JSX.Element[] }): JSX.Element => {
	const [smagOnboardingStep, setSmagOnboardingStep] = useState<smagStepEnum>();
	const { user, refetchUserProps } = useContext(AuthContext);

	const loggedInSmag = user?.smagStatus;

	const smagStepCookie = localStorage.getItem("smagOnboardingStep") as smagStepEnum;

	const setSmagStepCookie = useCallback((value: smagStepEnum): void => {
		localStorage.setItem("smagOnboardingStep", value);
		setSmagOnboardingStep(value);
	}, []);

	const loginToSmag = async (): Promise<void> => {
		const loginUri = await getSmagToken();
		window.location.replace(loginUri);
	};

	const logoutFromSmag = useCallback(async (): Promise<void> => {
		await deleteSmagToken();
		await refetchUserProps();
	}, [refetchUserProps]);

	useEffect(() => {
		if (!loggedInSmag) return;
		smagStepCookie ? setSmagOnboardingStep(smagStepCookie) : setSmagStepCookie(smagStepEnum.SHOW_IMPORT_TOOLTIP);
	}, [loggedInSmag, smagOnboardingStep, smagStepCookie, setSmagStepCookie]);

	const value = useMemo(
		() => ({
			loggedInSmag,
			smagOnboardingStep,
			setSmagStepCookie,
			loginToSmag,
			logoutFromSmag,
		}),
		[loggedInSmag, smagOnboardingStep, logoutFromSmag, setSmagStepCookie]
	);

	return <OADContext.Provider value={value}>{children}</OADContext.Provider>;
};

export default OADProvider;
