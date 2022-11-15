import { createContext, useState, Dispatch, useMemo } from "react";
import { ConfirmOverwriteModalPropsType } from "@Components/modals/ConfirmOverwriteModal";
import { FarmCreateModalPropsType } from "@Components/modals/FarmCreateModal";
import { FarmUpdateModalPropsType } from "@Components/modals/FarmUpdateModal";
import { FarmDeleteModalPropsType } from "@Components/modals/FarmDeleteModal";
import { DeviceUpdateModalPropsType } from "@Components/modals/DeviceUpdateModal";
import { DeviceDeleteModalPropsType } from "@Components/modals/DeviceDeleteModal";
import { DeviceCreateModalPropsType } from "@Components/modals/DeviceCreateModal";
import { TaskDeleteModalPropsType } from "@Components/modals/TaskDeleteModal";
import { AccountDeleteModalPropsType } from "@Components/modals/AccountDeleteModal";
import { SmagLoginModalPropsType } from "@Components/modals/SmagLoginModal";
import { SmagLogoutModalPropsType } from "@Components/modals/SmagLogoutModal";
import { SmagOnboardingCropsModalPropsType } from "@Components/modals/SmagOnboardingCropsModal";
import { SmagOnboardingTasksModalPropsType } from "@Components/modals/SmagOnboardingTasksModal";

export type ModalPropsType =
	| ConfirmOverwriteModalPropsType
	| FarmCreateModalPropsType
	| FarmUpdateModalPropsType
	| FarmDeleteModalPropsType
	| DeviceDeleteModalPropsType
	| DeviceCreateModalPropsType
	| TaskDeleteModalPropsType
	| SmagLoginModalPropsType
	| SmagLogoutModalPropsType
	| SmagOnboardingCropsModalPropsType
	| SmagOnboardingTasksModalPropsType
	| AccountDeleteModalPropsType;

interface ModalsContextType {
	confirmOverwriteModalProps: { visibility: boolean; props: ConfirmOverwriteModalPropsType };
	setConfirmOverwriteModalProps: Dispatch<{ visibility: boolean; props: ConfirmOverwriteModalPropsType }>;
	smagLoginModalProps: { visibility: boolean; props: SmagLoginModalPropsType };
	setSmagLoginModalProps: Dispatch<{ visibility: boolean; props: SmagLoginModalPropsType }>;
	smagLogoutModalProps: { visibility: boolean; props: SmagLogoutModalPropsType };
	setSmagLogoutModalProps: Dispatch<{ visibility: boolean; props: SmagLogoutModalPropsType }>;
	farmCreateModalProps: { visibility: boolean; props: FarmCreateModalPropsType };
	setFarmCreateModalProps: Dispatch<{ visibility: boolean; props: FarmCreateModalPropsType }>;
	farmUpdateModalProps: { visibility: boolean; props: FarmUpdateModalPropsType };
	setFarmUpdateModalProps: Dispatch<{ visibility: boolean; props: FarmUpdateModalPropsType }>;
	deviceUpdateModalProps: { visibility: boolean; props: DeviceUpdateModalPropsType };
	setDeviceUpdateModalProps: Dispatch<{ visibility: boolean; props: DeviceUpdateModalPropsType }>;
	deviceDeleteModalProps: { visibility: boolean; props: DeviceDeleteModalPropsType };
	setDeviceDeleteModalProps: Dispatch<{ visibility: boolean; props: DeviceDeleteModalPropsType }>;
	deviceCreateModalProps: { visibility: boolean; props: DeviceCreateModalPropsType };
	setDeviceCreateModalProps: Dispatch<{ visibility: boolean; props: DeviceCreateModalPropsType }>;
	accountDeleteModalProps: { visibility: boolean; props: AccountDeleteModalPropsType };
	setAccountDeleteModalProps: Dispatch<{ visibility: boolean; props: AccountDeleteModalPropsType }>;
	farmDeleteModalProps: { visibility: boolean; props: FarmDeleteModalPropsType };
	setFarmDeleteModalProps: Dispatch<{ visibility: boolean; props: FarmDeleteModalPropsType }>;
	taskDeleteModalProps: { visibility: boolean; props: TaskDeleteModalPropsType };
	setTaskDeleteModalProps: Dispatch<{ visibility: boolean; props: TaskDeleteModalPropsType }>;
	smagOnboardingCropsModalProps: { visibility: boolean; props: SmagOnboardingCropsModalPropsType };
	setSmagOnboardingCropsModalProps: Dispatch<{ visibility: boolean; props: SmagOnboardingCropsModalPropsType }>;
	smagOnboardingTasksModalProps: { visibility: boolean; props: SmagOnboardingTasksModalPropsType };
	setSmagOnboardingTasksModalProps: Dispatch<{ visibility: boolean; props: SmagOnboardingTasksModalPropsType }>;
}

