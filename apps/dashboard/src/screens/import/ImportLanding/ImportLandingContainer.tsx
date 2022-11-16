import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@Context/UserContext";
import { OADContext } from "@Context/OADContext";
import ImportLanding from "./ImportLanding";

const ImportLandingContainer = (): JSX.Element => {
	const { defaultFarm } = useContext(UserContext);
	const { loggedInSmag } = useContext(OADContext);
	const navigate = useNavigate();

	const goToDashboard = (): void => navigate("/");

	return <ImportLanding defaultFarm={defaultFarm} goToDashboard={goToDashboard} loggedInSmag={loggedInSmag} />;
};

export default ImportLandingContainer;
