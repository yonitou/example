import Analytics from "@Analytics";
import BaseButton from "@Components/BaseButton";
import DatePicker from "@Components/DatePicker";
import COLORS from "@Constants/palette";
import { doneTaskType } from "@Types/task.types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { View, StyleSheet } from "react-native";

const today = new Date();
const defaultStartTime = today.setHours(today.getHours() - 1);

interface DatePickerAccordionProps {
	onSubmit: (taskToCheck: doneTaskType) => void;
}

const DatePickerAccordion = ({ onSubmit }: DatePickerAccordionProps): JSX.Element => {
	const { t } = useTranslation();
	const { logAnalyticEvent, events } = Analytics;
	const { control, formState, handleSubmit } = useForm({ mode: "all" });
	const [date, setDate] = useState<Date>(new Date());
	const [startTime, setStartTime] = useState<Date>(new Date(defaultStartTime));
	const [openedDatePicker, setOpenedDatePicker] = useState<string>();
	const [endTime, setEndTime] = useState<Date>(new Date());

	const onPress = (): void => {
		const newStartTime = new Date(date).setHours(startTime.getHours(), startTime.getMinutes());
		const newEndTime = new Date(date).setHours(endTime.getHours(), endTime.getMinutes());
		logAnalyticEvent(events.tracability.createDoneTaskScreen.clickSelectSlot, {
			startTime: new Date(newStartTime).toLocaleString(),
			endTime: new Date(newEndTime).toLocaleString(),
		});
		onSubmit({
			startTime: new Date(newStartTime),
			endTime: new Date(newEndTime),
			selectedFields: [],
			selectedProducts: [],
			selectedSlot: { min: startTime.getHours(), max: endTime.getHours() },
		} as doneTaskType);
	};

	return (
		<View>
			<DatePicker
				control={control}
				error={formState.errors.date}
				name="date"
				mode="date"
				onChangeValue={setDate}
				label={t("common.inputs.date.label")}
				maximumDate={new Date()}
				defaultValue={new Date()}
				onShow={setOpenedDatePicker}
				opened={openedDatePicker === "date"}
			/>
			<View style={styles.timeInputsWrapper}>
				<DatePicker
					control={control}
					error={formState.errors.startTime}
					style={[styles.timeInput, styles.withMargin]}
					name="startTime"
					mode="time"
					onChangeValue={setStartTime}
					label={t("common.inputs.startTime.label")}
					maximumDate={endTime}
					defaultValue={new Date(defaultStartTime)}
					onShow={setOpenedDatePicker}
					opened={openedDatePicker === "startTime"}
				/>
				<DatePicker
					control={control}
					error={formState.errors.endTime}
					name="endTime"
					mode="time"
					onChangeValue={setEndTime}
					style={styles.timeInput}
					label={t("common.inputs.endTime.label")}
					maximumDate={new Date()}
					minimumDate={startTime}
					defaultValue={new Date()}
					onShow={setOpenedDatePicker}
					opened={openedDatePicker === "endTime"}
				/>
			</View>
			<BaseButton color={COLORS.LAKE} onPress={handleSubmit(onPress)} disabled={!formState.isValid}>
				{t("screens.createDoneTaskScreen.datePickerAccordion.submitBtn")}
			</BaseButton>
		</View>
	);
};
const styles = StyleSheet.create({
	timeInput: {
		flex: 1,
	},
	withMargin: {
		marginRight: 16,
	},
	timeInputsWrapper: {
		marginVertical: 16,
		flexDirection: "row",
		justifyContent: "space-between",
	},
});

export default DatePickerAccordion;
