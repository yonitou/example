import COLORS from "@Constants/palette";
import HygoIcons from "@Icons/HygoIcons";
import Title from "@Components/Title";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import { cropType } from "@Types/crop.types";
import CropIcon from "@Components/CropIcon";
import { useTranslation } from "react-i18next";

interface CropCardProps {
	crop: cropType;
	onPress: (c: cropType) => void;
}

const CropCard = ({ crop, onPress }: CropCardProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<TouchableOpacity onPress={() => onPress(crop)} style={styles.cropCardWrapper}>
			<View style={styles.cropNameWrapper}>
				<CropIcon crop={crop} fill={COLORS.NIGHT[100]} />
				<Title>{t(`crops.${crop.name}`)}</Title>
			</View>

			<HygoIcons.ChevronRight fill={COLORS.NIGHT[100]} width={24} height={24} />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	cropCardWrapper: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 16,
		paddingHorizontal: 8,
		backgroundColor: COLORS.WHITE[100],
		marginHorizontal: HORIZONTAL_PADDING,
		borderRadius: 8,
		shadowColor: COLORS.NIGHT[50],
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.19,
		shadowRadius: 5.62,
		elevation: 6,
	},
	cropNameWrapper: {
		flexDirection: "row",
		alignItems: "center",
	},
});

export default CropCard;
