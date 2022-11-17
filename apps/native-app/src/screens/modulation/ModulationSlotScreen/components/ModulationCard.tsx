import { StyleProp, ViewStyle, View, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import COLORS from "@Constants/palette";
import ParagraphSB from "@Components/ParagraphSB";
import ProductFamilyIcons from "@Icons/ProductFamilyIcons";

interface ModulationCardProps {
	modulationWrapperCustomStyle?: StyleProp<ViewStyle>;
	enabled: boolean;
	modulation: number;
}

const ModulationCard = ({ modulationWrapperCustomStyle, modulation, enabled }: ModulationCardProps): JSX.Element => {
	const { t } = useTranslation();
	const textColor = enabled ? COLORS.WHITE[100] : COLORS.NIGHT[50];

	const backgroundColor = enabled ? COLORS.TANGERINE[100] : COLORS.NIGHT[5];
	return (
		<View style={[styles.modulationWrapper, modulationWrapperCustomStyle, { backgroundColor }]}>
			<ProductFamilyIcons.Product fill={textColor} width={24} height={24} />
			<ParagraphSB style={{ ...styles.modulationText, color: textColor }}>
				{`${modulation || modulation === 0 ? modulation.toFixed(0) : "..."}${t("common.units.percentage")}`}{" "}
				{t("screens.selectedSlot.potentialModulation")}
			</ParagraphSB>
		</View>
	);
};

const styles = StyleSheet.create({
	modulationWrapper: {
		borderRadius: 4,
		flexDirection: "row",
		width: 250,
		justifyContent: "center",
		paddingVertical: 8,
		paddingHorizontal: 16,
		alignItems: "center",
	},
	modulationText: {
		marginLeft: 8,
	},
});

export default ModulationCard;
