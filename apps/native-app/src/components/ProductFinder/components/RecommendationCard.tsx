import ParagraphSB from "@Components/ParagraphSB";
import { ModalsContext } from "@Context/ModalContext";
import HygoIcons from "@Icons/HygoIcons";
import { recommendationType } from "@Types/tank.types";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Analytics from "@Analytics";
import { recommendationDetails } from "./RecommendationCard.helpers";

interface RecommendationCardProps {
	recommendation: keyof recommendationType;
}

const RecommendationCard = ({ recommendation }: RecommendationCardProps): JSX.Element => {
	const { t } = useTranslation();
	const { setRecommendationDetailsModalProps } = useContext(ModalsContext);
	const { logAnalyticEvent } = Analytics;

	const { colorPalette, Icon, clickable, withProductsExamples } = recommendationDetails[recommendation];

	const onPress = (): void => {
		logAnalyticEvent(recommendationDetails[recommendation].analyticEvent);
		setRecommendationDetailsModalProps({
			visibility: true,
			props: {
				icon: <Icon width={24} height={24} fill={colorPalette[100]} />,
				recommendation,
				withProductsExamples,
			},
		});
	};

	return (
		<TouchableOpacity
			style={{ ...styles.restrictedMix, backgroundColor: colorPalette[10], borderColor: colorPalette[100] }}
			disabled={!clickable}
			onPress={onPress}
		>
			<Icon width={24} height={24} fill={colorPalette[100]} style={styles.icon} />
			<ParagraphSB style={styles.text}>{t(`recommendations.${recommendation}.card.title`)}</ParagraphSB>
			{clickable && <HygoIcons.ChevronRight width={16} height={16} fill={colorPalette[100]} />}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	restrictedMix: {
		flexDirection: "row",
		alignItems: "center",
		padding: 8,
		borderWidth: 1,
		borderRadius: 4,
	},
	text: {
		flex: 1,
	},
	icon: {
		marginRight: 8,
	},
});

export default RecommendationCard;
