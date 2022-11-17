import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { fromDateToISO, formatTimestampAsTitle } from "@Utils/time";
import { ModulationContext } from "@Context/ModulationContext";
import { comingTaskType, taskTypeEnum } from "@Types/task.types";

import useTask from "@Hooks/useTask";
import { Keyboard, NativeScrollEvent } from "react-native";
import { convertToLPerHa } from "@Utils/quantityConverters";
import Analytics from "@Analytics";
import { activeProductType } from "@Types/activeProduct.types";
import { nozzleType } from "@Types/nozzle.types";
import useSelectedProducts from "@Hooks/useSelectedProducts";
import { ComingTaskReportContainerProps } from "./screen.types";
import ComingTaskReportScreen from "./ComingTaskReportScreen";

const ComingTaskReportContainer = ({ navigation, route }: ComingTaskReportContainerProps): JSX.Element => {
	const { logAnalyticEvent, events } = Analytics;
	const initModulation: comingTaskType = route.params?.initModulation;
	const fromModulation = route.params?.fromModulation ?? false;
	const [offset, setOffset] = useState<number>(0);
	const scrollRef = useRef();
	const onChangeNozzle = (nozzle: nozzleType): void => setNozzle(nozzle);
	const onChangeDebit = (debit: number): void => setDebit(debit);
	const {
		selectedProducts,
		selectedDay,
		selectedTargets,
		getDataOverSlot,
		selectedSlot,
		selectedFields,
		setSelectedProducts,
		notes,
		setNotes,
		initState,
		setNozzle,
		setDebit,
		modulationParams,
		taskId,
		nozzle,
		debit,
	} = useContext(ModulationContext);
	const { tankIndications } = useSelectedProducts({
		initialProducts: initModulation?.selectedProducts || modulationParams?.selectedProducts,
		initialTargets: initModulation?.selectedTargets || modulationParams?.selectedTargets,
	});

	const {
		onRequestEditNozzle,
		onRequestEditDebit,
		saveReport,
		goToFields,
		goToProducts,
		submitting,
		goNavBack,
		goNavCloseAndDelete,
		goNavClose,
		volume,
		totalArea,
		goToTargets,
	} = useTask({
		navigation,
		fromModulation,
		type: taskTypeEnum.COMING,
		task: initModulation || modulationParams,
		onChangeNozzle,
		onChangeDebit,
	});
	const {
		metricsOfTheSelectedSlot,
		conditionsOfTheSelectedSlot,
		modulationOfTheSelectedSlot,
		modulationByProductOverSlot,
	} = getDataOverSlot();

	const onScrollBeginDrag = ({ nativeEvent }: { nativeEvent: NativeScrollEvent }): void => {
		const currentOffset = nativeEvent.contentOffset.y;
		const direction = currentOffset >= offset ? "down" : "up";
		setOffset(currentOffset);
		direction === "up" && Keyboard.dismiss();
	};

	const products = selectedProducts.map((product) => {
		const productModulation = modulationByProductOverSlot
			? modulationByProductOverSlot?.find((mod) => mod.productId === product.id)?.modulation
			: product.modulation;
		const reducedDose = (product.dose * (100 - productModulation)) / 100;
		return {
			...product,
			modulation: productModulation,
			reducedDose,
			reducedQuantity: (convertToLPerHa(reducedDose, product.unit) * totalArea) / 10000,
		};
	});

	const goToSlots = (): void => {
		logAnalyticEvent(events.modulation.comingTaskReportScreen.editSlot, {});
		navigation.replace("ModulationSlotScreen", {
			fromReportScreen: true,
		});
	};

	const updateProducts = (prods: activeProductType[]): void => {
		logAnalyticEvent(events.modulation.comingTaskReportScreen.editModulation, {});
		setSelectedProducts(prods);
	};

	const loading = useMemo(
		() =>
			selectedFields.length === 0 ||
			selectedProducts.length === 0 ||
			modulationOfTheSelectedSlot === undefined ||
			!conditionsOfTheSelectedSlot,
		[selectedFields, selectedProducts, modulationOfTheSelectedSlot, conditionsOfTheSelectedSlot]
	);

	const onClickNozzle = (): void => onRequestEditNozzle(events.modulation.comingTaskReportScreen.editNozzle);

	const onClickDebit = (): void => onRequestEditDebit(events.modulation.comingTaskReportScreen.editDebit);

	useEffect(() => {
		initState(initModulation);
	}, [initState, initModulation]);

	return (
		<ComingTaskReportScreen
			loading={loading}
			goNavBack={goNavBack}
			goNavClose={goNavClose}
			saveReport={saveReport}
			goToProducts={goToProducts}
			goToTargets={goToTargets}
			selectedTargets={selectedTargets}
			goToFields={goToFields}
			tankIndications={tankIndications}
			submitting={submitting}
			goToSlots={goToSlots}
			onScrollBeginDrag={onScrollBeginDrag}
			scrollRef={scrollRef}
			updateProducts={updateProducts}
			selectedDay={formatTimestampAsTitle(fromDateToISO(selectedDay))}
			modulationOfTheSelectedSlot={modulationOfTheSelectedSlot}
			conditionsOfTheSelectedSlot={conditionsOfTheSelectedSlot}
			volume={volume}
			debit={debit}
			selectedProducts={products}
			selectedFields={selectedFields}
			goNavCloseAndDelete={goNavCloseAndDelete}
			selectedSlot={selectedSlot}
			totalArea={totalArea}
			taskId={taskId}
			nozzle={nozzle}
			notes={notes}
			setNotes={setNotes}
			onRequestEditDebit={onClickDebit}
			onRequestEditNozzle={onClickNozzle}
			metricsOfTheSelectedSlot={metricsOfTheSelectedSlot}
			productFamily={initModulation?.productFamily}
		/>
	);
};

export default ComingTaskReportContainer;
