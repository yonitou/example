import styled from "styled-components";
import { useTranslation } from "react-i18next";
import bg from "@Assets/bg.jpg";
import coopIcon from "@Assets/coop.png";
import agriIcon from "@Assets/agriculteur.png";
import BaseIcons from "@Icons/BaseIcons";
import ContainerWithBgImage from "@Components/ContainerWithBgImage";
import CardWithImage from "@Components/CardWithImage";
import FormHeader from "@Components/FormHeader";
import FormCard from "@Components/FormCard";
import { SignupLandingProps } from "./signupLanding.types";

const StyledWrapper = styled.div`
	.flow-wrapper {
		display: flex;
		justify-content: space-between;
		margin-top: 2.4rem;
	}
`;

const SignupLanding = ({ onGoBack }: SignupLandingProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<ContainerWithBgImage backgroundImage={bg}>
			<FormCard>
				<StyledWrapper>
					<FormHeader
						onGoBack={onGoBack}
						title={t("screens.signUpLanding.title")}
						subTitle={t("screens.signUpLanding.subtitle")}
						backIcon={<BaseIcons.ArrowLeft />}
					/>
					<div className="flow-wrapper">
						<CardWithImage
							path="agri"
							image={agriIcon}
							imageWidth={165}
							title={t("screens.signUpLanding.farmer.title")}
						/>
						<CardWithImage
							image={coopIcon}
							imageWidth={100}
							path="/"
							disabled
							title={t("screens.signUpLanding.coop.title")}
							subTitle={t("screens.signUpLanding.coop.subtitle")}
						/>
					</div>
				</StyledWrapper>
			</FormCard>
		</ContainerWithBgImage>
	);
};

export default SignupLanding;
