import { useContext, useMemo } from "react";
import { UserContext } from "@Context/UserContext";
import { useTranslation } from "react-i18next";
import Dropdown from "@Components/Dropdown";
import HygoIcons from "@Icons/HygoIcons";
import COLORS from "@Constants/palette";

interface SensorSelectorProps {
	height: number;
	onSelectItem: (deviceId: number) => void;
	selectedDeviceId?: number;
}

const SensorSelector = ({ onSelectItem, selectedDeviceId, height }: SensorSelectorProps): JSX.Element => {
	const { t } = useTranslation();
	const { devices } = useContext(UserContext);
	const data = useMemo(() => devices?.map((d) => ({ label: d?.name, value: d?.id.toString() })), [devices]);

	return (
		<Dropdown
			value={selectedDeviceId.toString()}
			onSelect={(item) => onSelectItem(parseInt(item.value, 10))}
			height={height}
			Icon={HygoIcons.QRCode}
			overrideIconColor={COLORS.LAKE[100]}
			placeholder={t("components.sensorSelector.placeholder")}
			theme="light"
			data={data}
		/>
	);
};

export default SensorSelector;
