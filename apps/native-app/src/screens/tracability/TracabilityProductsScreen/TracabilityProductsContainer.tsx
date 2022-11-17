import { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { activeProductType } from "@Types/activeProduct.types";
import { ModalsContext } from "@Context/ModalContext";
import useSelectedProducts from "@Hooks/useSelectedProducts";
import { doneTaskType, taskTypeEnum } from "@Types/task.types";
import Analytics from "@Analytics";
import COLORS from "@Constants/palette";
import { nozzleType } from "@Types/nozzle.types";
import useTask from "@Hooks/useTask";
import { TracabilityProductsContainerProps } from "./screen.types";
import TracabilityProductsScreen from "./TracabilityProductsScreen";

const TracabilityProductsContainer = ({ navigation, route }: TracabilityProductsContainerProps): JSX.Element => {
	const { t } = useTranslation();
	const { logAnalyticEvent, events } = Analytics;
	const fromReportScreen = route?.params?.fromReportScreen ?? false;
	const targetsModalOpened: boolean = route?.params?.targetsModalOpened;
	const { setConfirmationModalProps } = useContext(ModalsContext);
	const [activeModulation, setActiveModulation] = useState<boolean>();
	const [task, setTask] = useState<doneTaskType>();
	const {
		products,
		selectedProducts,
		addProduct,
		removeProduct,
		onNavBack,
		onNavClose,
		onNavNext,
		tankIndications,
		selectedTargets,
		setSelectedTargets,
	} = useSelectedProducts({
		navigation,
		fromReportScreen,
		initialProducts: task?.selectedProducts,
		initialTargets: task?.selectedTargets,
		type: taskTypeEnum.DONE,
		debit: task?.debit,
	});

	const { onRequestEditNozzle, onRequestEditDebit } = useTask({
		navigation,
		type: taskTypeEnum.DONE,
		task,
		onChangeNozzle: (nozzle: nozzleType) => setTask((prev) => ({ ...prev, nozzle })),
		onChangeDebit: (debit: number): void => setTask((prev) => ({ ...prev, debit })),
	});

	const onSubmit = (): void => {
		const taskParam = activeModulation
			? task
			: {
					...task,
					modulation: 0,
					selectedProducts: task.selectedProducts.map((p) => ({
						...p,
						modulation: 0,
						modulationActive: false,
					})),
			  };
		logAnalyticEvent(events.tracability.tracabilityAndDoneTaskScreen.validateProducts, {
			...taskParam,
		});
		onNavNext(taskParam);
	};

	const showModulationWarning = (callback: () => void): void => {
		if (activeModulation) {
			setConfirmationModalProps({
				visibility: true,

				props: {
					handleConfirm: () => setActiveModulation(false),
					confirmLabel: t("common.button.confirm"),
					dismissLabel: t("common.button.cancel"),
					btnColorPalette: COLORS.LAKE,
					body: t("modals.tracabilityModulationWarning.description"),
				},
			});
			return;
		}
		logAnalyticEvent(events.tracability.tracabilityAndDoneTaskScreen.updateProducts, {
			...task,
		});
		callback();
	};

	const addProductInterceptor = (item: activeProductType): void => {
		showModulationWarning(() => addProduct(item));
	};

	const removeProductInterceptor = (item: activeProductType): void => {
		showModulationWarning(() => removeProduct(item));
	};

	const updateNozzleInterceptor = (): void => {
		showModulationWarning(() => onRequestEditNozzle(events.tracability.tracabilityAndDoneTaskScreen.updateNozzle));
	};

	const updateDebitInterceptor = (): void => {
		showModulationWarning(() => onRequestEditDebit(events.tracability.tracabilityAndDoneTaskScreen.updateDebit));
	};

	useEffect(() => {
		setTask((prev) => ({ ...prev, selectedProducts, selectedTargets }));
	}, [selectedProducts, selectedTargets]);

	useEffect(() => {
		if (route?.params) {
			setActiveModulation(route?.params?.task?.modulation > 0 ?? false);
			setTask(route?.params?.task);
		}
	}, [route]);

	return (
		<TracabilityProductsScreen
			products={products}
			targetsModalOpened={targetsModalOpened}
			selectedProducts={selectedProducts}
			tankIndications={tankIndications}
			onSelectTargets={setSelectedTargets}
			addProduct={addProductInterceptor}
			removeProduct={removeProductInterceptor}
			modulation={task?.modulation}
			activeModulation={activeModulation}
			onNavBack={onNavBack}
			onNavClose={onNavClose}
			onNavNext={onSubmit}
			handleDebitClick={updateDebitInterceptor}
			selectedTargets={selectedTargets}
			handleNozzleClick={updateNozzleInterceptor}
			nozzle={task?.nozzle}
			debit={task?.debit}
		/>
	);
};

export default TracabilityProductsContainer;
