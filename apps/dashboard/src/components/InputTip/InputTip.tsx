import styled from "styled-components";

interface InputTipProps {
	children: string | JSX.Element | (string | JSX.Element)[];
}

const StyledTip = styled.div`
	background-color: var(--night-5);
	border-radius: 0.4rem;
	color: var(--night-100);
	padding: 0.8rem;
`;

const InputTip = ({ children }: InputTipProps): JSX.Element => {
	return <StyledTip className="input-tip">{children}</StyledTip>;
};

export default InputTip;
