import { checkProductMix, getDoneTask } from "@Api/api";
import { COLORS } from "@Constants/palette";
import { ModalsContext } from "@Context/ModalContext";
import { UserContext } from "@Context/UserContext";
import BaseIcons from "@Icons/BaseIcons";
import { featuresEnum } from "@Types/feature.types";
import { tankType } from "@Types/tank.types";
import { doneTaskType } from "@Types/task.types";
import { useFeature } from "flagged";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import EquipmentSection from "./EquipmentSection";
import FieldsSection from "./FieldsSection";
import MapSection from "./MapSection";
import ModulationSection from "./ModulationSection";
import NotesSection from "./NotesSection";
import ProductsSection from "./ProductsSection";
import Skeleton from "./Skeleton";
import TargetSection from "./TargetSection";

interface AccordionDetailsProps {
	taskId: number;
	loadTasks: () => void;
	open: boolean;
}

const StyledAccordionDetails = styled.div`
	margin: -1.6rem;
	padding: 1.6rem;
	background: var(--gradient-light-grey);
	position: relative;
	.delete-button {
		position: absolute;
		top: 1.6rem;
		right: 1.6rem;
		cursor: pointer;
		background-color: transparent;
		border: none;
		padding: 0;
	}
	.bottom {
		display: flex;
		justify-content: space-between;
		gap: 2.4rem;
		> .wrapper {
			flex: 1;
			&.shared {
				display: flex;
				flex-direction: column;
				gap: 2.4rem;
			}
		}
	}
`;

const AccordionDetails = ({ taskId, open, loadTasks }: AccordionDetailsProps): JSX.Element => {
	const { defaultFarm } = useContext(UserContext);
	const { setTaskDeleteModalProps } = useContext(ModalsContext);
	const [loading, setLoading] = useState<boolean>(true);
	const [task, setTask] = useState<doneTaskType>();
	const [tankIndications, setTankIndications] = useState<tankType>();
	const hasOptimize = useFeature(featuresEnum.OPTIMIZE);

	const onClickDelete = (): void => {
		setTaskDeleteModalProps({
			visibility: true,
			props: {
				taskId,
				onDelete: () => loadTasks(),
			},
		});
	};

	useEffect(() => {
		const fetchTask = async (): Promise<void> => {
			setLoading(true);
			const fetchedTask = await getDoneTask(defaultFarm?.id, taskId);
			const fetchedTankIndications = await checkProductMix({
				productIds: fetchedTask?.selectedProducts?.map((p) => p.id),
			});
			setTask(fetchedTask);
			setTankIndications(fetchedTankIndications);
			setLoading(false);
		};
		if (!task && open) fetchTask();
	}, [taskId, defaultFarm, open, task]);

	const totalArea = task?.selectedFields?.reduce((r, f) => r + f.area, 0);
	const volume: number = (totalArea / 10000) * (task?.debit || 0);

	return (
		<StyledAccordionDetails>
			{loading ? (
				<Skeleton />
			) : (
				<>
					<button type="button" className="delete-button" onClick={onClickDelete}>
						<BaseIcons.Trash fill={COLORS.GASPACHO[100]} width={32} height={32} />
					</button>
					<FieldsSection fields={task?.selectedFields} tankIndications={tankIndications} />

					<div className="bottom">
						<div className="wrapper">
							<MapSection fields={task?.selectedFields} />
						</div>
						<div className="wrapper shared">
							<ProductsSection products={task?.selectedProducts} totalArea={totalArea} volume={volume} />
							{hasOptimize && <ModulationSection modulation={task?.modulation} />}
						</div>
						<div className="wrapper shared">
							<EquipmentSection nozzle={task?.nozzle} debit={task?.debit} />
							{task?.selectedTargets?.length > 0 && <TargetSection targets={task?.selectedTargets} />}
							<NotesSection notes={task?.notes} />
						</div>
					</div>
				</>
			)}
		</StyledAccordionDetails>
	);
};

export default AccordionDetails;
