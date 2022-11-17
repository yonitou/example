import { useContext } from "react";
import { AuthContext } from "@Context/AuthContext";
import NeedSetupScreen from "./NeedSetupScreen";

const NeedSetupContainer = (): JSX.Element => {
	const { authError, logout } = useContext(AuthContext);

	return <NeedSetupScreen error={authError} logout={logout} />;
};

export default NeedSetupContainer;
