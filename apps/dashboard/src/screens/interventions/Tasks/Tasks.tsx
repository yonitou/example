import FarmSelector from "@Components/FarmSelector";
import { COLORS } from "@Constants/palette";
import BaseIcons from "@Icons/BaseIcons";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import coopIcon from "@Assets/coop.png";
import Button from "@Components/Button";
import SeasonSelector from "@Components/SeasonSelector";
import TaskCard from "@Components/TaskCard";
import { TasksProps } from "./tasks.types";
import EmptyState from "../../../components/EmptyState/EmptyState";
import Skeleton from "./components/Skeleton";

const StyledTasks = styled.div`
	padding: 2rem 12rem;
	background: var(--gradient-background-2);
	height: 100%;
	display: flex;
	flex-direction: column;
	.ctas {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		margin-bottom: 2.8rem;
		.selectors-wrapper {
			flex: 3;
			display: flex;
			align-items: flex-start;
			.season-selector {
				margin-left: 2.9rem;
			}
		}
		.exports-wrapper {
			flex: 2;
			display: flex;
			align-items: center;
			.export-smag-btn {
				margin-right: 1.6rem;
			}
			.cancel {
				flex-shrink: 3;
			}
		}
	}

	.tasks-wrapper {
		overflow: auto;
		margin: 0 -12rem;
		padding: 0rem 12rem;
		flex: 1;
		.task-date {
			margin-bottom: 1.6rem;
		}
	}
	.states {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		.empty-state {
			display: flex;
			.text-wrapper {
				margin-left: 1.6rem;
			}
			.grey-text {
				color: var(--night-50);
			}
			button {
				margin-top: 1.6rem;
			}
		}
	}
`;

const Tasks = ({
	tasks,
	loading,
	farms,
	goToDashboard,
	selectedSeason,
	onClickSmagSelectExport,
	smagExporting,
	csvExporting,
	loggedInSmag,
	adminWithoutUserSelected,
	onExportSmag,
	onCancelSmagExport,
	exportableTasks,
	onChangeSeason,
	loadTasks,
	selectedTasks,
	updateSelectedTasks,
	onClickExport,
}: TasksProps): JSX.Element => {
	const { t } = useTranslation();

	return (
		<StyledTasks>
			{farms?.length > 0 && !adminWithoutUserSelected && (
				<div className="ctas">
					<div className="selectors-wrapper">
						<FarmSelector crudActions={false} disabled={!!selectedTasks} />
						{!selectedTasks && (
							<SeasonSelector
								className="season-selector"
								onChangeSeason={onChangeSeason}
								selectedSeason={selectedSeason}
							/>
						)}
					</div>
					<div className="exports-wrapper">
						{loggedInSmag && (
							<Button
								className="export-smag-btn"
								color="tangerine"
								text={
									selectedTasks
										? t("screens.tasks.confirmExportSmagBtn", {
												tasksNumber: selectedTasks.length,
										  })
										: t("screens.tasks.exportSmagBtn", {
												tasksNumber: exportableTasks.length,
										  })
								}
								disabled={selectedTasks ? selectedTasks?.length === 0 : exportableTasks?.length === 0}
								onClick={selectedTasks ? onExportSmag : onClickSmagSelectExport}
								loading={smagExporting}
								icon={<BaseIcons.Smag fill="transparent" width={16} height={16} />}
							/>
						)}

						{selectedTasks ? (
							<Button
								color="tangerine"
								outlined
								className="cancel"
								text={t("common.button.cancel")}
								onClick={onCancelSmagExport}
							/>
						) : (
							<Button
								color="tangerine"
								outlined
								className="export-csv-btn"
								text={t("screens.tasks.exportBtn")}
								disabled={csvExporting || tasks?.length === 0}
								onClick={onClickExport}
								icon={<BaseIcons.Logout width={16} height={16} />}
							/>
						)}
					</div>
				</div>
			)}
			{!tasks?.length || loading || adminWithoutUserSelected ? (
				<>
					{loading && <Skeleton />}
					{!loading && (
						<div className="states">
							{!farms?.length && !adminWithoutUserSelected && (
								<EmptyState
									illustration={<img src={coopIcon} alt="ferme" width={100} />}
									title={t("components.emptyState.noDefaultFarm.title")}
									description={t("components.emptyState.noDefaultFarm.description")}
									onClick={goToDashboard}
									btnIcon={<BaseIcons.Parcelle fill={COLORS.WHITE} width={16} height={16} />}
									btnText={t("components.emptyState.noDefaultFarm.btn")}
								/>
							)}
							{!adminWithoutUserSelected && farms?.length > 0 && (
								<EmptyState
									illustration={
										<BaseIcons.HappyDrop
											width={33}
											height={48}
											firstColor={COLORS.NIGHT[25]}
											secondColor={COLORS.NIGHT[25]}
											className="icon"
										/>
									}
									title={t("screens.tasks.emptyStates.noTasks.title")}
									description={t("screens.tasks.emptyStates.noTasks.description")}
									grey
								/>
							)}

							{adminWithoutUserSelected && (
								<EmptyState
									illustration={
										<BaseIcons.User
											width={48}
											height={48}
											fill={COLORS.NIGHT[25]}
											className="icon"
										/>
									}
									title={t("screens.tasks.emptyStates.noUserSelected.title")}
									description={t("screens.tasks.emptyStates.noUserSelected.description")}
									grey
								/>
							)}
						</div>
					)}
				</>
			) : (
				<div className="tasks-wrapper">
					{tasks?.map((taskGroup): JSX.Element => {
						if (selectedTasks && !taskGroup.data.some((r) => exportableTasks?.includes(r.id))) return null;
						return (
							<Fragment key={taskGroup.title}>
								<h3 className="task-date">{new Date(taskGroup.title).toLocaleDateString()}</h3>
								{taskGroup.data.map((task) => {
									if (selectedTasks && !exportableTasks?.includes(task.id)) return null;
									return (
										<TaskCard
											task={task}
											key={task.id}
											loadTasks={loadTasks}
											selectedTasks={selectedTasks}
											onClickCheckbox={updateSelectedTasks}
										/>
									);
								})}
							</Fragment>
						);
					})}
				</div>
			)}
		</StyledTasks>
	);
};

export default Tasks;
