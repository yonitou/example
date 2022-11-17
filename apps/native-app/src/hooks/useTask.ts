import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import {
	createDoneTask,
	deleteComingTask,
	deleteDoneTask,
	getNozzle,
	patchDoneTask,
	setDefaultNozzle,
} from "@Api/hygoApi";
import { AuthContext } from "@Context/AuthContext";
import { ModalsContext } from "@Context/ModalContext";
import { SnackbarContext, SnackTypeEnum } from "@Context/SnackBarContext";
import { UserContext } from "@Context/UserContext";

import { doneTaskType, taskTypeEnum } from "@Types/task.types";

import Analytics, { analyticsEventEnum } from "@Analytics";
import { ModulationContext } from "@Context/ModulationContext";
import { nozzleType } from "@Types/nozzle.types";
import { ModulationInfosType } from "@Types/modulation.types";
import { productUnitEnum } from "@Types/activeProduct.types";
import COLORS from "@Constants/palette";

interface useTaskProps {
	navigation: NativeStackNavigationProp<ParamListBase>;
	fromModulation?: boolean;
	task: ModulationInfosType | doneTaskType;
	type: taskTypeEnum;
	onChangeNozzle: (nozz: nozzleType) => void;
	onChangeDebit: (deb: number) => void;
}

interface useTaskResult {
	onRequestEditNozzle: (event: analyticsEventEnum) => void;
	onRequestEditDebit: (event: analyticsEventEnum) => void;
	saveReport: () => void;
	goToFields: () => void;
	goToProducts: () => void;
	goToTargets: () => void;
	goNavBack: () => void;
	goNavCloseAndDelete: () => void;
	goNavClose: () => void;
	submitting: boolean;
	volume: number;
	totalArea: number;
}

