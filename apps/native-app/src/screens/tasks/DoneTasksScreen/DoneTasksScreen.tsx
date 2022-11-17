import { View, StyleSheet, SectionList } from "react-native";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import { formatTimestampAsTitle } from "@Utils/time";
import TaskCard from "@Components/TaskCard";
import HygoIcons from "@Icons/HygoIcons";
import Spinner from "@Components/Spinner";
import COLORS, { GRADIENTS } from "@Constants/palette";
import Title from "@Components/Title";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import ParagraphSB from "@Components/ParagraphSB";
import CircularButton from "@Components/CircularButton";
import { Feature } from "flagged";
import { featuresEnum } from "@Types/feature.types";
import { DoneTasksScreenProps } from "./screen.types";

const DoneTasksScreen = ({
	tasks,
	loading,
	numberOfUnreadTasks,
	onPressFabButton,
}: DoneTasksScreenProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<LinearGradient colors={GRADIENTS.BACKGROUND_1} style={styles.container}>
			<View style={styles.addDoneTaskBtn}>
				<CircularButton large={false} backgroundColor={COLORS.TANGERINE[100]} onPress={onPressFabButton}>
					<>
						<Feature name={featuresEnum.TRACABILITY}>
							{!!numberOfUnreadTasks && (
								<View style={styles.unreadIndicator}>
									<ParagraphSB style={styles.unreadIndicatorText}>{numberOfUnreadTasks}</ParagraphSB>
								</View>
							)}
						</Feature>
						<HygoIcons.Add fill={COLORS.WHITE[100]} width={27} height={27} />
					</>
				</CircularButton>
			</View>
			{loading && <Spinner />}
			{!loading && tasks?.length === 0 ? (
				<View style={styles.noTasksContainer}>
					<HygoIcons.HappyDrop colors={GRADIENTS.TANGERINE_GRAD} />
					<Title style={styles.noTasksTitle}>{t("screens.doneTasks.noTasks.title")}</Title>
					<ParagraphSB style={styles.noTasksDescription}>
						{t("screens.doneTasks.noTasks.description")}
					</ParagraphSB>
				</View>
			) : (
				!loading && (
					<SectionList
						sections={tasks}
						showsVerticalScrollIndicator={false}
						stickySectionHeadersEnabled={false}
						keyExtractor={(item) => item.id.toString()}
						ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
						renderSectionHeader={({ section: { title } }) => (
							<Title style={styles.dateGroupText}>{formatTimestampAsTitle(title)}</Title>
						)}
						renderItem={({ item }) => {
							return (
								<View style={styles.cardWrapper}>
									<TaskCard
										task={item}
										productFamily={item.productFamily}
										fields={item?.selectedFields}
										products={item?.selectedProducts}
										isComingTask={false}
										selectedDay={item?.startTime}
										selectedSlot={item?.selectedSlot}
									/>
								</View>
							);
						}}
					/>
				)
			)}
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	unreadIndicator: {
		backgroundColor: COLORS.GASPACHO[100],
		width: 20,
		height: 20,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		top: 0,
		right: 0,
	},
	unreadIndicatorText: {
		color: COLORS.WHITE[100],
	},
	addDoneTaskBtn: {
		position: "absolute",
		zIndex: 1,
		bottom: 16,
		right: 16,
	},
	dateGroupText: {
		marginVertical: 8,
		paddingHorizontal: HORIZONTAL_PADDING,
	},
	cardWrapper: {
		padding: 16,
		backgroundColor: COLORS.WHITE[100],
	},
	itemSeparator: {
		height: 8,
	},
	noTasksContainer: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		paddingHorizontal: HORIZONTAL_PADDING,
	},
	noTasksTitle: {
		marginVertical: 8,
		textAlign: "center",
	},
	noTasksDescription: {
		textAlign: "center",
	},
});

export default DoneTasksScreen;
