import TextInput from "@Components/TextInput";
import { COLORS } from "@Constants/palette";
import BaseIcons from "@Icons/BaseIcons";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const StyledSearchInput = styled(TextInput)``;

interface SearchInputProps {
	name: string;
	onCustomChange: (value: string) => void;
}

const SearchInput = ({ name, onCustomChange }: SearchInputProps): JSX.Element => {
	const { t } = useTranslation();
	const methods = useForm();

	return (
		<FormProvider {...methods}>
			<StyledSearchInput
				name={name}
				onCustomChange={onCustomChange}
				placeholder={t("components.searchInput.placeholderr")}
				// TODO remove rr
				placeholderIcon={<BaseIcons.MagnifyingGlass width={24} height={24} fill={COLORS.NIGHT[50]} />}
			/>
		</FormProvider>
	);
};

export default SearchInput;
