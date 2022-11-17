import COLORS from "@Constants/palette";
import { doneTaskType } from "@Types/task.types";
import HygoIcons from "@Icons/HygoIcons";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Title from "@Components/Title";
import { formatTimestampAsTitle, fromDateToISO } from "@Utils/time";
import { useTranslation } from "react-i18next";
import capitalize from "@Utils/capitalize";
import ParcelSVG from "@Components/ParcelSVG";
import ParagraphSB from "@Components/ParagraphSB";
import CropIcon from "@Components/CropIcon";
import { useContext } from "react";
import { UserContext } from "@Context/UserContext";
import Analytics from "@Analytics";

interface NeedCheckTaskCardProps {
	task: doneTaskType;
	onDeleteDoneTask: (taskId: number) => void;
	onSubmit: (taskToCheck: doneTaskType) => void;
}
const NeedCheckTaskCard = ({ task, onDeleteDoneTask, onSubmit }: NeedCheckTaskCardProps): JSX.Element => {
	const { crops, devices } = useContext(UserContext);
	const { events, logAnalyticEvent } = Analytics;
	const { t } = useTranslation();
	const title = `${capitalize(formatTimestampAsTitle(fromDateToISO(task.startTime)))} ${task.selectedSlot?.min}H - ${
		task.selectedSlot?.max
	}H`;
	const onPress = (): void => {
		logAnalyticEvent(events.tracability.createDoneTaskScreen.clickTaskCard, {
			...task,
		});
		onSubmit(task);
	};

	const device = devices.find((d) => d.id === task.deviceId);
	return (
		<TouchableOpacity containerStyle={styles.container} onPress={onPress}>
			<View style={styles.wrapper}>
				<View style={styles.subWrapper}>
					{!task.read && <View style={styles.readIndicator} />}
					<Title>{title}</Title>
				</View>
				<TouchableOpacity onPress={() => onDeleteDoneTask(task.id)}>
					<HygoIcons.Close width={16} height={16} fill={COLORS.NIGHT[100]} />
				</TouchableOpacity>
			</View>
			<View style={styles.withMargin}>
				{task?.selectedFields?.map((field, _i, arr) => {
					const crop = crops.find((c) => c.id === field.crop.id);
					const isLast = field.id === arr[arr.length - 1].id;
					const marginBottom = isLast ? 0 : 8;
					return (
						<View style={{ ...styles.wrapper, marginBottom }} key={field.id}>
							<View style={styles.subWrapper}>
								<ParcelSVG
									path={field.svg}
									height={20}
									width={20}
									fill={COLORS.LAKE[25]}
									stroke={COLORS.LAKE[100]}
								/>
								<ParagraphSB style={styles.fieldName}>{field.name}</ParagraphSB>
							</View>
							<View style={styles.subWrapper}>
								<CropIcon crop={crop} fill={COLORS.NIGHT[50]} width={16} height={16} />
								<ParagraphSB style={styles.cropName}>{t(`crops.${field.crop.name}`)}</ParagraphSB>
							</View>
						</View>
					);
				})}
			</View>
			<View style={styles.wrapper}>
				{device && (
					<View style={styles.subWrapper}>
						<HygoIcons.QRCode fill={COLORS.LAKE[100]} width={16} height={16} style={styles.deviceIcon} />
						<ParagraphSB>{device.name}</ParagraphSB>
					</View>
				)}
				<View style={styles.subWrapper}>
					<Title style={styles.cta}>{t("common.button.select")}</Title>
					<HygoIcons.SimpleArrowRight width={16} height={16} fill={COLORS.LAKE[100]} />
				</View>
			</View>
		</TouchableOpacity>
	);
};
const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.SMOKE[100],
		borderRadius: 4,
		padding: 8,
	},
	cta: {
		marginRight: 8,
		color: COLORS.LAKE[100],
	},
	deviceIcon: {
		marginRight: 8,
	},
	fieldName: {
		marginLeft: 8,
	},
	cropName: {
		color: COLORS.NIGHT[50],
	},
	subWrapper: {
		flexDirection: "row",
		alignItems: "center",
	},
	withMargin: {
		marginVertical: 16,
	},
	wrapper: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	readIndicator: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: COLORS.GASPACHO[100],
		marginRight: 4,
	},
});

export default NeedCheckTaskCard;
