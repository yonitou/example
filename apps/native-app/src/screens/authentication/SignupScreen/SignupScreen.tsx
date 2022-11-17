import { ImageBackground, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import SafeArea from "@Components/SafeArea";
import { useTranslation } from "react-i18next";
import Header from "@Components/Header";
import StepProgress from "@Components/StepProgress";
import backgroundImg from "@Assets/authentication/signin/background.png";
import Input from "@Components/Input";
import { emailRegEx } from "@Utils/emailRegEx";
import { phoneRegEx } from "@Utils/phoneRegEx";
import PasswordStrength from "@Components/PasswordStrength";

import BaseButton from "@Components/BaseButton";
import COLORS from "@Constants/palette";
import GooglePlacesAutoComplete from "@Components/GooglePlacesAutoComplete";
import { SignupScreenProps } from "./screen.types";

import CoopSelector from "./components/CoopSelector";

const SignupScreen = ({
	activeStep,
	setValue,
	onNavBack,
	control,
	handleSubmit,
	onSubmit,
	formState,
	loading,
	goPreviousStep,
	values,
	goNextStep,
}: SignupScreenProps): JSX.Element => {
	const { t } = useTranslation();

	const onBackPress = (): void => (activeStep === 1 ? onNavBack() : goPreviousStep());
	return (
		<ImageBackground source={backgroundImg} resizeMode="cover" style={styles.background}>
			<Header
				onBackPress={!loading && onBackPress}
				customTitle={<StepProgress step={activeStep} title={t("screens.signUp.header")} totalSteps={2} />}
				onCancelPress={activeStep === 2 && !loading && onNavBack}
				backgroundColor="transparent"
			/>
			<SafeArea>
				{activeStep === 1 && (
					<>
						<Input
							label={t("common.inputs.email.label")}
							placeholder={t("common.inputs.email.placeholder")}
							autoComplete="username"
							keyboardType="email-address"
							textContentType="username"
							editable={!loading}
							name="email"
							control={control}
							rules={{
								pattern: {
									value: emailRegEx,
									message: t("common.inputs.email.errors.invalid"),
								},
								required: {
									value: true,
									message: t("common.inputs.email.errors.required"),
								},
							}}
							error={formState.errors.email}
						/>
						<Input
							label={t("common.inputs.phone.label")}
							placeholder="0612345678"
							autoComplete="tel"
							keyboardType="phone-pad"
							textContentType="telephoneNumber"
							containerStyle={styles.inputContainerMiddle}
							editable={!loading}
							name="phone"
							control={control}
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
							error={formState.errors.phone}
						/>
						<Input
							label={t("common.inputs.password.label")}
							placeholder="*****"
							control={control}
							name="password"
							autoComplete="password-new"
							secureTextEntry
							textContentType="newPassword"
							editable={!loading}
							containerStyle={styles.inputContainer}
							rules={{
								required: { value: true, message: t("common.inputs.password.errors.required") },
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
							error={formState.errors.password}
						/>
						<PasswordStrength password={values.password} />
						<BaseButton
							color={COLORS.LAKE}
							onPress={goNextStep}
							style={styles.button}
							disabled={!!(formState.errors.email || formState.errors.password || formState.errors.phone)}
						>
							{t("common.button.next")}
						</BaseButton>
					</>
				)}
				{activeStep === 2 && (
					<>
						<GooglePlacesAutoComplete
							containerStyle={styles.inputContainer}
							control={control}
							editable={!loading}
							setValue={setValue}
							error={formState.errors.googleAutocomplete}
						/>
						<Input
							containerStyle={styles.inputContainer}
							label={t("common.inputs.firstName.label")}
							placeholder={t("common.inputs.firstName.placeholder")}
							autoComplete="name-given"
							keyboardType="default"
							textContentType="givenName"
							editable={!loading}
							name="firstName"
							control={control}
							rules={{
								required: {
									value: true,
									message: t("common.inputs.firstName.errors.required"),
								},
							}}
							error={formState.errors.firstName}
						/>
						<Input
							containerStyle={styles.inputContainer}
							label={t("common.inputs.lastName.label")}
							placeholder={t("common.inputs.lastName.placeholder")}
							autoComplete="name-family"
							keyboardType="default"
							textContentType="familyName"
							editable={!loading}
							name="lastName"
							control={control}
							rules={{
								required: {
									value: true,
									message: t("common.inputs.lastName.errors.required"),
								},
							}}
							error={formState.errors.lastName}
						/>

						<Controller
							control={control}
							rules={{
								required: { value: true, message: t("common.inputs.coop.errors.required") },
							}}
							name="coop"
							render={({ field: { onChange, value }, fieldState: { error } }) => {
								return (
									<CoopSelector onSelect={onChange} value={value} error={error} disabled={loading} />
								);
							}}
						/>
						<BaseButton
							color={COLORS.LAKE}
							onPress={handleSubmit(onSubmit)}
							style={styles.button}
							disabled={!formState.isValid}
							loading={loading}
						>
							{t("screens.signUp.submitBtn")}
						</BaseButton>
					</>
				)}
			</SafeArea>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	background: {
		flex: 1,
	},
	inputContainerMiddle: {
		marginVertical: 16,
	},
	inputContainer: {
		marginBottom: 16,
	},
	button: {
		marginTop: 16,
	},
});

export default SignupScreen;
