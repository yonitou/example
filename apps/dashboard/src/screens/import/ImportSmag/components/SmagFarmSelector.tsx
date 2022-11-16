import SelectInput from "@Components/SelectInput";
import { components, DropdownIndicatorProps } from "react-select";
import BaseIcons from "@Icons/BaseIcons";
import { COLORS } from "@Constants/palette";
import { smagFarm } from "@Types/smag.types";
import { useTranslation } from "react-i18next";

interface SmagFarmSelectorProps {
	className: string;
	selectedFarm: smagFarm;
	onChangeFarm: (uuid: string) => void;
	smagFarms: smagFarm[];
}

const DropdownIndicator = (props: DropdownIndicatorProps): JSX.Element => {
	return (
		<components.DropdownIndicator {...props}>
			<BaseIcons.Chevron fill={COLORS.NIGHT[100]} width={20} height={20} />
		</components.DropdownIndicator>
	);
};

const SmagFarmSelector = ({ className, onChangeFarm, selectedFarm, smagFarms }: SmagFarmSelectorProps): JSX.Element => {
	const { t } = useTranslation();
	const onChange = async ({ value }: { value: string; label: string }): Promise<void> => {
		if (value) onChangeFarm(value);
	};

	return (
		<SelectInput
			placeholder={t("screens.importSmag.smagFarmSelector.placeholder")}
			name="smagFarm"
			className={className}
			label={t("screens.importSmag.smagFarmSelector.label")}
			options={smagFarms.map((f) => ({
				value: f.uuid,
				label: f.name,
			}))}
			value={
				selectedFarm
					? {
							value: selectedFarm.uuid,
							label: selectedFarm.name,
					  }
					: null
			}
			onChange={onChange}
			components={{ DropdownIndicator }}
		/>
	);
};

export default SmagFarmSelector;
