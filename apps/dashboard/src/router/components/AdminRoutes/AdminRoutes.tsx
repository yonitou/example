import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "@Context/AuthContext";
import Navbar from "@Components/Navbar";
import Sidebar from "@Components/Sidebar";
import AppWrapper from "@Components/AppWrapper";

const StyledContainer = styled.main`
	height: calc(100% - 68px);
	display: flex;
`;

const AdminRoutes = (): JSX.Element => {
	const { isAuth, superAdmin, farmerSelected } = useContext(AuthContext);

	if (!isAuth || !superAdmin || !farmerSelected) {
		return <Navigate to="/" replace />;
	}

	return (
		<AppWrapper>
			<Navbar />
			<StyledContainer>
				<Sidebar />
				<Outlet />
			</StyledContainer>
		</AppWrapper>
	);
};
export default AdminRoutes;
