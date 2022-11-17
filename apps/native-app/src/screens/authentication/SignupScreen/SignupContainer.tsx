import { useContext, useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { createUser, signInWithCredentials } from "@Api/hygoApi";
import { UserContext } from "@Context/UserContext";
import { useTranslation } from "react-i18next";
import { AuthContext } from "@Context/AuthContext";
import { newUserType } from "@Types/user.types";
import { SnackbarContext, SnackTypeEnum } from "@Context/SnackBarContext";

import { SignupContainerProps } from "./screen.types";
import SigninScreen from "./SignupScreen";

const SignupContainer = ({ navigation }: SignupContainerProps): JSX.Element => {
	const { coops } = useContext(UserContext);
	const defaultCoop = coops?.find((c) => c.defaultCoop);
	const { t } = useTranslation();
	const defaultValues = useMemo(
		(): FieldValues => ({ coop: { value: defaultCoop?.id.toString(), label: defaultCoop?.name } }),
		[defaultCoop]
	);
	const { control, handleSubmit, formState, trigger, watch, setValue, setError } = useForm({
		mode: "all",
		defaultValues,
	});

	const { showSnackbar } = useContext(SnackbarContext);
	const { login } = useContext(AuthContext);
	const [loading, setLoading] = useState<boolean>(false);
	const [activeStep, setActiveStep] = useState<1 | 2>(1);

	const goNextStep = async (): Promise<void> => {
		const isValid = await trigger(["email", "password", "phone"]);
		if (isValid) setActiveStep(2);
	};

	const goPreviousStep = (): void => setActiveStep(1);

	const onSubmit = async (data: FieldValues): Promise<void> => {
		setLoading(true);
		if (!data.location) {
			setError("googleAutocomplete", {
				type: "custom",
				message: t("common.inputs.location.errors.notFindable"),
			});
			setLoading(false);
			return;
		}

		const values: newUserType = {
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			level: 1,
			phone: data.phone,
			password: data.password,
			coopId: data.coop.value,
			location: data.location,
		};

		try {
			await createUser(values);
			const token = await signInWithCredentials({ email: values.email, password: values.password });
			if (token) await login(token);
		} catch (e) {
			if (e?.response?.data?.code === "alreadyExistUser") {
				setError("email", { type: "custom", message: t("common.inputs.email.errors.alreadyUsed") });
				setActiveStep(1);
			} else if (e?.response?.data?.code === "invalidEmailAdress") {
				setError("email", { type: "custom", message: t("common.inputs.email.errors.invalid") });
				setActiveStep(1);
			} else if (e?.response?.data?.code === "wrongPhoneNumberFormat") {
				setError("phone", { type: "custom", message: t("common.inputs.phone.errors.invalid") });
				setActiveStep(1);
			} else if (e?.response?.data?.code === "zipCodeNotFound") {
				setError("googleAutocomplete", {
					type: "custom",
					message: t("common.inputs.location.errors.notFindable"),
				});
			} else {
				showSnackbar(t("screens.signUp.serverError"), SnackTypeEnum.ERROR);
				throw e;
			}
		} finally {
			setLoading(false);
		}
	};

	const onNavBack = (): void => navigation.goBack();

	return (
		<SigninScreen
			control={control}
			formState={formState}
			goNextStep={goNextStep}
			goPreviousStep={goPreviousStep}
			onSubmit={onSubmit}
			setValue={setValue}
			values={watch()}
			activeStep={activeStep}
			handleSubmit={handleSubmit}
			onNavBack={onNavBack}
			loading={loading}
		/>
	);
};

export default SignupContainer;
