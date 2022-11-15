import Accordion from "@Components/Accordion";
import { COLORS } from "@Constants/palette";
import { doneTaskType } from "@Types/task.types";
import { useState } from "react";
import styled from "styled-components";
import AccordionDetails from "./components/AccordionDetails";
import AccordionSummary from "./components/AccordionSummary";

interface TaskCardProps {
	task: doneTaskType;
	loadTasks: () => void;
	selectedTasks: number[];
	onClickCheckbox: (checked: boolean, taskId: number) => void;
}

const StyledTaskCard = styled.div`
	margin-bottom: 1.6rem;
	&:last-child {
		margin-bottom: 0;
	}
	.accordion {
		border: 1px solid var(--night-5);
		&.checked {
			border-color: var(--tangerine-100);
		}
		.accordion-content[aria-expanded="false"] {
			border-top: 1px solid var(--night-5);
		}
	}
`;

const TaskCard = ({ task, loadTasks, selectedTasks, onClickCheckbox }: TaskCardProps): JSX.Element => {
	const [open, setOpen] = useState<boolean>(false);

	const cropIds = [...new Set(task?.selectedFields?.map((f) => f.crop.id))];

	const checked = selectedTasks?.includes(task.id);

	return (
		<StyledTaskCard>
			<Accordion
				summary={
					<AccordionSummary
						task={task}
						cropIds={cropIds}
						selectedTasks={selectedTasks}
						onClickCheckbox={onClickCheckbox}
						checked={checked}
					/>
				}
				chevronColor={COLORS.TANGERINE[100]}
				className={checked ? "accordion checked" : "accordion"}
				onOpen={() => setOpen(true)}
			>
				<AccordionDetails taskId={task?.id} open={open} loadTasks={loadTasks} />
			</Accordion>
		</StyledTaskCard>
	);
};

export default TaskCard;
