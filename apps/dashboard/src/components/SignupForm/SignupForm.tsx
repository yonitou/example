import styled from "styled-components";
import { Trans, useTranslation } from "react-i18next";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { useContext } from "react";
import { UserContext } from "@Context/UserContext";
import { emailRegEx } from "@Utils/emailRegEx";
import { phoneRegEx } from "@Utils/phoneRegEx";
import SelectInput from "@Components/SelectInput";
import GooglePlacesAutocomplete from "@Components/GooglePlacesAutocomplete";
import TextInput from "../TextInput";
import Button from "../Button";
import PasswordStrength from "../PasswordStrength";
import InputTip from "../InputTip";

interface SignupFormProps {
	errors: FieldErrors;
	goNextStep: () => void;
	control: Control;
	step: number;
	serverError: boolean;
	loading: boolean;
	setValue: (name: string, value: unknown) => void;
	values: Record<string, string>;
	formIsValid: boolean;
}
const StyledForm = styled.div`
	.input-wrapper {
		margin-bottom: 0.8rem;
		&.aligned {
			display: flex;
			div {
				flex: 1;
				&:first-child {
					margin-right: 4rem;
				}
			}
		}
	}
	.input-tip {
		margin-bottom: 0.8rem;
	}
	button {
		margin-top: 2.4rem;
	}
	.server-error {
		color: var(--gaspacho-100);
	}
`;

const SignupAgriForm = ({
	errors,
	step,
	goNextStep,
	values,
	serverError,
	setValue,
	formIsValid,
	control,
	loading,
}: SignupFormProps): JSX.Element => {
	const { t } = useTranslation();
	const { coops } = useContext(UserContext);

	return (
		<StyledForm>
			{step === 0 && (
				<>
					<div className="input-wrapper">
						<TextInput
							placeholder={t("common.inputs.email.placeholder")}
							label={t("common.inputs.email.label")}
							name="email"
							rules={{
								required: {
									value: true,
									message: t("common.inputs.email.errors.required"),
								},
								pattern: {
									value: emailRegEx,
									message: t("common.inputs.email.errors.invalid"),
								},
							}}
							error={errors.email}
						/>
					</div>
					<div className="input-wrapper">
						<TextInput
							placeholder={t("common.inputs.phone.placeholder")}
							label={t("common.inputs.phone.label")}
							name="phone"
							rules={{
								required: {
									value: true,
									message: t("common.inputs.phone.errors.required"),
								},
								pattern: {
									value: phoneRegEx,
									message: t("common.inputs.phone.errors.invalid"),
								},
							}}
							error={errors.phone}
						/>
					</div>
					<div className="input-wrapper">
						<TextInput
							label={t("common.inputs.password.label")}
							placeholder="********"
							name="password"
							rules={{
								required: {
									value: true,
									message: t("common.inputs.password.errors.required"),
								},
								validate: (value: string) => {
									return (
										(value.toLowerCase() !== value &&
											value.toUpperCase() !== value &&
											/\d/.test(value) &&
											value.length >= 8) ||
										t("common.inputs.password.errors.invalid")
									);
								},
							}}
							error={errors.password}
							type="password"
							autoComplete="new-password"
						/>
					</div>
					<PasswordStrength password={values.password} />
					<Button
						color="tangerine"
						text={t("common.button.next")}
						disabled={!!errors.email || !!errors.password || !!errors.phone}
						onClick={goNextStep}
					/>
				</>
			)}
			{step === 1 && (
				<>
					<div className="input-wrapper aligned">
						<TextInput
							placeholder={t("common.inputs.firstName.placeholder")}
							label={t("common.inputs.firstName.label")}
							name="firstName"
							rules={{
								required: {
									value: true,
									message: t("common.inputs.firstName.errors.required"),
								},
							}}
							error={errors.firstName}
						/>
						<TextInput
							placeholder={t("common.inputs.lastName.placeholder")}
							label={t("common.inputs.lastName.label")}
							name="lastName"
							rules={{
								required: {
									value: true,
									message: t("common.inputs.lastName.errors.required"),
								},
							}}
							error={errors.lastName}
						/>
					</div>
					<div className="input-wrapper">
						<GooglePlacesAutocomplete
							error={errors.googleAutocomplete}
							rules={{
								required: {
									value: true,
									message: t("common.inputs.location.errors.required"),
								},
							}}
							name="googleAutocomplete"
							onChange={(v) => setValue("location", v)}
							label={t("common.inputs.location.label")}
							placeholder={t("common.inputs.location.placeholder")}
						/>
					</div>
					<InputTip>
						<h5>{t("common.inputs.location.inputTip")}</h5>
					</InputTip>
					<div className="input-wrapper">
						<Controller
							control={control}
							rules={{
								required: {
									value: true,
									message: t("common.inputs.coop.errors.required"),
								},
							}}
							name="coop"
							render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => {
								return (
									<SelectInput
										name={name}
										inputRef={ref}
										onBlur={onBlur}
										onChange={onChange}
										value={value}
										label={t("common.inputs.coop.label")}
										placeholder={t("common.inputs.coop.placeholder")}
										error={error}
										options={coops.map((c) => ({
											value: c.id.toString(),
											label: c.name,
										}))}
										searchable
									/>
								);
							}}
						/>
					</div>
					<InputTip>
						<h5>
							<Trans i18nKey="common.inputs.coop.inputTip">
								By linking your organism, you are authorizing their people to access your HYGO data.{" "}
								<br />
								If you&apos;re not concerned, select &quos;I&apos;m independant&quos;
							</Trans>
						</h5>
					</InputTip>
					{serverError && <p className="server-error">{t("components.signUpForm.serverError")}</p>}
					<Button
						color="tangerine"
						isSubmitBtn
						text={t("components.signUpForm.submitButton")}
						disabled={!formIsValid}
						loading={loading}
					/>
				</>
			)}
		</StyledForm>
	);
};

export default SignupAgriForm;
