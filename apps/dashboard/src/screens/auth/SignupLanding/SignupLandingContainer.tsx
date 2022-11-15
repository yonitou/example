import { useNavigate } from "react-router-dom";
import SignupLanding from "./SignupLanding";

const SignupLandingContainer = (): JSX.Element => {
	const navigate = useNavigate();

	const onGoBack = (): void => navigate(-1);

	return <SignupLanding onGoBack={onGoBack} />;
};

export default SignupLandingContainer;
