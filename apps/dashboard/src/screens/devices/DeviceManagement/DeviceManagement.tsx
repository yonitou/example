import Button from "@Components/Button";
import BaseIcons from "@Icons/BaseIcons";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import DeviceCard from "./components/DeviceCard";
import NoDeviceCard from "./components/NoDeviceCard";
import { DeviceManagementProps } from "./deviceManagement.types";

const StyledDeviceManagement = styled.div`
	padding: 2rem 12rem;
	background: var(--gradient-background-2);
	height: 100%;
	overflow: auto;
	.add-device {
		height: 10rem;
		width: 30rem;
	}
`;

const DeviceManagement = ({
	onCreateDevice,
	devices,
	onEditDevice,
	onDeleteDevice,
}: DeviceManagementProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<StyledDeviceManagement>
			{devices?.length === 0 && <NoDeviceCard />}
			{devices?.map((device) => {
				return (
					<DeviceCard
						onEditDevice={onEditDevice}
						onDeleteDevice={onDeleteDevice}
						device={device}
						key={device.id}
					/>
				);
			})}
			<Button
				className="add-device"
				color="lake"
				onClick={onCreateDevice}
				outlined
				icon={<BaseIcons.Plus width={16} height={16} />}
				text={t("screens.deviceManagement.addSensorBtn")}
			/>
		</StyledDeviceManagement>
	);
};

export default DeviceManagement;
