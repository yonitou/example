import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { ModalsContext } from "@Context/ModalContext";
import { globalConditionType } from "@Types/condition.types";
import { UserContext } from "@Context/UserContext";
import Analytics from "@Analytics";
import { metricsType } from "@Types/meteo.types";
import useSelectedProducts from "@Hooks/useSelectedProducts";
import { getMixtureById } from "@Api/hygoApi";
import { mixtureType } from "@Types/mixture.types";
import { addDays, addHours, getStartOfDayAsJSDate, getTodayDateAsJSDate } from "@Utils/time";
import { useIsFocused } from "@react-navigation/native";
import MixtureConditionsScreen from "./MixtureConditionsScreen";
import { MixtureConditionsContainerProps } from "./screen.types";

const MixtureConditionsContainer = ({ navigation, route }: MixtureConditionsContainerProps): JSX.Element => {
	const { mixtureId, defaultDay } = route?.params ?? null;
	const { events, logAnalyticEvent } = Analytics;
	const isFocused = useIsFocused();
	const { defaultFarm, products, targets } = useContext(UserContext);
	const [selectedDay, setSelectedDay] = useState<string>(defaultDay || getTodayDateAsJSDate().toISOString());
	const [selectedTime, setSelectedTime] = useState<number>(new Date().getHours());
	const [loading, setLoading] = useState<boolean>(true);
	const [mixture, setMixture] = useState<mixtureType>();
	const { tankIndications } = useSelectedProducts({
		initialProducts: mixture?.selectedProducts,
		initialTargets: mixture?.selectedTargets,
	});
	const { setParamsHelperModalProps } = useContext(ModalsContext);
	const { meteo } = useContext(UserContext);

	const weeklyConditions = useMemo(
		() =>
			_(mixture?.conditions)
				?.groupBy((m) => {
					const d = new Date(m.timestamp);

					d.setHours(0, 0, 0, 0);
					return d.toISOString();
				})
				.values()
				.sortBy((m) => new Date(m[0].timestamp).getTime())
				.map((hours) => _.sortBy(hours, (h) => new Date(h.timestamp).getTime()).map((x) => x.globalCond))
				.value(),
		[mixture]
	);

	const conditionsOfTheSelectedDay = useMemo(
		() =>
			mixture?.conditions?.filter(
				(cond) => getStartOfDayAsJSDate(new Date(cond.timestamp)).toISOString() === selectedDay
			),
		[mixture, selectedDay]
	);

	const getMetricsOfTheSelectedSlot = useCallback(
		(slot: number): metricsType => {
			return meteo?.aggregationByHour?.find(
				(mod) => mod.timestamps.from === addHours(new Date(selectedDay), slot).toISOString()
			);
		},
		[meteo, selectedDay]
	);

	const metricsOfTheSelectedSlot = getMetricsOfTheSelectedSlot(selectedTime);

	const explicabilityKeys = useMemo(
		() =>
			(conditionsOfTheSelectedDay?.length > 0 ? Object.keys(conditionsOfTheSelectedDay?.[0]) : [])?.filter(
				(k: keyof globalConditionType) => k !== "globalCond" && k !== "timestamp"
			) as unknown as Array<keyof globalConditionType>,
		[conditionsOfTheSelectedDay]
	);

	const onValuesChange = (values: number[]): void => {
		if (values[0] > mixture.conditions.length - 1) return;
		values[0] === 24 ? setSelectedTime(23) : setSelectedTime(values[0]);
	};

	const showParamsModal = (): void => {
		setParamsHelperModalProps({
			visibility: true,
			props: {
				explicabilityKeys,
			},
		});
	};

	const onTabChange = (i: number): void => {
		const newDate = addDays(getTodayDateAsJSDate(), i);
		setSelectedTime(0);
		setSelectedDay(newDate.toISOString());
	};

	const onPressUpdate = (): void => {
		logAnalyticEvent(events.mixtureConditionsScreen.clickUpdateProductsMixture, { mixture });
		navigation.navigate("MixtureScreen", { mixtureId });
	};

	const onNavBack = (): void => navigation.goBack();

	useEffect(() => {
		const fetchMixture = async (): Promise<void> => {
			setLoading(true);
			const fetchedMixture = await getMixtureById({ farmId: defaultFarm.id, id: mixtureId });
			setMixture(fetchedMixture);
			setLoading(false);
		};
		if (mixtureId && isFocused) fetchMixture();
	}, [mixtureId, defaultFarm, products, targets, isFocused]);

	return (
		<MixtureConditionsScreen
			onNavBack={onNavBack}
			weeklyConditions={weeklyConditions}
			conditions={conditionsOfTheSelectedDay}
			tankIndications={tankIndications}
			explicabilityKeys={explicabilityKeys}
			onPressHelp={showParamsModal}
			loading={loading}
			onTabChange={onTabChange}
			onValuesChange={onValuesChange}
			selectedDay={selectedDay}
			productFamily={mixture?.productFamily}
			selectedTime={selectedTime}
			metricsOfTheSelectedSlot={metricsOfTheSelectedSlot}
			onPressUpdate={onPressUpdate}
		/>
	);
};

export default MixtureConditionsContainer;
