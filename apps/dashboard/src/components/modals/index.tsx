import { useContext, Dispatch, SetStateAction } from "react";
import { ModalsContext, ModalPropsType } from "@Context/ModalContext";
import ConfirmOverwriteModal from "./ConfirmOverwriteModal";
import FarmCreateModal from "./FarmCreateModal";
import FarmDeleteModal from "./FarmDeleteModal";
import FarmUpdateModal from "./FarmUpdateModal";
import DeviceUpdateModal from "./DeviceUpdateModal";
import DeviceDeleteModal from "./DeviceDeleteModal";
import DeviceCreateModal from "./DeviceCreateModal";
import TaskDeleteModal from "./TaskDeleteModal";
import SmagLoginModal from "./SmagLoginModal";
import SmagLogoutModal from "./SmagLogoutModal";
import SmagOnboardingCropsModal from "./SmagOnboardingCropsModal";
import SmagOnboardingTasksModal from "./SmagOnboardingTasksModal";
import AccountDeleteModal from "./AccountDeleteModal";

const Modals = (): JSX.Element => {
	const hideModal = (
		setStateCallBack: Dispatch<SetStateAction<{ visibility: boolean; props: ModalPropsType }>>,
		props: ModalPropsType
	): void => setStateCallBack({ props, visibility: false });
	const {
		smagLoginModalProps,
		setSmagLoginModalProps,
		confirmOverwriteModalProps,
		setConfirmOverwriteModalProps,
		farmCreateModalProps,
		setFarmCreateModalProps,
		farmUpdateModalProps,
		setFarmUpdateModalProps,
		deviceUpdateModalProps,
		setDeviceUpdateModalProps,
		deviceDeleteModalProps,
		setDeviceDeleteModalProps,
		farmDeleteModalProps,
		setFarmDeleteModalProps,
		taskDeleteModalProps,
		setTaskDeleteModalProps,
		deviceCreateModalProps,
		setDeviceCreateModalProps,
		accountDeleteModalProps,
		setAccountDeleteModalProps,
		smagLogoutModalProps,
		setSmagLogoutModalProps,
		smagOnboardingCropsModalProps,
		setSmagOnboardingCropsModalProps,
		smagOnboardingTasksModalProps,
		setSmagOnboardingTasksModalProps,
	} = useContext(ModalsContext);

	return (
		<>
			{confirmOverwriteModalProps.visibility && (
				<ConfirmOverwriteModal
					modalVisible={confirmOverwriteModalProps.visibility}
					hideModal={() => hideModal(setConfirmOverwriteModalProps, confirmOverwriteModalProps.props)}
					onCancelClick={confirmOverwriteModalProps.props.onCancelClick}
					onConfirmClick={confirmOverwriteModalProps.props.onConfirmClick}
					onClickCenterButton={confirmOverwriteModalProps.props.onClickCenterButton}
				/>
			)}

			{farmCreateModalProps.visibility && (
				<FarmCreateModal
					modalVisible={farmCreateModalProps.visibility}
					hideModal={() => hideModal(setFarmCreateModalProps, farmCreateModalProps.props)}
				/>
			)}

			{farmUpdateModalProps.visibility && (
				<FarmUpdateModal
					modalVisible={farmUpdateModalProps.visibility}
					hideModal={() => hideModal(setFarmUpdateModalProps, farmUpdateModalProps.props)}
				/>
			)}
			{deviceUpdateModalProps.visibility && (
				<DeviceUpdateModal
					modalVisible={deviceUpdateModalProps.visibility}
					hideModal={() => hideModal(setDeviceUpdateModalProps, deviceUpdateModalProps.props)}
					device={deviceUpdateModalProps.props.device}
				/>
			)}
			{deviceDeleteModalProps.visibility && (
				<DeviceDeleteModal
					modalVisible={deviceDeleteModalProps.visibility}
					hideModal={() => hideModal(setDeviceDeleteModalProps, deviceDeleteModalProps.props)}
					device={deviceDeleteModalProps.props.device}
				/>
			)}
			{deviceCreateModalProps.visibility && (
				<DeviceCreateModal
					modalVisible={deviceCreateModalProps.visibility}
					hideModal={() => hideModal(setDeviceCreateModalProps, deviceCreateModalProps.props)}
				/>
			)}
			{accountDeleteModalProps.visibility && (
				<AccountDeleteModal
					modalVisible={accountDeleteModalProps.visibility}
					hideModal={() => hideModal(setAccountDeleteModalProps, accountDeleteModalProps.props)}
				/>
			)}
			{farmDeleteModalProps.visibility && (
				<FarmDeleteModal
					modalVisible={farmDeleteModalProps.visibility}
					hideModal={() => hideModal(setFarmDeleteModalProps, farmDeleteModalProps.props)}
				/>
			)}
			{taskDeleteModalProps.visibility && (
				<TaskDeleteModal
					modalVisible={taskDeleteModalProps.visibility}
					hideModal={() => hideModal(setTaskDeleteModalProps, taskDeleteModalProps.props)}
					taskId={taskDeleteModalProps.props.taskId}
					onDelete={taskDeleteModalProps.props.onDelete}
				/>
			)}
			{smagLoginModalProps.visibility && (
				<SmagLoginModal
					modalVisible={smagLoginModalProps.visibility}
					hideModal={() => hideModal(setSmagLoginModalProps, smagLoginModalProps.props)}
				/>
			)}
			{smagLogoutModalProps.visibility && (
				<SmagLogoutModal
					modalVisible={smagLogoutModalProps.visibility}
					hideModal={() => hideModal(setSmagLogoutModalProps, smagLogoutModalProps.props)}
				/>
			)}
			{smagOnboardingCropsModalProps.visibility && (
				<SmagOnboardingCropsModal
					modalVisible={smagOnboardingCropsModalProps.visibility}
					hideModal={() => hideModal(setSmagOnboardingCropsModalProps, smagOnboardingCropsModalProps.props)}
					onConfirm={smagOnboardingCropsModalProps.props.onConfirm}
				/>
			)}
			{smagOnboardingTasksModalProps.visibility && (
				<SmagOnboardingTasksModal
					modalVisible={smagOnboardingTasksModalProps.visibility}
					hideModal={() => hideModal(setSmagOnboardingTasksModalProps, smagOnboardingTasksModalProps.props)}
					onConfirm={smagOnboardingTasksModalProps.props.onConfirm}
				/>
			)}
		</>
	);
};

export default Modals;
