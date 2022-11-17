import { useContext, useState } from "react";
import { AuthContext } from "@Context/AuthContext";
import { nozzleType } from "@Types/nozzle.types";
import { UserContext } from "@Context/UserContext";
import Analytics from "@Analytics";
import { UserStatusEnum } from "@Types/auth.types";
import { useFeature } from "flagged";
import { featuresEnum } from "@Types/feature.types";
import EquipmentScreen from "./EquipmentScreen";
import { EquipmentContainerProps } from "./screen.types";

const EquipmentContainer = ({ navigation }: EquipmentContainerProps): JSX.Element => {
	const { logAnalyticEvent, events } = Analytics;
	const { logout, user, updateUserStatus, status } = useContext(AuthContext);
	const [loading, setLoading] = useState<boolean>(false);
	const { nozzles } = useContext(UserContext);
	const hasTasks = useFeature(featuresEnum.TASKS) as boolean;

	const onSetupButtonPress = async (): Promise<void> => {
		setLoading(true);
		logAnalyticEvent(events.equipmentScreen.equipmentScreen.firstSetup, {});
		try {
			await updateUserStatus();
		} catch (e) {
			setLoading(false);
		}
	};

	const onAddNozzle = (): void => navigation.navigate("EquipmentEditScreen");
	const onEditNozzle = (nozzle: nozzleType): void =>
		navigation.navigate("EquipmentEditScreen", { nozzle, lastNozzle: nozzles.length === 1 });

	const onGoback = (): void => navigation.pop();

	const onPressAdvancedConf = (): void => {
		navigation.navigate("EquipmentAdvancedScreen" as never);
	};

	const setupCompleted = hasTasks ? nozzles?.length > 0 && !!user?.equipments?.soil : !!user?.equipments?.soil;

	return (
		<EquipmentScreen
			setupCompleted={setupCompleted}
			onPressAdvancedConf={onPressAdvancedConf}
			firstSetup={status === UserStatusEnum.NEED_EQUIPMENT}
			onSetupButtonPress={onSetupButtonPress}
			nozzles={nozzles}
			onGoBack={onGoback}
			onAddNozzle={onAddNozzle}
			loading={loading}
			onEditNozzle={onEditNozzle}
			logout={logout}
		/>
	);
};

export default EquipmentContainer;
