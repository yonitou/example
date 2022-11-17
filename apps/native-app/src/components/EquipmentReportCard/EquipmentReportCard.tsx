import { StyleSheet, View } from "react-native";

import { textReducer } from "@Utils/hygoUtils";
import HygoIcons from "@Icons/HygoIcons";
import { nozzleType } from "@Types/nozzle.types";
import { productUnitEnum } from "@Types/activeProduct.types";
import COLORS, { NOZZLE_COLORS } from "@Constants/palette";

import Title from "@Components/Title";
import CircularButton from "@Components/CircularButton";
import ParagraphSB from "@Components/ParagraphSB";
import { useTranslation } from "react-i18next";

interface EquipmentReportCardProps {
	debit: number;
	nozzle: nozzleType;
	onRequestEditNozzle: () => void;
	onRequestEditDebit: () => void;
}

const EquipmentReportCard = ({
	nozzle,
	debit,
	onRequestEditDebit,
	onRequestEditNozzle,
}: EquipmentReportCardProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<>
			<View style={styles.header}>
				<View style={styles.sidesWrapper}>
					<HygoIcons.PulvEquipment fill={COLORS.LAKE[100]} width={24} height={24} />
					<Title style={styles.title}>{t("components.equipmentReportCard.title")}</Title>
				</View>
			</View>

			<View style={styles.cardBody}>
				<CircularButton
					onPress={onRequestEditNozzle}
					title={nozzle?.name ? textReducer(nozzle.name, 15) : t("common.equipment.emptyNozzle")}
				>
					<HygoIcons.Nozzle
						fill={nozzle?.color ? NOZZLE_COLORS[nozzle.color] : COLORS.WHITE[100]}
						width={30}
						height={40}
					/>
				</CircularButton>
				<CircularButton onPress={onRequestEditDebit} title={t("common.equipment.pressure")}>
					<>
						<Title>{debit}</Title>
						<ParagraphSB style={styles.unitDebit}>{productUnitEnum.LITER_PER_HA}</ParagraphSB>
					</>
				</CircularButton>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	header: {
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
	},
	title: {
		marginLeft: 8,
	},

	sidesWrapper: {
		alignItems: "center",
		flexDirection: "row",
	},

	unitDebit: {
		color: COLORS.NIGHT[50],
	},
	cardBody: {
		justifyContent: "space-around",
		alignItems: "center",
		flexDirection: "row",
		marginTop: 16,
	},
});

export default EquipmentReportCard;
