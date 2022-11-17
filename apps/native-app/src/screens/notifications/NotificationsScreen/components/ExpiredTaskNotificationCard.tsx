import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { notificationType } from "@Types/notification.types";
import { comingTaskType } from "@Types/task.types";
import TaskCard from "@Components/TaskCard";
import { getComingTask } from "@Api/hygoApi";
import { UserContext } from "@Context/UserContext";
import HeaderNotificationCard from "./HeaderNotificationCard";

interface ExpiredTaskNotificationCardProps {
	notification: notificationType;
	handleDelete: (id: number) => void;
}

const ExpiredTaskNotificationCard = ({ notification, handleDelete }: ExpiredTaskNotificationCardProps): JSX.Element => {
	const { t } = useTranslation();
	const [task, setTask] = useState<comingTaskType>();
	const { defaultFarm } = useContext(UserContext);

	const { selectedDay, selectedFields, selectedProducts, condition, selectedSlot, productFamily } = task || {};

	useEffect(() => {
		const fetchTask = async (): Promise<void> => {
			const fetchedTask = await getComingTask(notification?.jsonData?.taskId, defaultFarm.id);
			setTask(fetchedTask);
		};
		if (defaultFarm) fetchTask();
	}, [notification.jsonData.taskId, defaultFarm]);

	return (
		<>
			<HeaderNotificationCard
				handleDelete={handleDelete}
				title={t("screens.notifications.expiredTask.title")}
				type={notification.jsonData.type}
				id={notification.id}
			/>
			{task && (
				<TaskCard
					task={task}
					productFamily={productFamily}
					selectedDay={selectedDay}
					fields={selectedFields}
					products={selectedProducts}
					condition={condition}
					selectedSlot={selectedSlot}
					showTaskDay
					isComingTask
				/>
			)}
		</>
	);
};

export default ExpiredTaskNotificationCard;
