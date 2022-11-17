import { AuthContext } from "@Context/AuthContext";
import { UserContext } from "@Context/UserContext";
import { useContext } from "react";
import AuthenticationLandingScreen from "./AdminLandingScreen";

const AdminLandingContainer = (): JSX.Element => {
	const { user } = useContext(AuthContext);
	const { coops } = useContext(UserContext);

	const coop = coops?.find((c) => c?.id === user?.admin?.coopId);

	return <AuthenticationLandingScreen coop={coop} />;
};

export default AdminLandingContainer;
