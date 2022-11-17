import { useContext, useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { getComingTasks } from "@Api/hygoApi";
import { tasksObjectToSortedArray } from "@Utils/dateObjectTransformation";
import { comingTaskType } from "@Types/task.types";
import { UserContext } from "@Context/UserContext";
import { ModulationContext } from "@Context/ModulationContext";
import ComingTasksScreen from "./ComingTasksScreen";

const ComingTasksContainer = (): JSX.Element => {
	const { defaultFarm } = useContext(UserContext);
	const { resetState } = useContext(ModulationContext);
	const isFocused = useIsFocused();
	const [tasks, setTasks] = useState<{ title: string; data: comingTaskType[] }[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const loadTasks = async (farmId: number): Promise<void> => {
		setLoading(true);
		const fetchedTasks = await getComingTasks(farmId);
		const tasksGroupedByDate = tasksObjectToSortedArray(fetchedTasks as comingTaskType[], true);
		setTasks(tasksGroupedByDate as { title: string; data: comingTaskType[] }[]);
		setLoading(false);
	};

	useEffect(() => {
		if (isFocused && defaultFarm) {
			loadTasks(defaultFarm.id);
			resetState();
		}
		return () => {
			setLoading(true);
		};
	}, [isFocused, defaultFarm, resetState]);

	return <ComingTasksScreen loading={loading} tasks={tasks} loadTasks={loadTasks} />;
};

export default ComingTasksContainer;
