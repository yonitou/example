import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { checkEmailAndSendPasswordReset } from "@Api/api";
import EmailPasswordValidation from "./EmailPasswordValidation";
import { FormInputs } from "./emailPasswordValidation.types";

const EmailPasswordValidationContainer = (): JSX.Element => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const methods = useForm({ mode: "onChange" });
	const [loading, setLoading] = useState<boolean>(false);
	const [emailSent, setEmailSent] = useState<boolean>(false);

	const onSubmit = async ({ email }: FormInputs): Promise<void> => {
		setLoading(true);
		try {
			await checkEmailAndSendPasswordReset(email);
			setEmailSent(true);
		} catch (e) {
			methods.setError("email", { type: "custom", message: t("common.inputs.email.errors.invalid") });
		} finally {
			setLoading(false);
		}
	};

	const onGoBack = (): void => navigate(-1);

	return (
		<EmailPasswordValidation
			loading={loading}
			onGoBack={onGoBack}
			onSubmit={onSubmit}
			emailSent={emailSent}
			methods={methods}
		/>
	);
};

export default EmailPasswordValidationContainer;
