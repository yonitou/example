import { useEffect, useState, useRef, useContext, useMemo } from "react";
import { UserContext } from "@Context/UserContext";
import { getStartOfDayAsJSDate, getTodayDateAsJSDate } from "@Utils/time";
import { FlatList } from "react-native-gesture-handler";
import MeteoScreen from "./MeteoScreen";
import { MeteoContainerProps } from "./screen.types";

const MeteoContainer = ({ navigation, route }: MeteoContainerProps): JSX.Element => {
	const { meteo } = useContext(UserContext);
	const selectedDayFromParam = route.params?.selectedDay;
	const index = route.params?.index;
	const [selectedDay, setSelectedDay] = useState<string>();
	const scrollByDayRef = useRef<FlatList>(null);
	const scrollByHourRef = useRef<FlatList>(null);

	const meteoOfTheSelectedDay = useMemo(
		() =>
			meteo?.aggregationByHour?.filter(
				(met) => getStartOfDayAsJSDate(new Date(met.timestamps.from)).toISOString() === selectedDay
			),
		[meteo, selectedDay]
	);

	const onNavBack = (): void => navigation.goBack();

	const onClickDetails = (day: string): void => {
		setSelectedDay(day);
	};

	useEffect(() => {
		setTimeout(() => {
			scrollByDayRef?.current?.scrollToIndex({ index });
		}, 1);
	}, [index]);

	useEffect(() => {
		if (!meteoOfTheSelectedDay || meteoOfTheSelectedDay?.length === 0) return;
		const activeCardIsToday =
			getTodayDateAsJSDate().getDate() ===
			getStartOfDayAsJSDate(new Date(meteoOfTheSelectedDay[0].timestamps.from)).getDate();
		setTimeout(() => {
			scrollByHourRef?.current?.scrollToIndex({
				index: activeCardIsToday ? new Date().getHours() : 4,
			});
		}, 1);
	}, [meteoOfTheSelectedDay]);

	useEffect(() => {
		setSelectedDay(selectedDayFromParam);
	}, [selectedDayFromParam]);

	return (
		<MeteoScreen
			weeklyMeteo={meteo?.aggregationBy24Hour}
			meteoOfTheSelectedDay={meteoOfTheSelectedDay}
			onNavBack={onNavBack}
			onRequestDetails={onClickDetails}
			scrollByDayRef={scrollByDayRef}
			scrollByHourRef={scrollByHourRef}
		/>
	);
};

export default MeteoContainer;
