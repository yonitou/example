import { farmType } from "@Types/farm.types";
import { doneTaskType } from "@Types/task.types";

export interface TasksProps {
	loading: boolean;
	tasks: { title: string; data: doneTaskType[] }[];
	farms: farmType[];
	selectedSeason: Date[];
	exportableTasks: number[];
	smagExporting: boolean;
	selectedTasks: number[];
	loggedInSmag: boolean;
	updateSelectedTasks: (checked: boolean, taskId: number) => void;
	goToDashboard: () => void;
	onExportSmag: () => Promise<void>;
	onCancelSmagExport: () => void;
	onClickSmagSelectExport: () => void;
	onChangeSeason: (i: number) => void;
	adminWithoutUserSelected: boolean;
	onClickExport: () => Promise<void>;
	loadTasks: () => void;
	csvExporting: boolean;
}
