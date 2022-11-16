import styled from "styled-components";

interface FormCardProps {
	children: JSX.Element | JSX.Element[];
	className?: string;
}

const StyledFormCard = styled.div`
	border-radius: 1.6rem;
	padding: 3.2rem 6.4rem;
	background-color: var(--white);
	width: 55%;
	@media (max-width: 740px) {
		width: 100%;
		height: 100%;
		border-radius: 0;
		padding: 4rem 1.6rem;
	}
`;

const FormCard = ({ children, className }: FormCardProps): JSX.Element => {
	return <StyledFormCard className={className}>{children}</StyledFormCard>;
};

export default FormCard;
