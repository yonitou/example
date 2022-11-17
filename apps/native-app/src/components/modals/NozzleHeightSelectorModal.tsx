import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import HygoIcons from "@Icons/HygoIcons";
import COLORS from "@Constants/palette";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import BaseButton from "@Components/BaseButton";
import CircularButton from "../CircularButton";
import QuantitySelector from "../QuantitySelector";
import Modal, { ModalPropsType } from "./Modal";

export interface NozzleHeightSelectorModalPropsType extends ModalPropsType {
	defaultValue?: number;
	setInput?: (a: number) => void;
}

const NozzleHeightSelectorModal = ({
	modalVisible,
	defaultValue,
	setInput,
	hideModal,
}: NozzleHeightSelectorModalPropsType): JSX.Element => {
	const { t } = useTranslation();
	const [value, setValue] = useState<number>(defaultValue);
	const [selected, setSelected] = useState<string | number>(75);

	const heights = [
		{
			height: 50,
			icon: HygoIcons.PulvHeight50,
			label: `50 ${t("common.units.centimeters")}`,
		},
		{
			height: 75,
			icon: HygoIcons.PulvHeight75,
			label: `75 ${t("common.units.centimeters")}`,
		},
		{
			height: 90,
			icon: HygoIcons.PulvHeight90,
			label: `90 ${t("common.units.centimeters")}`,
		},
		{
			height: "other",
			icon: HygoIcons.PulvHeight90,
			label: t("common.other"),
		},
	];
	const handleSave = (): void => {
		setInput(value);
		hideModal();
	};
	const onSelectHauteur = (hauteur: string | number): void => {
		typeof hauteur === "number" && setValue(hauteur);
		setSelected(hauteur);
	};
	useEffect(() => {
		if (defaultValue && [50, 75, 90].includes(defaultValue)) {
			setSelected(defaultValue as string | number);
		} else {
			setSelected("other");
		}
	}, [defaultValue]);

	return (
		<Modal title={t("modals.nozzleHeight.title")} modalVisible={modalVisible} hideModal={hideModal}>
			<View style={styles.container}>
				<View style={styles.selector}>
					{heights.map((item) => {
						return (
							<CircularButton
								large={false}
								key={item.height}
								onPress={() => onSelectHauteur(item.height)}
								textStyle={selected === item.height ? styles.selected : null}
								title={item.label}
							>
								<item.icon fill={selected === item.height ? COLORS.LAKE[100] : COLORS.NIGHT[100]} />
							</CircularButton>
						);
					})}
				</View>
				{selected === "other" && (
					<View style={styles.quanitySelectorWrapper}>
						<QuantitySelector
							step={1}
							unit={t("common.units.centimeters")}
							value={value}
							onValueChange={setValue}
						/>
					</View>
				)}
				<BaseButton color={COLORS.LAKE} onPress={handleSave} disabled={!value} style={styles.btn}>
					{t("common.button.confirm")}
				</BaseButton>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: HORIZONTAL_PADDING,
	},

	selected: {
		color: COLORS.LAKE[100],
	},
	selector: {
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",
	},
	quanitySelectorWrapper: {
		marginTop: 16,
	},

	btn: {
		marginTop: 16,
	},
});

export default NozzleHeightSelectorModal;
