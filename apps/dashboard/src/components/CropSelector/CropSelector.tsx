import { useContext } from "react";
import { Control, Controller } from "react-hook-form";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { UserContext } from "@Context/UserContext";
import SelectInput from "@Components/SelectInput";
import ValueContainer from "./components/ValueContainer";
import Option from "./components/Option";

interface CropSelectorProps {
	control: Control;
	defaultValue?: { value: string; label: string };
}

const StyledCropSelector = styled(SelectInput)`
	.react-select__value-container {
		display: flex;
		align-items: center;
	}
`;

const CropSelector = ({ control, defaultValue }: CropSelectorProps): JSX.Element => {
	const { t } = useTranslation();
	const { crops } = useContext(UserContext);
	return (
		<Controller
			control={control}
			rules={{
				required: {
					value: true,
					message: t("common.inputs.crop.errors.required"),
				},
			}}
			name="crop"
			defaultValue={defaultValue}
			render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => {
				return (
					<StyledCropSelector
						name={name}
						inputRef={ref}
						onBlur={onBlur}
						onChange={onChange}
						value={value}
						label={t("common.inputs.crop.label")}
						placeholder={t("common.inputs.crop.placeholder")}
						error={error}
						options={crops.map((c) => ({ value: c.id.toString(), label: t(`crops.${c.name}`) }))}
						searchable
						components={{
							ValueContainer,
							Option,
						}}
					/>
				);
			}}
		/>
	);
};

export default CropSelector;
