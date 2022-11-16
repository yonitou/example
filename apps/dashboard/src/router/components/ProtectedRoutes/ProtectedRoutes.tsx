import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "@Context/AuthContext";
import Navbar from "@Components/Navbar";
import AppWrapper from "@Components/AppWrapper";

const StyledContainer = styled.main`
	height: calc(100% - 68px);
`;

const ProtectedRoutes = (): JSX.Element => {
	const { isAuth, farmerSelected } = useContext(AuthContext);

	if (!isAuth || !farmerSelected) {
		return <Navigate to="/" replace />;
	}

	return (
		<AppWrapper>
			<Navbar />
			<StyledContainer>
				<Outlet />
			</StyledContainer>
		</AppWrapper>
	);
};
export default ProtectedRoutes;
