import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { checkToken } from "@Api/api";
import { AuthContext } from "@Context/AuthContext";
import SignIn from "./Signin";
import { FormInputs } from "./signin.types";

const SigninContainer = (): JSX.Element => {
	const { t } = useTranslation();
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);
	const methods = useForm({ shouldFocusError: false });
	const onSubmit = async ({ email, password }: FormInputs): Promise<void> => {
		setLoading(true);
		try {
			const token = await checkToken({ email, password });
			await authContext.signin(token);
		} catch (e) {
			methods.setError("email", { type: "custom" });
			methods.setError("password", { type: "custom", message: t("screens.signin.credentialsError") });
		} finally {
			setLoading(false);
		}
	};

	const onClickSignUp = (): void => navigate("/signup");

	return <SignIn loading={loading} onSubmit={onSubmit} methods={methods} onClickSignUp={onClickSignUp} />;
};

export default SigninContainer;
