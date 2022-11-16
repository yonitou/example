import styled from "styled-components";

const StyledStepCard = styled.div`
	background-color: var(--white);
	padding: 1.6rem;
	overflow: hidden;
	.header {
		display: flex;
		align-items: center;
		margin-bottom: 1.6rem;
		.step-wrapper {
			color: var(--white);
			display: flex;
			align-items: center;
			width: 2.4rem;
			height: 2.4rem;
			justify-content: center;
			background: var(--gradient-tangerine);
			margin-right: 0.8rem;
			border-radius: 50%;
		}
	}
`;

interface StepCardProps {
	step: number;
	label: string;
	children: JSX.Element | JSX.Element[];
}

const StepCard = ({ step, label, children }: StepCardProps): JSX.Element => {
	return (
		<StyledStepCard>
			<div className="header">
				<div className="step-wrapper">
					<h3>{step}</h3>
				</div>
				<h3 className="label">{label}</h3>
			</div>
			{children}
		</StyledStepCard>
	);
};

export default StepCard;
