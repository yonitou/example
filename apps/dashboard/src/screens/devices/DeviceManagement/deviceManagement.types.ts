import { deviceType } from "@Types/device.types";

export interface DeviceManagementProps {
	devices: deviceType[];
	onEditDevice: (device: deviceType) => void;
	onDeleteDevice: (device: deviceType) => void;
	onCreateDevice: () => void;
}
