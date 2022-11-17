import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { doneTaskType } from "@Types/task.types";

export interface CreateDoneTaskContainerProps {
	navigation: NativeStackNavigationProp<ParamListBase>;
	route: RouteProp<{
		params: {
			openedAccordion: number;
		};
	}>;
}

export interface CreateDoneTaskScreenProps {
	tasks: doneTaskType[];
	onBackPress: () => void;
	hasTracability: boolean;
	openedAccordion: number;
	onOpenAccordion: (key: number) => void;
	loading: boolean;
	onDeleteDoneTask: (taskId: number) => void;
	onSubmit: (taskToCheck: doneTaskType) => Promise<void>;
}