const useTask = ({
	navigation,
	fromModulation,
	task,
	type,
	onChangeNozzle,
	onChangeDebit,
}: useTaskProps): useTaskResult => {
	const { t } = useTranslation();
	const { logAnalyticEvent, events } = Analytics;
	const { setConfirmationModalProps, setDebitInputModalProps, setNozzleModalProps } = useContext(ModalsContext);

	const { fetchUser } = useContext(AuthContext);
	const { defaultFarm, fetchNozzles } = useContext(UserContext);
	const { saveContext } = useContext(ModulationContext);
	const { showSnackbar } = useContext(SnackbarContext);
	const isDoneTask = type === taskTypeEnum.DONE;
	const [submitting, setSubmitting] = useState<boolean>(false);

	const totalArea = task?.selectedFields?.reduce((r, f) => r + f.area, 0);
	const volume: number = (totalArea / 10000) * (task?.debit || 0);

	const goNavBack = (): void => {
		if (fromModulation || isDoneTask) {
			navigation.goBack();
		} else {
			navigation.navigate("Tabs");
		}
	};

	const goNavCloseAndDelete = (): void => {
		setConfirmationModalProps({
			visibility: true,
			props: {
				handleConfirm: async () => {
					try {
						isDoneTask
							? await deleteDoneTask(task.id, defaultFarm.id)
							: await deleteComingTask(task.id, defaultFarm.id);
						navigation.navigate("Tabs");
						showSnackbar(t("common.snackbar.deleteTask.success"), SnackTypeEnum.OK);
					} catch (e) {
						showSnackbar(t("common.snackbar.deleteTask.error"), SnackTypeEnum.ERROR);
					}
				},
				title: t("modals.deleteTask.title"),
				confirmLabel: t("common.button.yes"),
				dismissLabel: t("common.button.no"),
				btnColorPalette: COLORS.GASPACHO,
			},
		});
	};
	const goToProducts = (): void => {
		!isDoneTask &&
			logAnalyticEvent(events.modulation.comingTaskReportScreen.editProducts, {
				...task,
			});
		isDoneTask
			? navigation.navigate("TracabilityProductsScreen", { task, fromReportScreen: true })
			: navigation.replace("ModulationProductsScreen", {
					fromReportScreen: true,
			  });
	};

	const goToTargets = (): void => {
		!isDoneTask &&
			logAnalyticEvent(events.modulation.comingTaskReportScreen.editTargets, {
				...task,
			});
		isDoneTask
			? navigation.navigate("TracabilityProductsScreen", {
					task,
					fromReportScreen: true,
					targetsModalOpened: true,
			  })
			: navigation.replace("ModulationProductsScreen", {
					targetsModalOpened: true,
					fromReportScreen: true,
			  });
	};

	const goToFields = (): void => {
		!isDoneTask &&
			logAnalyticEvent(events.modulation.comingTaskReportScreen.editFields, {
				...task,
			});
		isDoneTask
			? navigation.navigate("TracabilityFieldsScreen", { task, fromReportScreen: true })
			: navigation.replace("ModulationFieldsScreen", {
					fromReportScreen: true,
			  });
	};

	const saveComingTask = async (): Promise<void> => {
		await saveContext();
		logAnalyticEvent(events.modulation.comingTaskReportScreen.saveReport, {
			...task,
		});

		navigation.navigate("Tasks", { screen: "ComingTasksScreen" });
	};

	const goNavClose = (): void => {
		setConfirmationModalProps({
			visibility: true,

			props: {
				handleConfirm: () => navigation.navigate("Tabs", { screen: "HomeScreen" }),
				title: t("modals.leaveTask.title"),
				confirmLabel: t("common.button.yes"),
				dismissLabel: t("common.button.no"),
				btnColorPalette: COLORS.GASPACHO,
			},
		});
	};

	const saveDoneTask = async (): Promise<void> => {
		task.id
			? await patchDoneTask(task as doneTaskType, defaultFarm.id)
			: await createDoneTask(task as doneTaskType, defaultFarm.id);

		logAnalyticEvent(events.tracability.tracabilityAndDoneTaskScreen.saveReport, {
			...task,
		});

		navigation.navigate("Tabs", { screen: "DoneTasksScreen" });
	};
	const saveReport = async (): Promise<void> => {
		try {
			setSubmitting(true);
			isDoneTask ? await saveDoneTask() : await saveComingTask();
			showSnackbar(t("common.snackbar.saveTask.success"), SnackTypeEnum.OK);
		} catch (e) {
			setSubmitting(false);
			showSnackbar(t("common.snackbar.saveTask.error"), SnackTypeEnum.ERROR);
		}
	};
	const onRequestEditDebit = (event: analyticsEventEnum): void => {
		logAnalyticEvent(event, {
			...task,
		});
		setDebitInputModalProps({
			visibility: true,
			props: {
				defaultValue: task.debit,
				setInput: (value: number) => onChangeDebit(value),
				dosesSum: task?.selectedProducts
					.filter((p) => p.unit === productUnitEnum.LITER_PER_HA)
					.reduce((sum, { dose }) => sum + dose, 0),
			},
		});
	};

	const nozzleAddCallback = async (nozzleId: number): Promise<void> => {
		const defaultNozzle = await getNozzle(nozzleId);
		onChangeNozzle(defaultNozzle);
	};

	const onRequestEditNozzle = (event: analyticsEventEnum): void => {
		logAnalyticEvent(event, {
			...task,
		});
		setNozzleModalProps({
			visibility: true,
			props: {
				onPressAdd: () =>
					navigation.navigate("EquipmentEditScreen", {
						fromReport: true,
						nozzleAddCallback,
					}),
				onPressNozzle: async (value) => {
					await setDefaultNozzle(value.id);
					await fetchUser();
					await fetchNozzles();
					onChangeNozzle(value);
				},
			},
		});
	};

	return {
		onRequestEditNozzle,
		onRequestEditDebit,
		saveReport,
		goToFields,
		goToProducts,
		goNavBack,
		goNavClose,
		goToTargets,
		goNavCloseAndDelete,
		volume,
		submitting,
		totalArea,
	};
};

export default useTask;
