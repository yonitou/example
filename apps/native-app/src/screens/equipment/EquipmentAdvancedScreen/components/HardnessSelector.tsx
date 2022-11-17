import { useMemo } from "react";
import { StyleSheet } from "react-native";
import Dropdown from "@Components/Dropdown";
import ParagraphLight from "@Components/ParagraphLight";
import Title from "@Components/Title";
import COLORS from "@Constants/palette";
import { hardnessList } from "@Types/hardness.types";
import { useTranslation } from "react-i18next";

interface HardnessSelectorProps {
	value: { value: string; label: string };
	onSelect: (item: { value: string; label: string }) => void;
	error: { message?: string };
	disabled: boolean;
}

const HardnessSelector = ({ value, onSelect, error, disabled }: HardnessSelectorProps): JSX.Element => {
	const { t } = useTranslation();
	const hardnessListData = useMemo(
		() =>
			hardnessList.map((h) => ({
				label: t(`screens.equipmentAdvancedScreen.components.hardnessSelector.${h}`),
				value: h,
			})),
		[t]
	);

	const labelStyle = disabled ? { color: COLORS.NIGHT[25] } : { color: COLORS.NIGHT[100] };

	const onSelectHardness = async (item: { value: string; label: string }): Promise<void> => {
		onSelect(item);
	};

	return (
		<>
			<Title style={error?.message ? styles.errorText : labelStyle}>Dureté</Title>
			<Dropdown
				value={value?.value}
				disabled={disabled}
				onSelect={onSelectHardness}
				sort={false}
				placeholder={t("components.hardnessSelector.placeholder")}
				theme="light"
				hasError={!!error?.message}
				data={hardnessListData}
			/>
			{!!error?.message && <ParagraphLight style={styles.errorText}>{error?.message}</ParagraphLight>}
		</>
	);
};

const styles = StyleSheet.create({
	errorText: {
		color: COLORS.GASPACHO[100],
	},
});

export default HardnessSelector;
