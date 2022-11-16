import { ModalsContext } from "@Context/ModalContext";
import { UserContext } from "@Context/UserContext";
import { deviceType } from "@Types/device.types";
import { useContext } from "react";
import DeviceManagement from "./DeviceManagement";

const DeviceManagementContainer = (): JSX.Element => {
	const { devices } = useContext(UserContext);
	const { setDeviceCreateModalProps, setDeviceUpdateModalProps, setDeviceDeleteModalProps } =
		useContext(ModalsContext);

	const onEditDevice = (device: deviceType): void => {
		setDeviceUpdateModalProps({
			visibility: true,
			props: {
				device,
			},
		});
	};

	const onDeleteDevice = (device: deviceType): void => {
		setDeviceDeleteModalProps({
			visibility: true,
			props: {
				device,
			},
		});
	};

	const onCreateDevice = (): void => {
		setDeviceCreateModalProps({
			visibility: true,
			props: {},
		});
	};

	return (
		<DeviceManagement
			devices={devices}
			onEditDevice={onEditDevice}
			onDeleteDevice={onDeleteDevice}
			onCreateDevice={onCreateDevice}
		/>
	);
};

export default DeviceManagementContainer;
