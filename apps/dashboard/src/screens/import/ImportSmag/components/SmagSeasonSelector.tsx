import { useTranslation } from "react-i18next";
import SelectInput from "@Components/SelectInput";
import { useSeasons } from "@Hook/useSeasons";
import { components, DropdownIndicatorProps } from "react-select";
import BaseIcons from "@Icons/BaseIcons";
import { COLORS } from "@Constants/palette";

interface SmagSeasonSelectorProps {
	selectedYear: number;
	onChangeYear: (v: number) => void;
}

const DropdownIndicator = (props: DropdownIndicatorProps): JSX.Element => {
	return (
		<components.DropdownIndicator {...props}>
			<BaseIcons.Chevron fill={COLORS.NIGHT[100]} width={20} height={20} />
		</components.DropdownIndicator>
	);
};

const SmagSeasonSelector = ({ onChangeYear, selectedYear }: SmagSeasonSelectorProps): JSX.Element => {
	const { t } = useTranslation();
	const { yearRange } = useSeasons();
	const onChange = async ({ value }: { value: string; label: string }): Promise<void> => {
		if (value) {
			onChangeYear(parseInt(value, 10));
		}
	};

	return (
		<SelectInput
			placeholder={t("common.inputs.season.placeholder")}
			name="season"
			label="Saison"
			options={yearRange.map((y) => ({
				value: y.toString(),
				label: t("common.inputs.season.formattedValue", { year: y }),
			}))}
			value={
				selectedYear
					? {
							value: selectedYear?.toString(),
							label: t("common.inputs.season.formattedValue", { year: selectedYear }),
					  }
					: null
			}
			onChange={onChange}
			components={{ DropdownIndicator }}
		/>
	);
};

export default SmagSeasonSelector;
