import Input from "@Components/Input";
import DateTimePicker, { DateTimePickerAndroid, DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { formatJSDateInHoursAndMinutes, formatTimestampAsTitle } from "@Utils/time";
import { useEffect, useState } from "react";
import { Control } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View, Platform, StyleProp, ViewStyle, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type modeType = "date" | "time";

interface DatePickerProps {
	name: string;
	mode: modeType;
	onChangeValue: (value: Date) => void;
	maximumDate?: Date;
	minimumDate?: Date;
	label: string;
	control: Control;
	error: { message?: string };
	defaultValue: Date;
	onShow?: (key: string) => void;
	opened?: boolean;
	style?: StyleProp<ViewStyle>;
}

const DatePicker = ({
	name,
	mode,
	onChangeValue,
	maximumDate,
	minimumDate,
	label,
	opened,
	style,
	defaultValue,
	error,
	control,
	onShow,
}: DatePickerProps): JSX.Element => {
	const { t } = useTranslation();
	const [value, setValue] = useState<Date>(defaultValue);
	const [show, setShow] = useState<boolean>(opened);

	const onChange = (_: DateTimePickerEvent, selectedDate: Date): void => {
		setValue(selectedDate);
		onChangeValue(selectedDate);
	};

	const openPicker = (): void => {
		if (Platform.OS === "android") {
			DateTimePickerAndroid.open({
				value,
				onChange,
				mode,
				is24Hour: true,
			});
		} else {
			setShow(!show);
			if (!show) onShow(name);
		}
	};

	useEffect(() => {
		setShow(opened);
	}, [opened]);

	return (
		<View style={style}>
			<TouchableOpacity onPress={openPicker}>
				<View pointerEvents="none">
					<Input
						control={control}
						label={label}
						name={name}
						value={
							mode === "time"
								? formatJSDateInHoursAndMinutes(value)
								: formatTimestampAsTitle(value.toISOString())
						}
						rules={{
							required: true,
							validate: () => {
								if (minimumDate && maximumDate)
									return (
										(value > minimumDate && value <= maximumDate) ||
										t("common.inputs.date.errors.invalid")
									);
								return (
									value <= maximumDate ||
									value > minimumDate ||
									(!minimumDate && !maximumDate) ||
									t("common.inputs.date.errors.invalid")
								);
							},
						}}
						error={error}
					/>
				</View>
			</TouchableOpacity>
			{show && (
				<DateTimePicker
					value={value}
					mode={mode}
					is24Hour
					display="spinner"
					onChange={onChange}
					minimumDate={minimumDate || null}
					maximumDate={maximumDate || null}
					minuteInterval={10}
					style={styles.dateTimePicker}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	dateTimePicker: {
		height: 120,
	},
});

export default DatePicker;
