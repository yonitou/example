import { useEffect, useState, useContext, useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";
import { getDoneTasks } from "@Api/hygoApi";
import { tasksObjectToSortedArray } from "@Utils/dateObjectTransformation";
import { doneTaskType } from "@Types/task.types";
import { UserContext } from "@Context/UserContext";
import { DoneTasksContainerProps } from "./screen.types";
import DoneTasksScreen from "./DoneTasksScreen";

const DoneTasksContainer = ({ navigation }: DoneTasksContainerProps): JSX.Element => {
	const isFocused = useIsFocused();
	const { defaultFarm } = useContext(UserContext);
	const [tasks, setTasks] = useState<{ title: string; data: doneTaskType[] }[]>([]);
	const [unreadNeedCheckTasks, setUnreadNeedCheckTasks] = useState<number>();
	const [loading, setLoading] = useState<boolean>(true);

	const loadTasks = useCallback(async (farmId: number): Promise<void> => {
		setLoading(true);
		const fetchedTasks: doneTaskType[] = await getDoneTasks({ farmId });
		setUnreadNeedCheckTasks(fetchedTasks?.filter((task) => task?.needCheck && !task.read)?.length);
		const tasksGroupedByDate = tasksObjectToSortedArray(
			fetchedTasks.filter((fetchTask) => !fetchTask.needCheck) as doneTaskType[],
			false
		);
		setTasks(tasksGroupedByDate as { title: string; data: doneTaskType[] }[]);
		setLoading(false);
	}, []);

	const onPressFabButton = (): void => {
		navigation.navigate("CreateDoneTaskScreen");
	};

	useEffect(() => {
		if (isFocused && defaultFarm) loadTasks(defaultFarm.id);
	}, [isFocused, loadTasks, defaultFarm]);

	return (
		<DoneTasksScreen
			loading={loading}
			tasks={tasks}
			numberOfUnreadTasks={unreadNeedCheckTasks}
			onPressFabButton={onPressFabButton}
		/>
	);
};

export default DoneTasksContainer;
