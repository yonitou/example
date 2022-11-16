import { Link } from "react-router-dom";
import styled from "styled-components";

interface CardProps {
	disabled?: boolean;
	imageWidth: number;
	image: string;
	path: string;
	title: string;
	subTitle?: string;
}

const StyledCard = styled(Link)`
	height: 26.5rem;
	width: 45%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-decoration: none;
	border: 1px solid var(--lake-100);
	border-radius: 0.8rem;
	padding: 0 1rem;
	transition: background-color 0.1s ease-out;
	h3 {
		text-align: center;
		color: var(--night-100);
		margin-top: 1.2rem;
	}
	h5 {
		text-align: center;
		color: var(--night-50);
	}
	&:hover {
		background-color: var(--lake-25);
	}
	&.disabled {
		border: 1px solid var(--night-25);
		pointer-events: none;
	}
`;

const Card = ({ disabled = false, image, path, imageWidth, title, subTitle }: CardProps): JSX.Element => {
	return (
		<StyledCard to={path} className={disabled ? "disabled" : null}>
			<img src={image} alt={title} width={imageWidth} />
			<h3>{title}</h3>
			{subTitle && <h5>{subTitle}</h5>}
		</StyledCard>
	);
};

export default Card;
