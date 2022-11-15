import styled from "styled-components";

const StyledContainer = styled.div<ContainerWithBgImageProps>`
	display: ${(props) => (props.centered ? "flex" : "block")};
	align-items: center;
	justify-content: center;
	background-image: url(${(props) => props.backgroundImage});
	background-position: center;
	background-size: 100% 100vh;
	height: 100%;
`;

interface ContainerWithBgImageProps {
	backgroundImage: string;
	className?: string;
	children?: JSX.Element | JSX.Element[];
	centered?: boolean;
}
const ContainerWithBgImage = ({
	backgroundImage,
	children,
	className,
	centered = true,
}: ContainerWithBgImageProps): JSX.Element => {
	return (
		<StyledContainer backgroundImage={backgroundImage} className={className} centered={centered}>
			{children}
		</StyledContainer>
	);
};

export default ContainerWithBgImage;
