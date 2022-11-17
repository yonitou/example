import { comingTaskType } from "@Types/task.types";

export interface ComingTasksScreenProps {
	tasks: { title: string; data: comingTaskType[] }[];
	loading: boolean;
	loadTasks: (farmId: number) => void;
}
