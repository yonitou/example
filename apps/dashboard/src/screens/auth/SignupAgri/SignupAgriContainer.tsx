import { useContext, useEffect, useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { checkToken, createUser } from "@Api/api";
import { AuthContext } from "@Context/AuthContext";
import { newUserType } from "@Types/newUser.types";
import { UserContext } from "@Context/UserContext";
import { userLevelEnum } from "@Types/user.types";
import SignupAgri from "./SignupAgri";
import { formValuesType } from "./signupAgri.types";

const SignupAgriContainer = (): JSX.Element => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { signin } = useContext(AuthContext);
	const { coops } = useContext(UserContext);
	const defaultCoop = coops?.find((c) => c.defaultCoop);

	const defaultValues = useMemo(
		(): FieldValues => ({ coop: { value: defaultCoop?.id.toString(), label: defaultCoop?.name } }),
		[defaultCoop]
	);

	const methods = useForm({ mode: "all" });
	const [activeStep, setActiveStep] = useState<number>(0);
	const [loading, setLoading] = useState(false);
	const [serverError, setServerError] = useState<boolean>();

	const goNextStep = async (): Promise<void> => {
		const isValid = await methods.trigger(["email", "password", "phone"]);
		if (isValid) setActiveStep((s) => s + 1);
	};

	const goPreviousStep = async (): Promise<void> => setActiveStep((s) => s - 1);

	const onGoBack = (): void => navigate(-1);

	const createNewUser = async (formValues: formValuesType): Promise<void> => {
		setLoading(true);
		setServerError(null);
		if (!formValues.location) {
			methods.setError("googleAutocomplete", {
				type: "custom",
				message: t("common.inputs.location.errors.notFindable"),
			});
			setLoading(false);
			return;
		}

		const values: newUserType = {
			firstName: formValues.firstName,
			lastName: formValues.lastName,
			email: formValues.email,
			level: formValues.level,
			phone: formValues.phone,
			password: formValues.password,
			coopId: formValues.coop.value,
			location: formValues.location,
		};

		try {
			await createUser(values);
			const token = await checkToken({ email: values.email, password: values.password });
			if (token) await signin(token);
		} catch (e) {
			if (e?.response?.data?.code === "alreadyExistUser") {
				methods.setError("email", { type: "custom", message: t("common.inputs.email.errors.alreadyUsed") });
				setActiveStep(0);
			} else if (e?.response?.data?.code === "invalidEmailAdress") {
				methods.setError("email", { type: "custom", message: t("common.inputs.email.errors.invalid") });
				setActiveStep(0);
			} else if (e?.response?.data?.code === "wrongPhoneNumberFormat") {
				methods.setError("phone", { type: "custom", message: t("common.inputs.phone.errors.invalid") });
				setActiveStep(0);
			} else if (e?.response?.data?.code === "zipCodeNotFound") {
				methods.setError("googleAutocomplete", {
					type: "custom",
					message: t("common.inputs.location.errors.notFindable"),
				});
			} else {
				setServerError(true);
				throw e;
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		methods.reset(defaultValues);
	}, [methods, defaultValues]);

	return (
		<SignupAgri
			onClickCreateAccount={createNewUser}
			activeStep={activeStep}
			goNextStep={goNextStep}
			goPreviousStep={goPreviousStep}
			onGoBack={onGoBack}
			methods={methods}
			serverError={serverError}
			loading={loading}
			level={userLevelEnum.FARMER}
		/>
	);
};

export default SignupAgriContainer;
