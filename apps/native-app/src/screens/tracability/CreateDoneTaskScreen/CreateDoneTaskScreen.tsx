import { View, StyleSheet } from "react-native";
import { Feature } from "flagged";
import { useTranslation } from "react-i18next";
import Title from "@Components/Title";
import { FlatList } from "react-native-gesture-handler";
import SafeArea from "@Components/SafeArea";
import Header from "@Components/Header";
import COLORS from "@Constants/palette";
import StepProgress from "@Components/StepProgress";
import Accordion from "@Components/Accordion";
import HygoIcons from "@Icons/HygoIcons";
import ParagraphSB from "@Components/ParagraphSB";
import Spinner from "@Components/Spinner";
import { featuresEnum } from "@Types/feature.types";
import { CreateDoneTaskScreenProps } from "./screen.types";
import NeedCheckTaskCard from "./components/NeedCheckTaskCard";
import DatePickerAccordion from "./components/DatePickerAccordion";

const CreateDoneTaskScreen = ({
	onBackPress,
	tasks,
	loading,
	openedAccordion,
	onOpenAccordion,
	onDeleteDoneTask,
	onSubmit,
}: CreateDoneTaskScreenProps): JSX.Element => {
	const { t } = useTranslation();
	const flatListOpacity = loading ? 0.25 : 1;
	return (
		<View style={styles.container}>
			<Header
				onBackPress={onBackPress}
				customTitle={<StepProgress step={1} title={t("screens.createDoneTaskScreen.title")} totalSteps={3} />}
				backgroundColor="transparent"
			/>
			<SafeArea withHorizontalPadding={false}>
				<Accordion
					opened={openedAccordion === 0}
					summary={
						<View style={styles.accordionSummary}>
							<HygoIcons.Calendar width={24} height={24} stroke={COLORS.LAKE[100]} style={styles.icon} />
							<Title>{t("screens.datePickerAccordion.summary.title")}</Title>
						</View>
					}
					chevronColor={COLORS.LAKE[100]}
					containerStyle={styles.accordionContainerStyle}
					onOpen={() => onOpenAccordion(0)}
				>
					<DatePickerAccordion onSubmit={onSubmit} />
				</Accordion>
				<Feature name={featuresEnum.TRACABILITY}>
					<Accordion
						opened={openedAccordion === 1}
						summary={
							<View style={styles.accordionSummary}>
								<HygoIcons.History width={24} height={24} fill={COLORS.LAKE[100]} style={styles.icon} />
								<Title>
									{t("screens.doneTaskList.title")}{" "}
									<Title style={styles.lakeColor}>({tasks?.length || 0})</Title>
								</Title>
							</View>
						}
						chevronColor={COLORS.LAKE[100]}
						containerStyle={{ ...styles.accordionContainerStyle, ...styles.withMargin }}
						onOpen={() => onOpenAccordion(1)}
					>
						<View>
							<FlatList
								style={{ ...styles.flatListWrapper, opacity: flatListOpacity }}
								ListEmptyComponent={
									<View style={styles.emptyState}>
										<ParagraphSB>{t("screens.doneTaskList.emptyState")}</ParagraphSB>
									</View>
								}
								data={tasks}
								ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
								keyExtractor={(item) => item.id.toString()}
								renderItem={({ item }) => {
									return (
										<NeedCheckTaskCard
											task={item}
											onDeleteDoneTask={onDeleteDoneTask}
											onSubmit={onSubmit}
										/>
									);
								}}
							/>

							{loading && <Spinner style={styles.spinner} />}
						</View>
					</Accordion>
				</Feature>
			</SafeArea>
		</View>
	);
};

const styles = StyleSheet.create({
	accordionSummary: {
		flexDirection: "row",
		alignItems: "center",
	},
	flatListWrapper: {
		maxHeight: 400,
	},
	listSeparator: {
		height: 16,
	},
	withMargin: {
		marginTop: 24,
	},
	accordionContainerStyle: {
		padding: 16,
	},
	emptyState: {
		backgroundColor: COLORS.NIGHT[5],
		borderRadius: 4,
		padding: 8,
	},
	icon: {
		marginRight: 8,
	},
	spinner: {
		position: "absolute",
		width: "100%",
		height: "100%",
	},
	container: {
		flex: 1,
		backgroundColor: COLORS.SMOKE[100],
	},
	lakeColor: {
		color: COLORS.LAKE[100],
	},
});

export default CreateDoneTaskScreen;
