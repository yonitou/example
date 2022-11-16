import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "@Context/AuthContext";
import AppWrapper from "@Components/AppWrapper";

const StyledContainer = styled.main`
	height: 100%;
`;

interface PublicRouteProps {
	allowedMobilePaths?: string[];
}

const PublicRoutes = ({ allowedMobilePaths }: PublicRouteProps): JSX.Element => {
	const { isAuth } = useContext(AuthContext);
	const location = useLocation();
	const showOnMobile = location.pathname.split("/").some((item) => allowedMobilePaths.includes(item));

	if (isAuth) {
		return <Navigate to="/dashboard" replace />;
	}

	return (
		<AppWrapper showOnMobile={showOnMobile}>
			<StyledContainer>
				<Outlet />
			</StyledContainer>
		</AppWrapper>
	);
};
export default PublicRoutes;
