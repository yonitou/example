import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "@Context/AuthContext";
import Navbar from "@Components/Navbar";
import AppWrapper from "@Components/AppWrapper";
import { featuresEnum } from "@Types/feature.types";
import { useFeature } from "flagged";

const StyledContainer = styled.main`
	height: calc(100% - 68px);
`;

interface FarmerRoutesProps {
	feature: featuresEnum;
}

const FarmerRoutes = ({ feature }: FarmerRoutesProps): JSX.Element => {
	const { isAuth, farmerSelected, hasActivePlan } = useContext(AuthContext);
	const hasFeature = useFeature(feature);

	// Allow admins to have access to the Parcellaire page
	if (!isAuth || (!farmerSelected && feature !== featuresEnum.FARM_WEATHER)) {
		return <Navigate to="/" replace />;
	}

	if (farmerSelected && (!hasFeature || !hasActivePlan)) {
		return <Navigate to="/pricing" replace />;
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
export default FarmerRoutes;
