import { View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Analytics from "@Analytics";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import HygoIcons from "@Icons/HygoIcons";
import { activeProductType, productFamilyEnum } from "@Types/activeProduct.types";
import {
	formatTimestampAsTitle,
	fromDateToISO,
	addHours,
	getStartOfDayAsJSDate,
	formatJSDateInHours,
	getTodayDateAsJSDate,
} from "@Utils/time";
import COLORS from "@Constants/palette";
import { textReducer } from "@Utils/hygoUtils";
import { fieldType } from "@Types/field.types";
import { conditionEnum } from "@Types/condition.types";
import Title from "@Components/Title";
import ConditionConverter from "@Components/ConditionConverter";
import { useContext } from "react";
import { UserContext } from "@Context/UserContext";
import CropIcon from "@Components/CropIcon";
import productFamilies from "@Constants/productFamilies";
import BaseButton from "@Components/BaseButton";
import BoldTitle from "@Components/BoldTitle";
import { comingTaskType, doneTaskType } from "@Types/task.types";
import { useNavigation } from "@react-navigation/native";
import { ModulationContext } from "@Context/ModulationContext";
import { deleteComingTask, markComingTaskAsDone } from "@Api/hygoApi";
import { SnackbarContext, SnackTypeEnum } from "@Context/SnackBarContext";
import { ModalsContext } from "@Context/ModalContext";

interface TaskCardProps {
	selectedDay: Date;
	products: activeProductType[];
	fields: fieldType[];
	productFamily: productFamilyEnum;
	condition?: conditionEnum;
	selectedSlot: { min: number; max: number };
	showTaskDay?: boolean;
	isComingTask: boolean;
	task: comingTaskType | doneTaskType;
	loadTasks?: (farmId: number) => void;
}
const TaskCard = ({
	selectedDay,
	products,
	productFamily,
	fields,
	condition,
	selectedSlot,
	showTaskDay = false,
	isComingTask,
	task,
	loadTasks,
}: TaskCardProps): JSX.Element => {
	const { t } = useTranslation();
	const { logAnalyticEvent, events } = Analytics;
	const navigation = useNavigation();
	const { showSnackbar } = useContext(SnackbarContext);
	const { crops, defaultFarm } = useContext(UserContext);
	const { setConfirmationModalProps } = useContext(ModalsContext);
	const { initState } = useContext(ModulationContext);
	const startTime = addHours(getStartOfDayAsJSDate(selectedDay), selectedSlot?.min);
	const endTime = addHours(getStartOfDayAsJSDate(selectedDay), selectedSlot?.max);
	const fieldsGroupedByCrops = _.mapValues(_.groupBy(fields, "crop.id"));
	const isExpiredComingTask = isComingTask && endTime < new Date();

	const opacity = isExpiredComingTask ? 0.5 : 1;
	const ProductIcon = productFamilies[productFamily];

	const onExpiredComingTask = (taskParam: comingTaskType): void => {
		logAnalyticEvent(events.tasksScreen.comingTaskScreen.rescheduleComingTask, {
			...taskParam,
		});
		initState({ ...taskParam, selectedDay: getTodayDateAsJSDate() });
		navigation.navigate("ModulationSlotScreen" as never);
	};

	const onFutureComingTask = (taskParam: comingTaskType): void => {
		logAnalyticEvent(events.tasksScreen.comingTaskScreen.clickComingTask, {
			...taskParam,
		});
		navigation.navigate("ComingTaskReportScreen" as never, { initModulation: taskParam } as never);
	};

	const onComingTaskPress = (taskParam: comingTaskType): void =>
		isExpiredComingTask ? onExpiredComingTask(taskParam) : onFutureComingTask(taskParam);

	const onDoneTaskPress = (taskParam: doneTaskType): void => {
		logAnalyticEvent(events.tasksScreen.doneTasksScreen.clickDoneTask, {
			...taskParam,
		});
		navigation.navigate("DoneTaskReportScreen" as never, { taskId: taskParam.id } as never);
	};

	const markAsDone = async (): Promise<void> => {
		try {
			logAnalyticEvent(events.tasksScreen.comingTaskScreen.markTaskAsDone, {
				expired: isExpiredComingTask,
				...task,
			});
			await markComingTaskAsDone(defaultFarm.id, task.id);
			showSnackbar(t("common.snackbar.markComingTaskAsDone.success"), SnackTypeEnum.OK);
			navigation.navigate("Tasks" as never, { screen: "DoneTasksScreen" } as never);
		} catch (e) {
			showSnackbar(t("common.snackbar.markComingTaskAsDone.error"), SnackTypeEnum.ERROR);
			throw e;
		}
	};

	const onPressDoneButton = async (): Promise<void> => {
		isExpiredComingTask
			? markAsDone()
			: setConfirmationModalProps({
					visibility: true,
					props: {
						title: t("modals.markExpiredComingTaskAsDone.title"),
						confirmLabel: t("common.button.yes"),
						dismissLabel: t("common.button.no"),
						btnColorPalette: COLORS.LAKE,
						body: t("modals.markExpiredComingTaskAsDone.body"),
						handleConfirm: () => markAsDone(),
					},
			  });
	};

	const onPressDeleteExpired = (): void => {
		setConfirmationModalProps({
			visibility: true,
			props: {
				title: t("modals.deleteTask.title"),
				confirmLabel: t("common.button.confirm"),
				dismissLabel: t("common.button.cancel"),
				btnColorPalette: COLORS.GASPACHO,
				handleConfirm: async () => {
					await deleteComingTask(task.id, defaultFarm.id);
					loadTasks && loadTasks(defaultFarm.id);
				},
			},
		});
	};

	return (
		<View style={styles.cardBody}>
			<View style={{ opacity }}>
				{showTaskDay && (
					<Title style={styles.taskDay}>{formatTimestampAsTitle(fromDateToISO(selectedDay))}</Title>
				)}
				<View style={styles.phytoAndHour}>
					<View style={styles.productFamilyWrapper}>
						<ProductIcon width={24} height={24} fill={COLORS.NIGHT[100]} />
						<BoldTitle style={styles.productFamilyName}>
							{textReducer(t(`products.${productFamily}`), 25)}
						</BoldTitle>
					</View>

					<Title>
						{formatJSDateInHours(startTime)}H - {formatJSDateInHours(endTime)}H
					</Title>
				</View>

				<View style={styles.cropsAndProducts}>
					<View style={styles.cropsWrapper}>
						{Object.entries(fieldsGroupedByCrops).map(([cropId, fieldsGroup]) => {
							const crop = crops.find((c) => c.id.toString() === cropId);
							return (
								<View key={cropId} style={styles.cropFieldWrapper}>
									<CropIcon crop={crop} fill={COLORS.NIGHT[50]} />
									<Title style={styles.crops}>
										{`${t(`crops.${crop?.name}`)} - ${t("components.taskCard.field", {
											count: fieldsGroup?.length,
										})}`}
									</Title>
								</View>
							);
						})}
					</View>

					<FlatList
						data={products}
						style={styles.flatListWrapper}
						keyExtractor={(item) => item.id.toString()}
						horizontal
						showsHorizontalScrollIndicator={false}
						ItemSeparatorComponent={() => <View style={styles.flatListSeparator} />}
						renderItem={({ item }) => {
							return (
								<View style={styles.productBackground}>
									<Title style={styles.products}>{item?.name.toUpperCase()}</Title>
								</View>
							);
						}}
					/>
				</View>
			</View>
			<View style={styles.bottomCard}>
				{!!condition && !isExpiredComingTask && (
					<View style={styles.conditionsWrapper}>
						<ConditionConverter condition={condition} />
					</View>
				)}

				<View style={styles.buttonsWrapper}>
					<View style={styles.buttonWrapper}>
						<BaseButton
							outlined
							fillIcon
							borderRadius={4}
							color={isComingTask ? COLORS.LAKE : COLORS.TANGERINE}
							onPress={() =>
								isComingTask
									? onComingTaskPress(task as comingTaskType)
									: onDoneTaskPress(task as doneTaskType)
							}
							Icon={isExpiredComingTask ? HygoIcons.History : HygoIcons.Show}
							style={styles.btnHeight}
							tiny
						>
							{isExpiredComingTask ? t("common.button.reschedule") : t("common.button.details")}
						</BaseButton>
					</View>
					{isComingTask && (
						<View style={[styles.buttonWrapper, styles.withMargin]}>
							<BaseButton
								borderRadius={4}
								color={COLORS.LAKE}
								Icon={HygoIcons.Checkmark}
								fillIcon
								style={styles.btnHeight}
								onPress={onPressDoneButton}
								tiny
							>
								{t("common.button.done")}
							</BaseButton>
						</View>
					)}
					{isExpiredComingTask && (
						<BaseButton
							borderRadius={4}
							onPress={onPressDeleteExpired}
							color={COLORS.GASPACHO}
							style={[styles.btnHeight, styles.deleteBtn, styles.withMargin]}
						>
							<HygoIcons.Trash width={16} height={16} fill={COLORS.WHITE[100]} />
						</BaseButton>
					)}
				</View>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	taskDay: {
		marginVertical: 8,
	},
	flatListWrapper: {
		marginRight: -16,
	},
	productFamilyWrapper: {
		flexDirection: "row",
		alignItems: "center",
	},
	conditionsWrapper: {
		flex: 1,
	},
	deleteBtn: {
		width: 45,
	},
	btnHeight: {
		height: 45,
	},
	buttonsWrapper: {
		flex: 2,
		flexDirection: "row",
		alignItems: "center",
	},
	buttonWrapper: {
		flex: 1,
	},
	withMargin: {
		marginLeft: 8,
	},
	productFamilyName: {
		marginLeft: 8,
	},
	phytoAndHour: {
		marginBottom: 8,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	cropsWrapper: {
		marginBottom: 8,
	},
	crops: {
		color: COLORS.NIGHT[50],
	},
	cropsAndProducts: {
		flex: 1,
	},
	cropFieldWrapper: {
		flexDirection: "row",
		alignItems: "center",
	},
	flatListSeparator: {
		width: 8,
	},
	products: {
		textAlign: "center",
	},
	productBackground: {
		backgroundColor: COLORS.NIGHT[5],
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 35,
	},
	cardBody: {
		backgroundColor: COLORS.WHITE[100],
	},
	bottomCard: {
		marginTop: 16,
		flexDirection: "row",
		alignItems: "center",
	},
});

export default TaskCard;
