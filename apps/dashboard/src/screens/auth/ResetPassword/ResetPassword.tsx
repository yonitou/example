import { FormProvider } from "react-hook-form";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import ContainerWithBgImage from "@Components/ContainerWithBgImage";
import bg from "@Assets/bg.jpg";
import BaseLoader from "@Components/Loader";
import PasswordStrength from "@Components/PasswordStrength";
import Button from "@Components/Button";
import TextInput from "@Components/TextInput";
import FormCard from "@Components/FormCard";
import FormHeader from "@Components/FormHeader";
import BaseIcons from "@Icons/BaseIcons";
import { ResetPasswordProps } from "./resetPassword.types";

const StyledWrapper = styled.div`
	margin-top: 2.4rem;
	.input-wrapper {
		margin-bottom: 0.8rem;
	}
	button {
		margin-top: 2.4rem;
	}
	p {
		text-align: center;
	}
	.happy-drop {
		margin: 0 auto 2.4rem auto;
	}

	@media (max-width: 740px) {
		button.only-desktop {
			display: none;
		}
	}
`;

const ResetPassword = ({ loading, onSubmit, methods, passwordUpdated, onGoBack }: ResetPasswordProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<ContainerWithBgImage backgroundImage={bg}>
			<FormCard>
				<FormHeader
					title={
						passwordUpdated
							? t("screens.resetPassword.updatedTitle")
							: t("screens.resetPassword.toUpdateTitle")
					}
				/>
				{loading && <BaseLoader />}
				{!loading && !passwordUpdated && (
					<StyledWrapper>
						<FormProvider {...methods}>
							<form onSubmit={methods.handleSubmit(onSubmit)}>
								<div className="input-wrapper">
									<TextInput
										label={t("common.inputs.new-password.label")}
										name="password"
										autoCapitalize="off"
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
										error={methods.formState.errors.password}
										type="password"
										autoComplete="new-password"
									/>
								</div>
								<PasswordStrength password={methods.watch().password} />
								<Button
									color="tangerine"
									isSubmitBtn
									text={t("common.button.next")}
									disabled={!methods.formState.isValid}
								/>
							</form>
						</FormProvider>
					</StyledWrapper>
				)}
				{!loading && passwordUpdated && (
					<StyledWrapper>
						<BaseIcons.HappyDrop width={81} height={117} className="happy-drop" />
						<p>{t("screens.resetPassword.body")}</p>
						<Button
							color="tangerine"
							className="only-desktop"
							text={t("common.button.understood")}
							onClick={onGoBack}
						/>
					</StyledWrapper>
				)}
			</FormCard>
		</ContainerWithBgImage>
	);
};

export default ResetPassword;
