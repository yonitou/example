import Select, { InputProps, components as nativeSelectComponents } from "react-select";
import styled from "styled-components";

interface SelectInputProps {
	name: string;
	value?: { value: string; label: string };
	defaultValue?: { value: string; label: string };
	label?: string;
	placeholder?: string | JSX.Element;
	error?: { message?: string };
	options: { value: string; label: string }[];
	onChange: (option: unknown) => void;
	className?: string;
	disabled?: boolean;
	components?: { [key: string]: (props: unknown) => JSX.Element };
	openMenuOnClick?: boolean;
	noOptionsMessage?: () => string;
	inputRef?: (instance: unknown) => void;
	onBlur?: () => void;
	searchable?: boolean;
}

const StyledInputWrapper = styled.div<{ error: boolean }>`
	.react-select-container {
		width: 100%;
	}
	label {
		display: block;
		font-size: 1.4rem;
		font-family: "Nunito Bold";
		color: var(--night-100);
	}
	p {
		color: var(--gaspacho-100);
	}
	.react-select__control {
		cursor: pointer;

		height: 5.2rem;
		border-width: 1px;
		border-style: solid;
		border-color: var(${(props) => (props.error ? "--gaspacho-100" : "--night-25")}) !important;
		border-radius: 0.4rem;
		outline: none;

		.react-select__value-container {
			font-family: "Nunito Bold";
			font-size: 1.4rem;
			padding: 0 0.8rem;
			.react-select__input {
				color: ${(props) => (props.error ? "var(--gaspacho-100)" : "var(--night-100)")};
			}
			.react-select__single-value {
				color: ${(props) => (props.error ? "var(--gaspacho-100)" : "var(--night-100)")};
				margin-left: 0;
				margin-right: 0;
			}
		}
	}
	.react-select__placeholder {
		font-size: 1.4rem;
		font-family: "Nunito Bold";
		display: flex;
		align-items: center;
		color: ${(props) => (props.error ? "var(--gaspacho-100)" : "var(--night-100)")};
	}

	.react-select__control--is-focused {
		box-shadow: none;
	}
	.react-select__menu {
		z-index: 10;
		.react-select__menu-list {
			padding-top: 0;
			padding-bottom: 0;
			.react-select__option {
				display: flex;
				padding: 0.8rem;
				align-items: center;
				color: ${(props) => (props.error ? "var(--gaspacho-100)" : "var(--night-100)")};
				font-family: "Nunito Bold";
				font-size: 1.4rem;
			}
			.react-select__option--is-focused,
			.react-select__option:hover {
				cursor: pointer;
				background-color: var(--night-5);
			}
		}
	}
`;

const SelectInput = ({
	name,
	label,
	placeholder,
	value,
	className,
	error,
	components,
	defaultValue,
	options,
	disabled,
	openMenuOnClick = true,
	onChange,
	inputRef,
	noOptionsMessage,
	onBlur,
	searchable = false,
}: SelectInputProps): JSX.Element => {
	return (
		<StyledInputWrapper error={!!error?.message} className={className}>
			{label && <label htmlFor={name}>{label}</label>}
			<Select
				name={name}
				onChange={onChange}
				ref={inputRef}
				onBlur={onBlur}
				noOptionsMessage={noOptionsMessage}
				autoFocus={false}
				placeholder={placeholder}
				classNamePrefix="react-select"
				defaultValue={defaultValue}
				className="react-select-container"
				isSearchable={searchable}
				options={options}
				hideSelectedOptions
				isDisabled={disabled}
				value={value}
				components={{
					...components,
					IndicatorSeparator: () => null,
					// eslint-disable-next-line
					Input: (props: InputProps) => <nativeSelectComponents.Input {...props} autoComplete="off" />,
				}}
				openMenuOnClick={openMenuOnClick}
			/>

			{error?.message && <p>{error.message}</p>}
		</StyledInputWrapper>
	);
};

export default SelectInput;
