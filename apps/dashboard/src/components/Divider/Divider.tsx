import styled from "styled-components";

interface DividerProps {
	text?: string;
	color?: string;
}

const StyledDivider = styled.div`
	display: flex;
	justify-content: center;
	flex: 1;
	align-items: center;
	margin: 4rem 0;
	div {
		height: 1px;
		width: 100%;
		background-color: ${(props) => props.color || "var(--night-50)"};
		flex: 1;
	}
	h5 {
		margin: 0 2.4rem;
	}
`;

const Divider = ({ text, color }: DividerProps): JSX.Element => {
	return (
		<StyledDivider color={color}>
			<div className="left" />
			{text ? <h5>{text}</h5> : <div className="left" />}
			<div className="right" />
		</StyledDivider>
	);
};

export default Divider;
