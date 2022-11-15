import Button from "@Components/Button";
import BaseIcons from "@Icons/BaseIcons";
import { deviceType } from "@Types/device.types";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const StyledDeviceCard = styled.div`
	width: 100%;
	background-color: var(--white);
	box-shadow: 0px 0.8px 1.5px rgba(0, 83, 94, 0.1), 0px 6px 12px rgba(0, 83, 94, 0.1);
	border-radius: 0.4rem;
	display: flex;
	height: 10rem;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 1.6rem;
	overflow: hidden;
	.ctas {
		padding: 0.8rem;

		.crud-button {
			height: 4rem;
			border-radius: 0.2rem;
		}
		.crud-button:first-child {
			margin-bottom: 0.4rem;
		}
	}
	.device-details-wrapper {
		background: var(--gradient-light-grey);
		height: 100%;
		width: 30rem;
		display: flex;
		align-items: center;
		padding-left: 4rem;
		svg {
			margin-right: 1.6rem;
		}
	}
`;

interface DeviceCardProps {
	device: deviceType;
	onEditDevice: (device: deviceType) => void;
	onDeleteDevice: (device: deviceType) => void;
}

const DeviceCard = ({ device, onEditDevice, onDeleteDevice }: DeviceCardProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<StyledDeviceCard key={device.id}>
			<div className="device-details-wrapper">
				<BaseIcons.FilledSensor width={40} height={40} />
				<div className="details">
					<h3>{device.name}</h3>
					<p>{device.barcode}</p>
				</div>
			</div>
			<div className="ctas">
				<Button
					text={t("common.button.edit")}
					onClick={() => onEditDevice(device)}
					className="crud-button"
					color="lake"
					outlined
					icon={<BaseIcons.Pencil width={16} height={16} />}
				/>
				<Button
					text={t("common.button.delete")}
					onClick={() => onDeleteDevice(device)}
					className="crud-button"
					color="gaspacho"
					outlined
					icon={<BaseIcons.Trash width={16} height={16} />}
				/>
			</div>
		</StyledDeviceCard>
	);
};

export default DeviceCard;
