import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import capitalize from "@Utils/capitalize";

import HygoIcons from "@Icons/HygoIcons";
import { convertToHa, textReducer } from "@Utils/hygoUtils";
import { fieldType } from "@Types/field.types";

import ParcelSVG from "@Components/ParcelSVG";
import COLORS, { GRADIENTS } from "@Constants/palette";
import Title from "@Components/Title";
import ParagraphSB from "@Components/ParagraphSB";
import { LinearGradient } from "expo-linear-gradient";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";

import WeatherDetailsCard from "@Components/WeatherDetailsCard";
import ConditionConverter from "@Components/ConditionConverter";
import MetricsProductList from "@Components/MetricsProductList";
import { Fragment, useContext } from "react";
import { UserContext } from "@Context/UserContext";
import CropIcon from "@Components/CropIcon";
import { tankType } from "@Types/tank.types";

interface ParcellesReportCardProps {
	selectedFields: fieldType[];
	onRequestEdit: () => void;
	totalArea: number;
	isComingTask: boolean;
	tankIndications: tankType;
}

const ParcellesReportCard = ({
	selectedFields,
	onRequestEdit,
	tankIndications,
	totalArea,
	isComingTask,
}: ParcellesReportCardProps): JSX.Element => {
	const { crops } = useContext(UserContext);
	const { t } = useTranslation();
	return (
		<>
			<View style={styles.header}>
				<View style={styles.sidesWrapper}>
					<HygoIcons.Parcelles fill={COLORS.LAKE[100]} width={24} height={24} />
					<Title style={styles.title}>
						{isComingTask
							? `${t("components.fieldsReportCard.comingTaskTitle")} (${selectedFields?.length})`
							: `${t("components.fieldsReportCard.doneTaskTitle")} (${selectedFields?.length})`}
					</Title>
				</View>

				<TouchableOpacity style={styles.sidesWrapper} onPress={onRequestEdit}>
					<Title style={styles.editLabel}>{t("common.button.edit")}</Title>
					<HygoIcons.SimpleArrowRight fill={COLORS.LAKE[100]} width={16} height={16} />
				</TouchableOpacity>
			</View>
			{!isComingTask && (
				<LinearGradient
					style={styles.gradientSeparator}
					colors={GRADIENTS.BACKGROUND_2}
					start={{ x: 0, y: 0 }}
					end={{ x: 0, y: 0 }}
				/>
			)}

			{selectedFields?.map((field, i, arr) => {
				const hasMeteo = Boolean(field?.metricsOfTheSelectedSlot);
				const isLast = i === arr.length - 1;
				const fieldContainerMarginBottom = isComingTask && !isLast ? 16 : 0;
				const fieldContainerPaddingVertical = isComingTask ? 0 : 8;
				const crop = crops.find((c) => field?.crop?.id === c.id);
				return (
					<Fragment key={field.id}>
						<View
							style={[
								styles.fieldContainer,
								{
									marginBottom: fieldContainerMarginBottom,
									paddingVertical: fieldContainerPaddingVertical,
								},
							]}
						>
							<View style={styles.row}>
								<View style={styles.left}>
									<ParcelSVG
										path={field.svg}
										height={20}
										width={20}
										stroke={COLORS.LAKE[100]}
										fill={COLORS.LAKE[25]}
									/>
									<ParagraphSB style={styles.fieldName}>
										{textReducer(capitalize(field.name), 10)}
									</ParagraphSB>
								</View>
								<View style={styles.middle}>
									<CropIcon crop={crop} fill={COLORS.NIGHT[50]} width={16} height={16} />
									<ParagraphSB style={styles.cropName}>
										{textReducer(capitalize(t(`crops.${crop?.name}`)), 18)}
									</ParagraphSB>
								</View>

								<ParagraphSB style={styles.right}>{convertToHa(field.area)} ha</ParagraphSB>
							</View>
							{!isComingTask && (
								<View style={styles.meteoContainer}>
									{hasMeteo && (
										<>
											<ConditionConverter condition={field?.condition} />
											<View style={styles.weatherDetailsWrapper}>
												<WeatherDetailsCard
													metricsOfTheSelectedSlot={field?.metricsOfTheSelectedSlot}
												/>
											</View>
											<MetricsProductList
												metrics={field?.metricsOfTheSelectedSlot}
												productMetrics={tankIndications?.productMetrics}
											/>
										</>
									)}
									{!hasMeteo && (
										<ParagraphSB style={styles.noMeteoText}>
											{t("components.fieldsReportCard.noMeteo")}
										</ParagraphSB>
									)}
								</View>
							)}
						</View>
						{!isComingTask && (
							<LinearGradient
								style={styles.gradientSeparator}
								colors={GRADIENTS.BACKGROUND_2}
								start={{ x: 0, y: 0 }}
								end={{ x: 0, y: 0 }}
							/>
						)}
					</Fragment>
				);
			})}
			<View style={styles.totalContainer}>
				<View style={styles.left} />
				<ParagraphSB style={[styles.middle, styles.totalArea]}>{t("common.total")}</ParagraphSB>
				<ParagraphSB style={[styles.right, styles.totalArea]}>
					{convertToHa(totalArea)} {t("common.units.hectare")}
				</ParagraphSB>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	header: {
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		paddingBottom: 16,
	},
	meteoContainer: {
		marginTop: 16,
	},
	gradientSeparator: {
		height: 16,
		marginHorizontal: -Math.abs(HORIZONTAL_PADDING),
	},
	title: {
		marginLeft: 8,
	},
	editLabel: {
		color: COLORS.LAKE[100],
		marginRight: 8,
	},
	sidesWrapper: {
		alignItems: "center",
		flexDirection: "row",
	},
	weatherDetailsWrapper: {
		marginVertical: 16,
	},
	fieldContainer: {
		backgroundColor: COLORS.WHITE[100],
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	totalContainer: {
		paddingTop: 16,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	left: {
		flexDirection: "row",
		alignItems: "center",
		flex: 2,
	},
	noMeteoText: {
		color: COLORS.NIGHT[50],
		backgroundColor: COLORS.NIGHT[5],
		padding: 8,
		borderRadius: 4,
	},
	fieldName: {
		marginLeft: 8,
	},
	cropName: {
		color: COLORS.NIGHT[50],
	},
	middle: {
		flex: 2,
		textAlign: "right",
		flexDirection: "row",
		alignItems: "center",
	},

	right: {
		color: COLORS.NIGHT[50],
		flex: 1,
		textAlign: "right",
	},
	totalArea: {
		color: COLORS.NIGHT[100],
	},
});

export default ParcellesReportCard;
