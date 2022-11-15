import { FormProvider } from "react-hook-form";
import styled from "styled-components";
import { useTranslation, Trans } from "react-i18next";
import ContainerWithBgImage from "@Components/ContainerWithBgImage";
import bg from "@Assets/bg.jpg";
import BaseLoader from "@Components/Loader";
import FormCard from "@Components/FormCard";
import FormHeader from "@Components/FormHeader";
import BaseIcons from "@Icons/BaseIcons";
import TextInput from "@Components/TextInput";
import Button from "@Components/Button";
import InputTip from "@Components/InputTip";
import { EmailPasswordValidationProps } from "./emailPasswordValidation.types";

const StyledWrapper = styled.div`
	margin-top: 2.4rem;
	.input-wrapper {
		margin-bottom: 0.8rem;
	}
	button {
		margin-top: 2.4rem;
	}
	@media (max-width: 740px) {
		button.only-desktop {
			display: none;
		}
	}
`;

const EmailPasswordValidation = ({
	loading,
	onSubmit,
	methods,
	onGoBack,
	emailSent,
}: EmailPasswordValidationProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<ContainerWithBgImage backgroundImage={bg}>
			<FormCard>
				<FormHeader
					title={t("screens.emailPasswordValidation.title")}
					onGoBack={onGoBack}
					backIcon={<BaseIcons.ArrowLeft />}
				/>
				{loading && <BaseLoader />}
				{!loading && !emailSent && (
					<StyledWrapper>
						{/* eslint-disable-next-line */}
						<FormProvider {...methods}>
							<form onSubmit={methods.handleSubmit(onSubmit)}>
								<div className="input-wrapper">
									<TextInput
										label={t("common.inputs.email.label")}
										name="email"
										rules={{
											required: {
												value: true,
												message: t("common.inputs.email.errors.required"),
											},
										}}
										error={methods.formState.errors.email}
										autoCapitalize="off"
									/>
								</div>
								<InputTip>
									<h5>{t("common.inputs.email.inputTip")}</h5>
								</InputTip>
								<Button
									color="tangerine"
									isSubmitBtn
									text={t("screens.emailPasswordValidation.submitBtn")}
									disabled={!methods.formState.isValid}
								/>
							</form>
						</FormProvider>
					</StyledWrapper>
				)}
				{!loading && emailSent && (
					<StyledWrapper>
						<Trans i18nKey="screens.emailPasswordValidation.body">
							<p>
								Your pasword has been reset ! Check your email box and click on the link we sent you to
								set a new password.
								<br />
								If you didn&apos;t receive it yet, check your spam or ask a new link. If the problem
								persists, contact us at 06 74 82 99 04
							</p>
						</Trans>
						<Button
							className="only-desktop"
							color="tangerine"
							text={t("common.button.understood")}
							onClick={onGoBack}
						/>
						<Button
							color="tangerine"
							outlined
							text={t("screens.emailPasswordValidation.resendBtn")}
							onClick={() => onSubmit({ email: methods.getValues("email") })}
						/>
					</StyledWrapper>
				)}
			</FormCard>
		</ContainerWithBgImage>
	);
};

export default EmailPasswordValidation;
