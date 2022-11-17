import { View, StyleSheet, SectionList } from "react-native";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import { formatTimestampAsTitle } from "@Utils/time";
import TaskCard from "@Components/TaskCard";
import HygoIcons from "@Icons/HygoIcons";
import Spinner from "@Components/Spinner";
import COLORS, { GRADIENTS } from "@Constants/palette";

import Title from "@Components/Title";
import ParagraphSB from "@Components/ParagraphSB";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import { ComingTasksScreenProps } from "./screen.types";

const ComingTasksScreen = ({ tasks, loading, loadTasks }: ComingTasksScreenProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<LinearGradient colors={GRADIENTS.BACKGROUND_1} style={styles.container}>
			{loading && <Spinner />}
			{!loading && tasks?.length === 0 ? (
				<View style={styles.noTasksContainer}>
					<HygoIcons.HappyDrop colors={GRADIENTS.LAKE_GRAD} />
					<Title style={styles.noTasksTitle}>{t("screens.comingTasks.noTasks.title")}</Title>
					<ParagraphSB style={styles.noTasksDescription}>
						{t("screens.comingTasks.noTasks.description")}
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
							const {
								condition,
								selectedProducts,
								selectedFields,
								selectedDay,
								selectedSlot,
								productFamily,
							} = item;
							return (
								<View style={styles.cardWrapper}>
									<TaskCard
										loadTasks={loadTasks}
										task={item}
										productFamily={productFamily}
										selectedDay={selectedDay}
										isComingTask
										fields={selectedFields}
										products={selectedProducts}
										condition={condition}
										selectedSlot={selectedSlot}
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

export default ComingTasksScreen;