export const ModalsContext = createContext({} as ModalsContextType);

const ModalsProvider = ({ children }: { children: JSX.Element[] }): JSX.Element => {
	const [confirmOverwriteModalProps, setConfirmOverwriteModalProps] = useState({
		visibility: false,
		props: {} as ConfirmOverwriteModalPropsType,
	});
	const [farmCreateModalProps, setFarmCreateModalProps] = useState({
		visibility: false,
		props: {} as FarmCreateModalPropsType,
	});
	const [taskDeleteModalProps, setTaskDeleteModalProps] = useState({
		visibility: false,
		props: {} as TaskDeleteModalPropsType,
	});
	const [farmUpdateModalProps, setFarmUpdateModalProps] = useState({
		visibility: false,
		props: {} as FarmUpdateModalPropsType,
	});
	const [deviceUpdateModalProps, setDeviceUpdateModalProps] = useState({
		visibility: false,
		props: {} as DeviceUpdateModalPropsType,
	});
	const [deviceCreateModalProps, setDeviceCreateModalProps] = useState({
		visibility: false,
		props: {} as DeviceCreateModalPropsType,
	});
	const [accountDeleteModalProps, setAccountDeleteModalProps] = useState({
		visibility: false,
		props: {} as AccountDeleteModalPropsType,
	});
	const [deviceDeleteModalProps, setDeviceDeleteModalProps] = useState({
		visibility: false,
		props: {} as DeviceDeleteModalPropsType,
	});
	const [farmDeleteModalProps, setFarmDeleteModalProps] = useState({
		visibility: false,
		props: {} as FarmDeleteModalPropsType,
	});
	const [smagLoginModalProps, setSmagLoginModalProps] = useState({
		visibility: false,
		props: {} as SmagLoginModalPropsType,
	});
	const [smagLogoutModalProps, setSmagLogoutModalProps] = useState({
		visibility: false,
		props: {} as SmagLogoutModalPropsType,
	});
	const [smagOnboardingCropsModalProps, setSmagOnboardingCropsModalProps] = useState({
		visibility: false,
		props: {} as SmagOnboardingCropsModalPropsType,
	});
	const [smagOnboardingTasksModalProps, setSmagOnboardingTasksModalProps] = useState({
		visibility: false,
		props: {} as SmagOnboardingTasksModalPropsType,
	});

	const value = useMemo(
		() => ({
			confirmOverwriteModalProps,
			taskDeleteModalProps,
			setTaskDeleteModalProps,
			setAccountDeleteModalProps,
			accountDeleteModalProps,
			deviceCreateModalProps,
			setDeviceCreateModalProps,
			setConfirmOverwriteModalProps,
			deviceDeleteModalProps,
			setDeviceDeleteModalProps,
			deviceUpdateModalProps,
			setDeviceUpdateModalProps,
			farmCreateModalProps,
			setFarmCreateModalProps,
			farmUpdateModalProps,
			setFarmUpdateModalProps,
			farmDeleteModalProps,
			setFarmDeleteModalProps,
			smagLoginModalProps,
			setSmagLoginModalProps,
			smagLogoutModalProps,
			setSmagLogoutModalProps,
			smagOnboardingCropsModalProps,
			setSmagOnboardingCropsModalProps,
			smagOnboardingTasksModalProps,
			setSmagOnboardingTasksModalProps,
		}),
		[
			accountDeleteModalProps,
			smagOnboardingCropsModalProps,
			smagOnboardingTasksModalProps,
			confirmOverwriteModalProps,
			taskDeleteModalProps,
			deviceUpdateModalProps,
			deviceCreateModalProps,
			deviceDeleteModalProps,
			farmCreateModalProps,
			farmUpdateModalProps,
			farmDeleteModalProps,
			smagLoginModalProps,
			smagLogoutModalProps,
		]
	);

	return <ModalsContext.Provider value={value}>{children}</ModalsContext.Provider>;
};

export default ModalsProvider;
