import AuthenticationLandingScreen from "./AuthenticationLandingScreen";
import { AuthenticationLandingContainerProps } from "./screen.types";

const AuthenticationLandingContainer = ({ navigation }: AuthenticationLandingContainerProps): JSX.Element => {
	const goToBarcode = (): void => navigation.navigate("BarCodeScreen");

	const goToSignin = (): void => navigation.navigate("SigninScreen");
	const goToSignup = (): void => navigation.navigate("SignupScreen");

	return <AuthenticationLandingScreen goToBarcode={goToBarcode} goToSignin={goToSignin} goToSignup={goToSignup} />;
};

export default AuthenticationLandingContainer;
