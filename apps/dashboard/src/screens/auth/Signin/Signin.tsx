import styled from "styled-components";
import { Link } from "react-router-dom";
import { FormProvider } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import bg from "@Assets/bg.jpg";
import BaseLoader from "@Components/Loader";
import TextInput from "@Components/TextInput";
import Button from "@Components/Button";
import Divider from "@Components/Divider";
import ContainerWithBgImage from "@Components/ContainerWithBgImage";
import FormCard from "@Components/FormCard";
import { SigninProps } from "./signin.types";

const StyledWrapper = styled.div`
	h1 {
		margin-bottom: 3.2rem;
		text-align: center;
		span {
			color: var(--lake-100);
		}
	}
	.input-wrapper {
		margin-bottom: 0.8rem;
	}
	a {
		font-size: 1.4rem;
		font-family: "Nunito Bold";
		color: var(--lake-100);
		text-decoration: none;
		margin: 0.8rem 0;
		display: block;
		&:hover {
			text-decoration: underline;
		}
	}
	p.version {
		text-align: center;
		margin-top: 3.2rem;
	}
`;

const SignIn = ({ loading, onSubmit, methods, onClickSignUp }: SigninProps): JSX.Element => {
	const { t } = useTranslation();
	// const { t } = useTranslation();
	return (
		<ContainerWithBgImage backgroundImage={bg}>
			<FormCard>
				<StyledWrapper>
					<Trans i18nKey="screens.signin.title">
						<h1>
							Welcome to
							<span>Alvie</span>
						</h1>
					</Trans>

					{/* {process.env.REACT_APP_VERSION && (
						<Typography variant="body1">v{process.env.REACT_APP_VERSION}</Typography>
					)} */}

					{loading ? (
						<BaseLoader />
					) : (
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
										autoComplete="email"
									/>
								</div>
								<div className="input-wrapper">
									<TextInput
										label={t("common.inputs.password.label")}
										name="password"
										rules={{
											required: {
												value: true,
												message: t("common.inputs.password.errors.required"),
											},
										}}
										error={methods.formState.errors.password}
										type="password"
										autoComplete="current-password"
									/>
								</div>
								<Link to="/reset-password">{t("screens.signin.passwordForgotten")}</Link>
								<Button color="tangerine" isSubmitBtn text={t("common.button.login")} />
								<Divider text={t("screens.signin.dividerText")} />
								<Button
									color="tangerine"
									onClick={onClickSignUp}
									outlined
									text={t("screens.signin.createAccountBtn")}
								/>
							</form>
							{process.env.REACT_APP_VERSION && (
								<p className="version">HYGO v.{process.env.REACT_APP_VERSION}</p>
							)}
						</FormProvider>
					)}
				</StyledWrapper>
			</FormCard>
		</ContainerWithBgImage>
	);
};

export default SignIn;
