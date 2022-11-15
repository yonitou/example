import { exportSmagTasks, exportTasks, getDoneTasks } from "@Api/api";
import { AuthContext } from "@Context/AuthContext";
import { ModalsContext } from "@Context/ModalContext";
import { OADContext, smagStepEnum } from "@Context/OADContext";
import { SnackbarContext, snackbarTypeEnum } from "@Context/SnackbarContext";
import { UserContext } from "@Context/UserContext";
import { useSeasons } from "@Hook/useSeasons";
import { doneTaskType } from "@Types/task.types";
import { tasksObjectToSortedArray } from "@Utils/dateObjectTransformation";
import { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Tasks from "./Tasks";

const TasksContainer = (): JSX.Element => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { admin, farmerSelected } = useContext(AuthContext);
	const { farms, defaultFarm } = useContext(UserContext);
	const { smagOnboardingStep, setSmagStepCookie, loggedInSmag } = useContext(OADContext);
	const { setSmagOnboardingTasksModalProps } = useContext(ModalsContext);
	const { showSnackbar } = useContext(SnackbarContext);
	const { actualSeason, stepSeasons } = useSeasons();
	const [tasks, setTasks] = useState<{ title: string; data: doneTaskType[] }[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [csvExporting, setCsvExporting] = useState<boolean>(false);
	const [smagExporting, setSmagExporting] = useState<boolean>(false);
	const [selectedTasks, setSelectedTasks] = useState<number[]>();
	const [selectedSeason, setSelectedSeason] = useState(actualSeason);

	const exportableTasks = tasks
		?.map((taskGroup) => taskGroup?.data?.filter((task) => !task.smagStatus))
		?.flatMap((task) => task)
		?.map((task) => task.id);

	const goToDashboard = (): void => navigate("/");

	const onClickExport = async (): Promise<void> => {
		setCsvExporting(true);
		try {
			const data = await exportTasks(defaultFarm.id, selectedSeason);
			const url = window.URL.createObjectURL(new Blob([data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute(
				"download",
				`${defaultFarm.name}_${selectedSeason[0].getFullYear().toString().slice(-2)}-${selectedSeason[1]
					.getFullYear()
					.toString()
					.slice(-2)}.xlsx`
			);
			document.body.appendChild(link);
			link.click();
		} finally {
			setCsvExporting(false);
		}
	};

	const onClickSmagSelectExport = (): void => {
		setSelectedTasks([...exportableTasks]);
	};

	const updateSelectedTasks = (checked: boolean, taskId: number): void => {
		if (checked) {
			setSelectedTasks((prev) => prev?.filter((selectedTaskId) => selectedTaskId !== taskId));
		} else {
			setSelectedTasks((prev) => [...prev, taskId]);
		}
	};

	const onCancelSmagExport = (): void => {
		setSelectedTasks(null);
	};

	const loadTasks = useCallback(async (): Promise<void> => {
		setLoading(true);
		const fetchedTasks: doneTaskType[] = await getDoneTasks(defaultFarm.id, selectedSeason);

		const tasksGroupedByDate = tasksObjectToSortedArray(
			fetchedTasks.filter((fetchTask) => !fetchTask.needCheck) as doneTaskType[]
		);

		setTasks(tasksGroupedByDate as { title: string; data: doneTaskType[] }[]);
		setLoading(false);
	}, [defaultFarm, selectedSeason]);

	const onExportSmag = async (): Promise<void> => {
		setSelectedTasks(null);
		setSmagExporting(true);
		try {
			const { failedExports, succeededExports } = await exportSmagTasks({
				farmId: defaultFarm.id,
				taskIds: selectedTasks,
			});
			const succeededExportsMsg = t("common.snackbar.exportSmag.success.succeededExports", {
				count: succeededExports,
			});
			const failedExportsMsg = t("common.snackbar.exportSmag.success.failedExports", {
				count: failedExports,
			});
			const message = succeededExportsMsg + (failedExports ? `\n${failedExportsMsg}` : null);
			showSnackbar(message, snackbarTypeEnum.INFO);
		} catch (e) {
			showSnackbar(t("common.snackbar.exportSmag.failed"), snackbarTypeEnum.ERROR);
		} finally {
			await loadTasks();
			setSmagExporting(false);
		}
	};

	const onChangeSeason = (i: number): void => {
		const newSeason = stepSeasons[i];
		setSelectedSeason(newSeason);
	};

	useEffect(() => {
		if (defaultFarm) loadTasks();
	}, [defaultFarm, loadTasks, selectedSeason]);

	useEffect(() => {
		if (loggedInSmag && smagOnboardingStep === smagStepEnum.SHOW_ONBOARDING_TASKS) {
			setSmagOnboardingTasksModalProps({
				visibility: true,
				props: {
					onConfirm: (): void => {
						setSmagStepCookie(smagStepEnum.DONE);
						navigate("/");
					},
				},
			});
		}
	}, [smagOnboardingStep, setSmagOnboardingTasksModalProps, navigate, setSmagStepCookie, loggedInSmag]);

	return (
		<Tasks
			tasks={tasks}
			onExportSmag={onExportSmag}
			loading={loading}
			updateSelectedTasks={updateSelectedTasks}
			selectedSeason={selectedSeason}
			farms={farms}
			exportableTasks={exportableTasks}
			loadTasks={loadTasks}
			onChangeSeason={onChangeSeason}
			onClickExport={onClickExport}
			onCancelSmagExport={onCancelSmagExport}
			selectedTasks={selectedTasks}
			smagExporting={smagExporting}
			goToDashboard={goToDashboard}
			loggedInSmag={loggedInSmag}
			adminWithoutUserSelected={admin && !farmerSelected}
			csvExporting={csvExporting}
			onClickSmagSelectExport={onClickSmagSelectExport}
		/>
	);
};

export default TasksContainer;
