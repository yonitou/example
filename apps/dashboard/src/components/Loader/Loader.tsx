import styled from "styled-components";
import spinner from "@Assets/spinner.gif";

const StyledLoader = styled.div`
	height: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	h3 {
		margin-top: 3.2rem;
	}
	img {
		width: 8rem;
		height: 8rem;
	}
`;

interface LoaderProps {
	message?: string;
	className?: string;
}
const Loader = ({ message, className }: LoaderProps): JSX.Element => {
	return (
		<StyledLoader className={className}>
			<img src={spinner} alt="loading" />
			{message && <h3>{message}</h3>}
		</StyledLoader>
	);
};

export default Loader;
