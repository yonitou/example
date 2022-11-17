import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import COLORS from "@Constants/palette";
import HygoIcons from "@Icons/HygoIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Title from "@Components/Title";
import { targetType } from "@Types/target.types";
import ParagraphSB from "@Components/ParagraphSB";
import TargetIcon from "@Components/TargetIcon";

interface TargetsReportCardProps {
	selectedTargets: targetType[];
	onRequestEdit: () => void;
}

const TargetsReportCard = ({ selectedTargets, onRequestEdit }: TargetsReportCardProps): JSX.Element => {
	const { t } = useTranslation();

	return (
		<>
			<View style={styles.header}>
				<View style={styles.sidesWrapper}>
					<HygoIcons.Aim fill={COLORS.LAKE[100]} width={24} height={24} />
					<Title style={styles.title}>{t("components.targetsReportCard.title")}</Title>
				</View>

				<TouchableOpacity style={styles.sidesWrapper} onPress={onRequestEdit}>
					<Title style={styles.editLabel}>{t("common.button.edit")}</Title>
					<HygoIcons.SimpleArrowRight fill={COLORS.LAKE[100]} width={16} height={16} />
				</TouchableOpacity>
			</View>
			<View style={styles.productsContainer}>
				{selectedTargets?.length > 0 ? (
					selectedTargets?.map((target, i, arr) => {
						const isLast = i === arr.length - 1;
						const marginBottom = isLast ? 0 : 16;
						return (
							<View style={{ ...styles.targetWrapper, marginBottom }} key={target.id}>
								<TargetIcon target={target} fill={COLORS.NIGHT[100]} width={20} height={20} />
								<ParagraphSB>{target.name}</ParagraphSB>
							</View>
						);
					})
				) : (
					<ParagraphSB style={styles.noTargetsText}>
						{t("components.targetsReportCard.noTargets")}
					</ParagraphSB>
				)}
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	productsContainer: {
		marginTop: 16,
	},
	noTargetsText: {
		color: COLORS.NIGHT[50],
	},
	targetWrapper: {
		flexDirection: "row",
		alignItems: "center",
	},
	header: {
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
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
});

export default TargetsReportCard;
