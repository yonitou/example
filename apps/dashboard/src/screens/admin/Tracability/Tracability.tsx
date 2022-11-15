import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Button from "@Components/Button";
import FieldsListCard from "@Components/FieldsListCard";
import DatePicker from "@Components/DatePicker";
import Manager from "@Components/Manager";
import { TracabilityProps } from "./tracability.types";
import StepCard from "./components/StepCard";

const StyledTracability = styled.div`
	flex: 1;
	padding: 1rem;
	background-color: var(--gradient-background-2);
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-auto-rows: auto;
	gap: 1rem;
	.manager {
		background: var(--white);
		width: unset;
	}
	.farm-selector-container {
		padding: 0;
	}
`;

const Tracability = ({
	fields,
	selectedFields,
	startTime,
	setStartTime,
	endTime,
	loading,
	setSelectedFields,
	farms,
	filterTimeStartTime,
	filterTimeEndTime,
	setEndTime,
	onSubmit,
}: TracabilityProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<StyledTracability>
			<StepCard step={1} label={t("screens.tracability.steps.1")}>
				<Manager withCrudActions={false} className="manager">
					<FieldsListCard
						fields={fields}
						selectedFields={selectedFields}
						setSelectedFields={setSelectedFields}
						multiSelectionEnabled
						farms={farms}
						withCtasButtons={false}
					/>
				</Manager>
			</StepCard>
			<StepCard step={2} label={t("screens.tracability.steps.2")}>
				<h3>{t("common.time.from")}</h3>
				<DatePicker
					selected={startTime}
					onChange={(date: Date) => setStartTime(date)}
					startDate={startTime}
					endDate={endTime}
					maxDate={endTime}
					isStart
					filterTime={filterTimeStartTime}
				/>
				<h3>{t("common.time.to")}</h3>
				<DatePicker
					selected={endTime}
					onChange={(date: Date) => setEndTime(date)}
					startDate={startTime}
					minDate={startTime}
					endDate={endTime}
					maxDate={new Date()}
					isEnd
					filterTime={filterTimeEndTime}
				/>
			</StepCard>
			<StepCard step={3} label={t("screens.tracability.steps.3")}>
				<Button
					color="tangerine"
					onClick={onSubmit}
					loading={loading}
					disabled={!startTime || !endTime || !(selectedFields?.length > 0)}
					text={t("screens.tracability.btn")}
				/>
			</StepCard>
		</StyledTracability>
	);
};

export default Tracability;
