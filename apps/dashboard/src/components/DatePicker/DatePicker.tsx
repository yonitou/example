import styled from "styled-components";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fr from "date-fns/locale/fr";

registerLocale("fr", fr);

const StyledDatePicker = styled(ReactDatePicker)`
	cursor: pointer;
	font-size: 1.4rem;
	font-family: "Nunito Bold";
	width: 100%;
	height: 5.2rem;
	border: 1px solid var(--night-25);
	color: var(--night-100);
	border-radius: 0.4rem;
	padding-left: 0.8rem;
	outline: none;
`;

interface DatePickerProps {
	onChange: (date: Date) => void;
	startDate: Date;
	selected: Date;
	endDate?: Date;
	minDate?: Date;
	maxDate?: Date;
	isStart?: boolean;
	isEnd?: boolean;
	filterTime?: (date: Date) => boolean;
}

const DatePicker = ({
	onChange,
	startDate,
	selected,
	endDate,
	isStart,
	maxDate,
	minDate,
	isEnd,
	filterTime,
}: DatePickerProps): JSX.Element => {
	return (
		<StyledDatePicker
			selected={selected}
			onChange={onChange}
			startDate={startDate}
			endDate={endDate}
			locale="fr"
			maxDate={maxDate}
			selectsStart={isStart}
			selectsEnd={isEnd}
			showTimeSelect
			onKeyDown={(e) => e.preventDefault()}
			filterTime={filterTime}
			minDate={minDate}
			timeFormat="HH:mm"
			dateFormat="dd/MM/yyyy - HH:mm"
		/>
	);
};

export default DatePicker;
