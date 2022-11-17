import { ParamListBase } from "@react-navigation/native";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { doneTaskType } from "@Types/task.types";

export interface DoneTasksContainerProps {
	navigation: MaterialTopTabNavigationProp<ParamListBase>;
}

export interface DoneTasksScreenProps {
	tasks: { title: string; data: doneTaskType[] }[];
	numberOfUnreadTasks: number;
	loading: boolean;
	onPressFabButton: () => void;
}
