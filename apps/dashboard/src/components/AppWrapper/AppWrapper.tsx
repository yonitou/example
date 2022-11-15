import styled from "styled-components";
import OnlyDesktop from "@Components/OnlyDesktop";

const StyledAppWrapper = styled.div<{ showOnMobile: boolean }>`
	height: 100%;
	@media (max-width: 740px) {
		main,
		nav {
			display: ${(props) => (props.showOnMobile ? "block" : "none")};
		}
	}
`;

interface AppWrapperProps {
	children: JSX.Element | JSX.Element[];
	className?: string;
	showOnMobile?: boolean;
}

const AppWrapper = ({ children, className, showOnMobile }: AppWrapperProps): JSX.Element => {
	return (
		<StyledAppWrapper className={className} showOnMobile={showOnMobile}>
			{!showOnMobile && <OnlyDesktop />}
			{children}
		</StyledAppWrapper>
	);
};

export default AppWrapper;
