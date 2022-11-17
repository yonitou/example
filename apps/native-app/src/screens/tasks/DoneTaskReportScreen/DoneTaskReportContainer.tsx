import { useContext, useEffect, useRef, useState } from "react";
import { Keyboard, NativeScrollEvent } from "react-native";
import { doneTaskType, taskTypeEnum } from "@Types/task.types";
import { fromDateToISO, formatTimestampAsTitle } from "@Utils/time";
import useTask from "@Hooks/useTask";
import { getDoneTask } from "@Api/hygoApi";
import { UserContext } from "@Context/UserContext";
import { convertToLPerHa } from "@Utils/quantityConverters";
import { nozzleType } from "@Types/nozzle.types";
import useSelectedProducts from "@Hooks/useSelectedProducts";
import Analytics from "@Analytics";
import { DoneTaskReportContainerProps } from "./screen.types";
import DoneTaskReportScreen from "./DoneTaskReportScreen";

const DoneTaskReportContainer = ({ navigation, route }: DoneTaskReportContainerProps): JSX.Element => {
	const { events } = Analytics;
	const [task, setTask] = useState<doneTaskType>();
	const [loading, setLoading] = useState<boolean>(true);
	const { defaultFarm } = useContext(UserContext);
	const [offset, setOffset] = useState<number>(0);
	const scrollRef = useRef();

	const onChangeNozzle = (nozzle: nozzleType): void => setTask((prev) => ({ ...prev, nozzle }));
	const onChangeDebit = (debit: number): void => setTask((prev) => ({ ...prev, debit }));
	const { tankIndications } = useSelectedProducts({
		initialProducts: task?.selectedProducts,
		initialTargets: task?.selectedTargets,
	});

	const {
		onRequestEditNozzle,
		onRequestEditDebit,
		saveReport,
		goToFields,
		goToTargets,
		goToProducts,
		goNavBack,
		goNavCloseAndDelete,
		goNavClose,
		volume,
		totalArea,
		submitting,
	} = useTask({
		navigation,
		type: taskTypeEnum.DONE,
		task,
		onChangeNozzle,
		onChangeDebit,
	});

	const products = task?.selectedProducts?.map((product) => {
		const reducedDose = (product.dose * (100 - product.modulation)) / 100;
		return {
			...product,
			reducedDose,
			reducedQuantity: (convertToLPerHa(reducedDose, product.unit) * totalArea) / 10000,
		};
	});

	const onScrollBeginDrag = ({ nativeEvent }: { nativeEvent: NativeScrollEvent }): void => {
		const currentOffset = nativeEvent.contentOffset.y;
		const direction = currentOffset >= offset ? "down" : "up";
		setOffset(currentOffset);
		direction === "up" && Keyboard.dismiss();
	};

	const handleNotesChange = (value: string): void => setTask((prev) => ({ ...prev, notes: value }));

	const onClickNozzle = (): void => onRequestEditNozzle(events.tracability.tracabilityAndDoneTaskScreen.editNozzle);

	const onClickDebit = (): void => onRequestEditDebit(events.tracability.tracabilityAndDoneTaskScreen.editDebit);

	useEffect(() => {
		const fetchTask = async (): Promise<void> => {
			try {
				setLoading(true);
				const fetchedTask = route?.params?.task
					? { ...route?.params?.task, productFamily: undefined }
					: await getDoneTask(defaultFarm.id, route?.params?.taskId);
				setTask(fetchedTask);
			} finally {
				setLoading(false);
			}
		};
		fetchTask();
	}, [defaultFarm, route?.params]);

	return (
		<DoneTaskReportScreen
			saveReport={saveReport}
			goNavBack={goNavBack}
			submitting={submitting}
			tankIndications={tankIndications}
			goToProducts={goToProducts}
			selectedDay={formatTimestampAsTitle(fromDateToISO(task?.startTime))}
			volume={volume}
			debit={task?.debit}
			loading={loading}
			selectedProducts={products}
			taskId={task?.id}
			selectedFields={task?.selectedFields}
			goNavClose={goNavClose}
			goNavCloseAndDelete={goNavCloseAndDelete}
			selectedSlot={task?.selectedSlot}
			startTime={task?.startTime}
			endTime={task?.endTime}
			condition={task?.condition}
			onScrollBeginDrag={onScrollBeginDrag}
			scrollRef={scrollRef}
			selectedTargets={task?.selectedTargets}
			metricsOfTheSelectedSlot={task?.metricsOfTheSelectedSlot}
			goToFields={goToFields}
			goToTargets={goToTargets}
			totalArea={totalArea}
			nozzle={task?.nozzle}
			modulation={task?.modulation}
			notes={task?.notes}
			productFamily={task?.productFamily}
			setNotes={handleNotesChange}
			onRequestEditDebit={onClickDebit}
			onRequestEditNozzle={onClickNozzle}
		/>
	);
};

export default DoneTaskReportContainer;
