import { useTranslation } from "react-i18next";
import SelectInput from "@Components/SelectInput";
import { useSeasons } from "@Hook/useSeasons";
import { capitalize } from "@Utils/capitalize";
import DropdownIndicator from "./components/DropdownIndicator";

interface SeasonSelectorProps {
	className?: string;
	selectedSeason: Date[];
	onChangeSeason: (v: number) => void;
}

const SeasonSelector = ({ className, onChangeSeason, selectedSeason }: SeasonSelectorProps): JSX.Element => {
	const { t } = useTranslation();
	const { stepSeasons } = useSeasons();
	const onChange = async ({ value }: { value: string; label: string }): Promise<void> => {
		if (value) {
			onChangeSeason(parseInt(value, 10));
		}
	};
	const formatDate = (date: Date): string =>
		capitalize(date.toLocaleDateString(undefined, { month: "short", year: "numeric" }));

	return (
		<SelectInput
			placeholder={t("common.inputs.season.placeholder")}
			name="season"
			className={className}
			options={stepSeasons.map((s, i) => ({
				value: i.toString(),
				label: `${formatDate(s[0])} - ${formatDate(s[1])}`,
			}))}
			value={{
				value: stepSeasons.findIndex((s) => s[0].getTime() === selectedSeason[0].getTime()).toString(),
				label: `${formatDate(selectedSeason[0])} - ${formatDate(selectedSeason[1])}`,
			}}
			onChange={onChange}
			components={{ DropdownIndicator }}
		/>
	);
};

export default SeasonSelector;
