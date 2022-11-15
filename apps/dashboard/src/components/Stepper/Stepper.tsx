import { Fragment } from "react";
import styled from "styled-components";
import { COLORS } from "@Constants/palette";
import BaseIcons from "@Icons/BaseIcons";
import Divider from "../Divider";

interface StepperProps {
	numberOfSteps: number;
	activeStep: number;
}

const StyledStepper = styled.div`
	display: flex;
	align-items: center;
	max-width: 30%;
	margin: 0 auto;
	> * {
		margin: 3.25rem 0.3rem;
	}
	.step {
		width: 1.2rem;
		height: 1.2rem;
		background-color: var(--night-25);
		border-radius: 50%;
		&.completed {
			background-color: var(--tangerine-100);
		}
	}
`;

const Stepper = ({ numberOfSteps, activeStep }: StepperProps): JSX.Element => {
	const getStepStatus = (i: number): JSX.Element => {
		if (activeStep === i) return <BaseIcons.Drop />;
		if (activeStep > i) return <div className="step completed" />;
		return <div className="step" />;
	};
	return (
		<StyledStepper>
			{Array.from({ length: numberOfSteps }).map((_, i) => {
				const key = i;
				return (
					<Fragment key={key}>
						{getStepStatus(i)}
						{i < numberOfSteps - 1 && <Divider color={COLORS.NIGHT[25]} />}
					</Fragment>
				);
			})}
		</StyledStepper>
	);
};

export default Stepper;
