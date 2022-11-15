import { FormProvider } from "react-hook-form";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import ContainerWithBgImage from "@Components/ContainerWithBgImage";
import bg from "@Assets/bg.jpg";
import SignupForm from "@Components/SignupForm";
import FormHeader from "@Components/FormHeader";
import BaseIcons from "@Icons/BaseIcons";
import FormCard from "@Components/FormCard";
import Stepper from "@Components/Stepper";
import { formValuesType, SignupAgriProps } from "./signupAgri.types";

const StyledWrapper = styled.div`
	form {
		margin-top: 2.4rem;
	}
`;

const SignupAgri = ({
	loading,
	onClickCreateAccount,
	goPreviousStep,
	level,
	methods,
	onGoBack,
	activeStep,
	goNextStep,
	serverError,
}: SignupAgriProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<ContainerWithBgImage backgroundImage={bg}>
			<FormCard>
				<StyledWrapper>
					<Stepper numberOfSteps={2} activeStep={activeStep} />
					<FormHeader
						title={t("screens.signUpAgri.title")}
						backIcon={<BaseIcons.ArrowLeft />}
						onGoBack={activeStep === 0 ? onGoBack : goPreviousStep}
					/>
					{/* eslint-disable-next-line */}
					<FormProvider {...methods}>
						<form
							onSubmit={methods.handleSubmit((values: formValuesType) =>
								onClickCreateAccount({ ...values, level })
							)}
						>
							<SignupForm
								errors={methods.formState.errors}
								control={methods.control}
								setValue={methods.setValue}
								values={methods.watch()}
								formIsValid={methods.formState.isValid}
								step={activeStep}
								goNextStep={goNextStep}
								serverError={serverError}
								loading={loading}
							/>
						</form>
					</FormProvider>
				</StyledWrapper>
			</FormCard>
		</ContainerWithBgImage>
	);
};

export default SignupAgri;
