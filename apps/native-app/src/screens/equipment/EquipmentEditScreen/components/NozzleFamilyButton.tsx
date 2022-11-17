import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { nozzleFamilyEnum } from "@Types/nozzle.types";
import COLORS from "@Constants/palette";
import ParagraphSB from "@Components/ParagraphSB";
import NozzleFamilyImage from "./NozzleFamilyImage";

interface NozzleFamilyButtonProps {
	family: nozzleFamilyEnum;
	selected: boolean;
	onPress: (family: nozzleFamilyEnum) => void;
}

const NozzleFamilyName = (family: nozzleFamilyEnum): string => {
	const { t } = useTranslation();
	switch (family) {
		case nozzleFamilyEnum.STANDARD:
			return t("common.nozzleType.standard");
		case nozzleFamilyEnum.INJECTION:
			return t("common.nozzleType.injection");
		case nozzleFamilyEnum.LOW_PRESSURE:
			return t("common.nozzleType.low");
		case nozzleFamilyEnum.CALIBRATE:
			return t("common.nozzleType.calibrate");
		default:
			return "";
	}
};

const NozzleFamilyButton = ({ family, selected, onPress }: NozzleFamilyButtonProps): JSX.Element => (
	<View style={styles.nozzleType}>
		<TouchableOpacity
			style={[styles.nozzleTypeButton, selected && styles.nozzleSelected]}
			onPress={() => onPress(family)}
			activeOpacity={1}
		>
			<NozzleFamilyImage family={family} />
		</TouchableOpacity>
		<ParagraphSB style={[styles.nozzleTypeName, selected && styles.textSelected]}>
			{NozzleFamilyName(family)}
		</ParagraphSB>
	</View>
);

const styles = StyleSheet.create({
	nozzleType: {
		alignItems: "center",
		width: 100,
		height: 85,
	},
	nozzleTypeName: {
		marginTop: 4,
	},
	nozzleTypeButton: {
		width: 60,
		height: 60,
		backgroundColor: COLORS.WHITE[100],
		justifyContent: "center",
		shadowColor: COLORS.NIGHT[50],
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.19,
		shadowRadius: 5.62,
		elevation: 6,
		alignItems: "center",
		borderRadius: 4,
	},
	nozzleSelected: {
		borderColor: COLORS.TANGERINE[100],
		borderWidth: 2,
	},
	textSelected: {
		color: COLORS.TANGERINE[100],
	},
});

export default NozzleFamilyButton;
