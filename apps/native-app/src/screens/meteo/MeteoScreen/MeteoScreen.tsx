import { View, ImageBackground, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { FlatList } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MetricsCard from "@Components/MetricsCard";
import Spinner from "@Components/Spinner";
import SafeArea from "@Components/SafeArea";
import Header from "@Components/Header";
import { fromISOToDate } from "@Utils/time";
import backgroundImage from "@Assets/home/background.png";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import MeteoDetailByHour from "./components/MeteoDetailByHour";
import { MeteoScreenProps } from "./screen.types";

const MeteoScreen = ({
	weeklyMeteo,
	meteoOfTheSelectedDay,
	onNavBack,
	onRequestDetails,
	scrollByDayRef,
	scrollByHourRef,
}: MeteoScreenProps): JSX.Element => {
	const { t } = useTranslation();
	const isDataLoading =
		!weeklyMeteo || weeklyMeteo.length === 0 || !meteoOfTheSelectedDay || meteoOfTheSelectedDay?.length === 0;
	const insets = useSafeAreaInsets();

	return (
		<ImageBackground source={backgroundImage} resizeMode="cover" style={styles.bgHome}>
			<Header backgroundColor="transparent" title={t("screens.meteo.title")} onBackPress={onNavBack} />
			<SafeArea withBottomPadding={false} withHorizontalPadding={false}>
				{isDataLoading ? (
					<Spinner style={styles.spinner} />
				) : (
					<FlatList
						style={styles.flatList}
						ListFooterComponent={() => <View style={styles.flatListEnd} />}
						ListHeaderComponent={() => <View style={styles.flatListStart} />}
						data={weeklyMeteo}
						keyExtractor={(item) => item.timestamps.from}
						horizontal
						getItemLayout={(_, index) => ({
							length: 148,
							offset: 148 * index,
							index,
						})}
						ref={scrollByDayRef}
						showsHorizontalScrollIndicator={false}
						ItemSeparatorComponent={() => <View style={styles.flatListSeparator} />}
						renderItem={({ item }) => {
							const dayInCard = fromISOToDate(item.timestamps.from).day;
							const daySelected =
								meteoOfTheSelectedDay && fromISOToDate(meteoOfTheSelectedDay[0].timestamps.from).day;
							const active = daySelected === dayInCard;
							const opacity = active ? 1 : 0.5;
							return (
								<MetricsCard
									meteo={item}
									onClickDetails={(metricsOfTheSelectedDay) =>
										onRequestDetails(metricsOfTheSelectedDay.timestamps.from)
									}
									style={{ opacity }}
								/>
							);
						}}
					/>
				)}

				<FlatList
					style={styles.meteoByHourContainer}
					ListFooterComponent={() => <View style={{ height: insets.bottom }} />}
					data={meteoOfTheSelectedDay}
					keyExtractor={(item) => item.timestamps.from}
					getItemLayout={(_, index) => ({
						length: 102,
						offset: 102 * index,
						index,
					})}
					ref={scrollByHourRef}
					showsVerticalScrollIndicator={false}
					renderItem={({ item }) => {
						return <MeteoDetailByHour meteo={item} key={item.timestamps.from} />;
					}}
				/>
			</SafeArea>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	bgHome: {
		flex: 1,
	},

	flatListStart: {
		marginLeft: HORIZONTAL_PADDING,
	},
	flatListEnd: {
		marginRight: HORIZONTAL_PADDING,
	},
	flatListSeparator: {
		marginHorizontal: 4,
	},
	flatList: {
		flexGrow: 0,
	},
	spinner: {
		flex: 0,
	},
	meteoByHourContainer: {
		borderRadius: 10,
		marginTop: 16,
		flex: 1,
	},
});

export default MeteoScreen;
