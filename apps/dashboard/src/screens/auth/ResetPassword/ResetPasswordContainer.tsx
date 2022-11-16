import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "@Api/api";
import ResetPassword from "./ResetPassword";
import { FormInputs } from "./resetPassword.types";

const ResetPasswordContainer = (): JSX.Element => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);
	const [passwordUpdated, setPasswordUpdated] = useState<boolean>(false);
	const methods = useForm({ mode: "onChange" });
	const { token } = useParams();

	const onSubmit = async ({ password }: FormInputs): Promise<void> => {
		setLoading(true);
		try {
			await resetPassword(password, token);
			setPasswordUpdated(true);
		} catch (e) {
			methods.setError("password", { type: "custom", message: t("common.snackbar.resetPassword.error") });
		}
		setLoading(false);
	};

	const onGoBack = (): void => navigate("/");

	return (
		<ResetPassword
			loading={loading}
			methods={methods}
			onSubmit={onSubmit}
			passwordUpdated={passwordUpdated}
			onGoBack={onGoBack}
		/>
	);
};

export default ResetPasswordContainer;
