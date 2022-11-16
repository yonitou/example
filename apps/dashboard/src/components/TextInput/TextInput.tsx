import { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";

interface TextInputProps {
	name: string;
	defaultValue?: string | number;
	label?: string;
	placeholder?: string;
	rules?: Record<string, unknown>;
	error?: { message?: string };
	type?: string;
	autoComplete?: string;
	disabled?: boolean;
	unit?: string;
	onCustomChange?: (value: string) => void;
	placeholderIcon?: JSX.Element;
	autoCapitalize?: "off";
}

const StyledInputWrapper = styled.div<{ error: boolean; disabled: boolean; placeholderIcon: boolean }>`
	font-size: 1.4rem;
	font-family: "Nunito Bold";
	color: ${(props) => (props.error ? "var(--gaspacho-100)" : "inherit")};
	width: 100%;
	label {
		display: block;
		font-size: 1.4rem;
	}
	.field-wrapper {
		position: relative;

		input {
			width: 100%;
			height: 5.2rem;
			border: 1px solid var(${(props) => (props.error ? "--gaspacho-100" : "--night-25")});
			color: ${(props) => (props.error ? "var(--gaspacho-100)" : "var(--night-100)")};
			border-radius: 0.4rem;
			padding: 0;
			padding-left: ${(props) => (props.placeholderIcon ? "4rem" : "0.8rem")};
			outline: none;
			&.disabled {
				color: var(--night-25);
				background-color: var(--night-5);
			}
			&:focus {
				border: 1px solid var(--lake-100);
			}
			&::placeholder {
				font-size: 1.4rem;
				font-family: "Nunito Bold";
				color: var(--night-25);
			}
		}
		.unit {
			position: absolute;
			right: 0.8rem;
			top: 29%;
		}
		svg {
			position: absolute;
			left: 0.8rem;
			top: 25%;
		}
	}

	p {
		color: var(--gaspacho-100);
	}

	@media (max-width: 740px) {
		font-size: 1.6rem;
	}
`;

const TextInput = ({
	name,
	unit,
	label,
	placeholder,
	defaultValue,
	rules,
	autoComplete,
	disabled,
	error,
	placeholderIcon,
	autoCapitalize,
	onCustomChange,
	type = "text",
}: TextInputProps): JSX.Element => {
	const { register } = useFormContext();
	const registerOptions = onCustomChange
		? { ...rules, onChange: (e: ChangeEvent<HTMLInputElement>) => onCustomChange(e.target.value) }
		: rules;
	const { onChange, onBlur, ref } = register(name, registerOptions);
	return (
		<StyledInputWrapper error={!!error?.message} disabled={disabled} placeholderIcon={!!placeholderIcon}>
			{label && <label htmlFor={name}>{label}</label>}
			<div className="field-wrapper">
				<input
					name={name}
					type={type}
					ref={ref}
					onBlur={onBlur}
					onChange={onChange}
					autoCapitalize={autoCapitalize}
					placeholder={placeholder}
					disabled={disabled}
					className={disabled ? "disabled" : null}
					defaultValue={defaultValue}
					autoComplete={autoComplete}
				/>
				{placeholderIcon}
				{unit && <h3 className="unit">{unit}</h3>}
			</div>
			{error?.message && <p>{error.message}</p>}
		</StyledInputWrapper>
	);
};

export default TextInput;
