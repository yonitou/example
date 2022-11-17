import { useCallback, useContext, useEffect, useState } from "react";
import { useFeature } from "flagged";
import { useTranslation } from "react-i18next";
import { doneTaskType } from "@Types/task.types";
import { AuthContext } from "@Context/AuthContext";
import { deleteDoneTask, getDoneTasks, markDoneTasksAsRead } from "@Api/hygoApi";
import { SnackbarContext, SnackTypeEnum } from "@Context/SnackBarContext";
import { UserContext } from "@Context/UserContext";
import { substractDays } from "@Utils/time";
import { featuresEnum } from "@Types/feature.types";
import { CreateDoneTaskContainerProps } from "./screen.types";
import CreateDoneTaskScreen from "./CreateDoneTaskScreen";

const CreateDoneTaskContainer = ({ navigation, route }: CreateDoneTaskContainerProps): JSX.Element => {
	const { t } = useTranslation();
	const [tasks, setTasks] = useState<doneTaskType[]>([]);
	const [openedAccordion, setOpenedAccordion] = useState<number>(route?.params?.openedAccordion);
	const hasTracability = useFeature(featuresEnum.TRACABILITY);

	const [loading, setLoading] = useState<boolean>(false);
	const { defaultFarm, nozzles } = useContext(UserContext);
	const { showSnackbar } = useContext(SnackbarContext);
	const { user } = useContext(AuthContext);

	const onBackPress = async (): Promise<void> => {
		try {
			await handleUnreadTasks();
		} finally {
			navigation.goBack();
		}
	};

	const onOpenAccordion = (key: number): void => {
		setOpenedAccordion(key);
	};

	const onDeleteDoneTask = async (taskId: number): Promise<void> => {
		try {
			await deleteDoneTask(taskId, defaultFarm.id);
			await loadTasks();
		} catch (e) {
			showSnackbar(t("common.snackbar.doneTaskDeletion.error"), SnackTypeEnum.ERROR);
		}
	};

	const onSubmit = async (taskToCheck: doneTaskType): Promise<void> => {
		await handleUnreadTasks();
		const defaultNozzle = nozzles.find((n) => n.id === user?.configuration?.defaultNozzleId);
		navigation.navigate("TracabilityFieldsScreen", {
			task: { ...taskToCheck, debit: user?.equipments?.debit, nozzle: defaultNozzle },
		});
	};

	const loadTasks = useCallback(async (): Promise<void> => {
		try {
			setLoading(true);
			const fetchedTasks: doneTaskType[] = await getDoneTasks({
				farmId: defaultFarm.id,
				startedBefore: new Date(),
				startedAfter: substractDays(new Date(), 15),
			});
			setTasks(
				fetchedTasks
					?.filter((task) => task?.needCheck)
					?.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
			);
		} catch (e) {
			showSnackbar(t("common.snackbar.loadDetectedTasks.error"), SnackTypeEnum.ERROR);
		} finally {
			setLoading(false);
		}
	}, [defaultFarm, showSnackbar, t]);

	const handleUnreadTasks = async (): Promise<void> => {
		const unreadTasksIds = tasks?.filter((task) => !task.read)?.map((task) => task.id);
		if (unreadTasksIds?.length > 0) await markDoneTasksAsRead(defaultFarm.id, unreadTasksIds);
	};

	useEffect(() => {
		hasTracability && loadTasks();
	}, [loadTasks, hasTracability]);

	return (
		<CreateDoneTaskScreen
			onBackPress={onBackPress}
			hasTracability={!!hasTracability}
			loading={loading}
			tasks={tasks}
			onSubmit={onSubmit}
			openedAccordion={openedAccordion}
			onDeleteDoneTask={onDeleteDoneTask}
			onOpenAccordion={onOpenAccordion}
		/>
	);
};

export default CreateDoneTaskContainer;
