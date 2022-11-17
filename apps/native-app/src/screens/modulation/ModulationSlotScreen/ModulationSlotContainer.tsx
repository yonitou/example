import { useContext, useEffect, useState } from "react";
import Analytics from "@Analytics";
import { addDays, getStartOfDayAsJSDate, getTodayDateAsJSDate } from "@Utils/time";
import { ModulationContext } from "@Context/ModulationContext";
import { slotType } from "@Types/task.types";
import { conditionEnum } from "@Types/condition.types";
import useSelectedProducts from "@Hooks/useSelectedProducts";
import ModulationSlotScreen from "./ModulationSlotScreen";
import { ModulationSlotContainerProps } from "./screen.types";

const ModulationSlotContainer = ({ navigation, route }: ModulationSlotContainerProps): JSX.Element => {
	const {
		selectedDay,
		selectedSlot,
		selectedProducts,
		modulationParams,
		setSelectedDay,
		setSelectedSlot,
		modulationStatus,
		conditions,
		conditionsOfTheSelectedDay,
		modulationOfTheSelectedDay,
		modulationData,
		getDataOverSlot,
		slotSize,
		modulationError,
		selectedTargets,
	} = useContext(ModulationContext);
	const { tankIndications } = useSelectedProducts({
		initialProducts: selectedProducts,
		initialTargets: selectedTargets,
	});

	const [slot, setSlot] = useState<slotType>(selectedSlot);

	const { conditionsOfTheSelectedSlot, modulationOfTheSelectedSlot, metricsOfTheSelectedSlot } =
		getDataOverSlot(slot);

	const fromReportScreen: boolean = route.params?.fromReportScreen ?? false;

	useEffect(() => {
		const selectBestSlotOfTheDay = (): void => {
			if (!modulationStatus) return;
			const conditionsList = Object.values(conditionEnum);
			const modulationsOfTheDay = modulationData
				?.filter(
					(mod) => getStartOfDayAsJSDate(new Date(mod.timestamp)).toISOString() === selectedDay.toISOString()
				)
				?.map((mod, i) => {
					// We are looking for values between 4am and the last slot available within this slot size
					return i >= 4 && i < 24 - slotSize
						? // We are converting the condition into a number in order to use Math.max
						  { mod: mod.modulationOverSlot, cond: conditionsList.indexOf(mod.conditionOverSlot) }
						: null;
				});

			// If we don't find a positive modulation value, we look for conditions
			const bestSlotOfTheDay =
				Math.max(...(modulationsOfTheDay.map((i) => i?.mod ?? null) as number[])) ||
				Math.max(...(modulationsOfTheDay.map((i) => i?.cond ?? null) as number[]));

			const indexOfMaxMod = modulationsOfTheDay.findIndex((item) => item?.mod === bestSlotOfTheDay);
			const indexOfMaxCond = modulationsOfTheDay.findIndex((item) => item?.cond === bestSlotOfTheDay);

			let min = 4;
			if (bestSlotOfTheDay && (indexOfMaxMod > 0 || indexOfMaxCond > 0))
				min = indexOfMaxMod > 0 ? indexOfMaxMod : indexOfMaxCond;

			const max = min + slotSize;

			setSlot({ min, max });
		};
		if (!fromReportScreen) selectBestSlotOfTheDay();
	}, [fromReportScreen, modulationData, slotSize, modulationStatus, selectedDay]);

	const onTabChange = (i: number): void => {
		const newDate = addDays(getTodayDateAsJSDate(), i);
		setSlot({ min: 0, max: slotSize });
		setSelectedDay(newDate);
	};

	const modulationDisabled = selectedProducts.every((p) => !p.modulationActive);

	// Save report silently when leaving the screen
	const onNavBack = async (): Promise<void> => {
		if (fromReportScreen) navigation.navigate("ComingTaskReportScreen");
		else navigation.goBack();
	};

	const onNavClose = async (): Promise<void> => {
		navigation.navigate("Tabs", { screen: "HomeScreen" });
	};
	const onNavNext = async (): Promise<void> => {
		const { logAnalyticEvent, events } = Analytics;
		setSelectedSlot(slot);
		logAnalyticEvent(events.modulation.modulationSlotScreen.validateSlot, {
			...modulationParams,
			selectedSlot: slot,
		});
		navigation.navigate("ComingTaskReportScreen", {
			fromModulation: true,
		});
	};

	const onValuesChange = (values: number[]): void => {
		const availableConditions = conditionsOfTheSelectedDay?.filter((n) => !Number.isNaN(n));
		if (availableConditions?.length && values[0] > availableConditions.length - 1) return;
		setSlot({
			min: values[0],
			max: values[0] + slotSize,
		});
	};

	return (
		<ModulationSlotScreen
			loading={!modulationStatus && !modulationError}
			onValuesChange={onValuesChange}
			onNavBack={onNavBack}
			onNavClose={onNavClose}
			slotSize={slotSize}
			onNavNext={onNavNext}
			modulationDisabled={modulationDisabled}
			onTabChange={onTabChange}
			metricsOfTheSelectedSlot={metricsOfTheSelectedSlot}
			modulationStatus={modulationStatus}
			tankIndications={tankIndications}
			modulationError={modulationError}
			modulationOfTheSelectedSlot={modulationOfTheSelectedSlot}
			conditionsOfTheSelectedSlot={conditionsOfTheSelectedSlot}
			slot={slot}
			modulationOfTheSelectedDay={modulationOfTheSelectedDay}
			conditionsOfTheSelectedDay={conditionsOfTheSelectedDay}
			conditions={conditions}
			selectedDay={selectedDay.toISOString()}
		/>
	);
};

export default ModulationSlotContainer;
