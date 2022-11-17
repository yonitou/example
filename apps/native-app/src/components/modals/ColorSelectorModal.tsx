import { StyleSheet, View } from "react-native";
import { nozzleColorsEnum } from "@Types/nozzle.types";
import { useTranslation } from "react-i18next";
import { NOZZLE_COLORS } from "@Constants/palette";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import Modal, { ModalPropsType } from "./Modal";
import CircularButton from "../CircularButton";

export interface ColorSelectorModalPropsType extends ModalPropsType {
	onColorChange: (c: nozzleColorsEnum) => void;
}

const ColorSelectorModal = ({ modalVisible, hideModal, onColorChange }: ColorSelectorModalPropsType): JSX.Element => {
	const { t } = useTranslation();
	const onButtonClick = (color: nozzleColorsEnum): void => {
		onColorChange(color);
		hideModal();
	};
	return (
		<Modal title={t("modals.colorSelector.title")} modalVisible={modalVisible} hideModal={hideModal}>
			<View style={styles.container}>
				{Object.values(nozzleColorsEnum).map((color) => {
					return (
						<View key={color} style={styles.colorButton}>
							<CircularButton
								large={false}
								backgroundColor={NOZZLE_COLORS[color]}
								onPress={() => onButtonClick(color)}
								title={t(`common.colors.${color}`)}
							/>
						</View>
					);
				})}
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: HORIZONTAL_PADDING,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		flexWrap: "wrap",
	},
	colorButton: {
		alignItems: "center",
		justifyContent: "center",
		width: 85,
		height: 85,
	},
});

export default ColorSelectorModal;
