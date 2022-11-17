import { useCallback, useContext, useEffect, useState } from "react";
import { getRealtimeData, realTimeType } from "@Api/hygoApi";
import { useTranslation } from "react-i18next";
import { useIsFocused } from "@react-navigation/native";
import { realTimeDataType } from "@Types/realtimescreen.types";
import { UserContext } from "@Context/UserContext";
import { SnackbarContext, SnackTypeEnum } from "@Context/SnackBarContext";
import RealTimeScreen from "./RealTimeScreen";
import { RealTimeContainerProps } from "./screen.types";

const RealTimeContainer = ({ navigation, route }: RealTimeContainerProps): JSX.Element => {
	const { t } = useTranslation();
	const { devices, fields } = useContext(UserContext);
	const { showSnackbar } = useContext(SnackbarContext);
	const deviceIdParam = route?.params?.deviceId;

	const [loading, setLoading] = useState(true);
	const [selectedDeviceId, setSelectedDeviceId] = useState<number>(deviceIdParam || devices?.[0]?.id);
	const [realTimeData, setRealTimeData] = useState<realTimeDataType[]>([]);
	const [lastRealTimeData, setLastRealTimeData] = useState<realTimeDataType>();
	const isFocused = useIsFocused();

	const loadRealtimeData = useCallback(async () => {
		try {
			setLoading(true);
			const fetchedRealTimeData: realTimeType = (await getRealtimeData(selectedDeviceId)) || ({} as realTimeType);
			const realTimeDataToArray: realTimeDataType[] = fetchedRealTimeData?.histo?.map(
				({ humi, temp, timestamp }) => ({
					humi,
					temp,
					timestamp,
					windSpeed: fetchedRealTimeData?.windSpeed,
					position: fetchedRealTimeData?.position,
				})
			);
			setRealTimeData(realTimeDataToArray);
			setLastRealTimeData(realTimeDataToArray.length > 0 && realTimeDataToArray[realTimeDataToArray.length - 1]);
		} catch (e) {
			showSnackbar(t("common.snackbar.realtime.error"), SnackTypeEnum.ERROR);
		} finally {
			setLoading(false);
		}
	}, [showSnackbar, t, selectedDeviceId]);

	const onUpdateDevice = (deviceId: number): void => setSelectedDeviceId(deviceId);

	useEffect(() => {
		if (isFocused && selectedDeviceId) loadRealtimeData();
	}, [isFocused, loadRealtimeData, selectedDeviceId]);

	const onNavBack = (): void => navigation.goBack();

	return (
		<RealTimeScreen
			loading={loading}
			onRefresh={loadRealtimeData}
			realTimeData={realTimeData}
			lastRealTimeData={lastRealTimeData}
			onUpdateDevice={onUpdateDevice}
			selectedDeviceId={selectedDeviceId}
			onNavBack={onNavBack}
			fields={fields}
		/>
	);
};

export default RealTimeContainer;
