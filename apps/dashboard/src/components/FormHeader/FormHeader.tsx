import styled from "styled-components";

interface FormHeaderProps {
	title: string;
	subTitle?: string;
	backIcon?: JSX.Element;
	onGoBack?: () => void;
}

const StyledHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	.left {
		flex: 1;
		cursor: pointer;
	}
	&::after {
		flex: 1;
		content: "";
	}
	.center {
		text-align: center;
	}
	@media (max-width: 740px) {
		.left * {
			display: none;
		}
	}
`;

const FormHeader = ({ title, subTitle, backIcon, onGoBack }: FormHeaderProps): JSX.Element => {
	return (
		<StyledHeader>
			{backIcon && onGoBack ? (
				<div className="left" onClick={onGoBack} role="button" onKeyDown={onGoBack} tabIndex={0}>
					{backIcon}
				</div>
			) : (
				<div className="left" />
			)}
			<div className="center">
				<h2>{title}</h2>
				{subTitle && <h3>{subTitle}</h3>}
			</div>
		</StyledHeader>
	);
};

export default FormHeader;
