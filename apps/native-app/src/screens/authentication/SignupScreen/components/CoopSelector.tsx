import Dropdown from "@Components/Dropdown";
import ParagraphLight from "@Components/ParagraphLight";
import Title from "@Components/Title";
import COLORS from "@Constants/palette";
import { UserContext } from "@Context/UserContext";
import { useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

interface CoopSelectorProps {
	value: { value: string; label: string };
	onSelect: (item: { value: string; label: string }) => void;
	error: { message?: string };
	disabled: boolean;
}

const CoopSelector = ({ value, onSelect, error, disabled }: CoopSelectorProps): JSX.Element => {
	const { t } = useTranslation();
	const { coops } = useContext(UserContext);
	const data = useMemo(() => coops.map((c) => ({ label: c.name, value: c.id.toString() })), [coops]);
	const labelStyle = disabled ? { color: COLORS.NIGHT[25] } : { color: COLORS.NIGHT[100] };

	const onSelectCoop = async (item: { value: string; label: string }): Promise<void> => {
		onSelect(item);
	};

	return (
		<>
			<Title style={error?.message ? styles.errorText : labelStyle}>{t("common.inputs.coop.label")}</Title>
			<Dropdown
				disabled={disabled}
				value={value?.value}
				onSelect={onSelectCoop}
				placeholder={t("common.inputs.coop.placeholder")}
				theme="light"
				data={data}
				hasError={!!error?.message}
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

export default CoopSelector;
