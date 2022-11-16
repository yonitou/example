import BaseIcons from "@Icons/BaseIcons";
import classNames from "classnames";
import styled from "styled-components";

interface ButtonProps {
	color: "lake" | "tangerine" | "gaspacho";
	isSubmitBtn?: boolean;
	className?: string;
	onClick?: () => void;
	disabled?: boolean;
	text: string;
	outlined?: boolean;
	"data-cb-type"?: string;
	"data-cb-item-0"?: string;
	"data-cb-item-0-quantity"?: string;
	"data-cb-item-1"?: string;
	"data-cb-item-1-quantity"?: string;
	width?: string;
	loading?: boolean;
	icon?: JSX.Element;
}

const StyledButton = styled.button<ButtonProps>`
	width: ${(props) => props.width};
	height: 5.6rem;
	display: flex;
	justify-content: center;
	align-items: center;
	color: var(--white);
	background-color: var(--${(props) => props.color}-100);
	border-radius: 0.8rem;
	border: none;
	transition: background-color 0.1s ease-out;
	outline: none;
	cursor: pointer;
	svg {
		margin-right: 0.8rem;
	}

	&:hover {
		background-color: var(--${(props) => props.color}-hover);
	}
	&:disabled {
		background-color: var(--night-5);
		color: var(--night-50);
		cursor: unset;
		svg path {
			fill: var(--night-50);
		}
		&.loading {
			background-color: var(--${(props) => props.color}-50);
			color: var(--white);
			.btn-loader {
				margin-right: 0 !important;
				margin-left: 0.8rem;
			}
			svg path {
				fill: var(--white);
			}
		}
	}
`;

const StyledOutlinedButton = styled(StyledButton)`
	background-color: var(--white);
	color: var(--${(props) => props.color}-100);
	border: 1px solid var(--${(props) => props.color}-50);
	svg path {
		fill: var(--${(props) => props.color}-100);
	}
	&:hover {
		background-color: var(--${(props) => props.color}-25);
	}
	&:disabled {
		background-color: var(--white);
		border: 1px solid var(--night-25);
		&.loading {
			background-color: var(--white);
			border: 1px solid var(--${(props) => props.color}-50);
			color: var(--${(props) => props.color}-50);
			.btn-loader {
				fill: var(--${(props) => props.color}-50);
			}
		}
	}
`;

const Button = ({
	text,
	className,
	onClick,
	color,
	loading,
	disabled,
	width = "100%",
	"data-cb-type": dataCbType,
	"data-cb-item-0": dataCbItem0,
	"data-cb-item-0-quantity": dataCbItem0Quantity,
	"data-cb-item-1": dataCbItem1,
	"data-cb-item-1-quantity": dataCbItem1Quantity,
	isSubmitBtn = false,
	outlined = false,
	icon,
}: ButtonProps): JSX.Element => {
	return (
		<StyledButton
			type={isSubmitBtn ? "submit" : "button"}
			className={loading ? classNames("loading", className) : className}
			onClick={onClick}
			disabled={loading || disabled}
			width={width}
			color={color}
			as={outlined && StyledOutlinedButton}
			data-cb-type={dataCbType}
			data-cb-item-0={dataCbItem0}
			data-cb-item-0-quantity={dataCbItem0Quantity}
			data-cb-item-1={dataCbItem1}
			data-cb-item-1-quantity={dataCbItem1Quantity}
		>
			{icon}
			<h3>{text}</h3>
			{loading && <BaseIcons.ThreeDotsLoading className="btn-loader" width={32} height={8} />}
		</StyledButton>
	);
};

export default Button;
