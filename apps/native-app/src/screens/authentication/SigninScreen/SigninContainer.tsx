import { Linking } from "react-native";
import { FieldValues, useForm } from "react-hook-form";
import { signInWithCredentials } from "@Api/hygoApi";
import { useTranslation } from "react-i18next";
import { AuthContext } from "@Context/AuthContext";
import { useContext, useState } from "react";
import Constants from "expo-constants";
import { SigninContainerProps } from "./screen.types";
import SigninScreen from "./SigninScreen";

const SigninContainer = ({ navigation }: SigninContainerProps): JSX.Element => {
	const { t } = useTranslation();
	const { control, handleSubmit, formState, setError } = useForm({ mode: "all" });
	const { login } = useContext(AuthContext);
	const [loading, setLoading] = useState<boolean>(false);

	const onSubmit = async (data: FieldValues): Promise<void> => {
		setLoading(true);
		try {
			const token = await signInWithCredentials({ email: data.email, password: data.password });
			if (token) await login(token);
		} catch (error) {
			setError("password", { type: "custom", message: t("screens.signIn.credentialsError") });
			setLoading(false);
			if (error?.response?.status !== 401) throw error;
		}
	};

	const onPasswordForgotten = (): Promise<void> =>
		Linking.openURL(`https://${Constants.manifest.extra.dashboardUrl}/reset-password`);
	const onNavBack = (): void => navigation.goBack();

	return (
		<SigninScreen
			control={control}
			formState={formState}
			handleSubmit={handleSubmit}
			onNavBack={onNavBack}
			loading={loading}
			onPasswordForgotten={onPasswordForgotten}
			onSubmit={onSubmit}
		/>
	);
};

export default SigninContainer;
