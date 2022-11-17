import { useTranslation } from "react-i18next";
import CropIcon from "@Components/CropIcon";
import { StyleSheet, View } from "react-native";
import Title from "@Components/Title";
import { TouchableOpacity } from "react-native-gesture-handler";
import { cropType } from "@Types/crop.types";
import COLORS from "@Constants/palette";

interface AccordionSummaryProps {
	crop: cropType;
	getCheckboxIcon: () => JSX.Element;
	onClickCropCheckbox: () => void;
	selection: boolean;
}

const AccordionSummary = ({
	crop,
	getCheckboxIcon,
	onClickCropCheckbox,
	selection,
}: AccordionSummaryProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<View style={styles.container}>
			{selection && (
				<TouchableOpacity onPress={onClickCropCheckbox} activeOpacity={1} style={styles.checkbox}>
					{getCheckboxIcon()}
				</TouchableOpacity>
			)}
			<CropIcon crop={crop} fill={COLORS.NIGHT[100]} />
			<Title>{t(`crops.${crop?.name}`)}</Title>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
	},
	checkbox: {
		marginRight: 16,
	},
});

export default AccordionSummary;
