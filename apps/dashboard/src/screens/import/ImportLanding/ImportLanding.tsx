import styled from "styled-components";
import { useTranslation } from "react-i18next";
import telepacImportImg from "@Assets/import/telepac.png";
import smagImportImg from "@Assets/import/smag.png";
import smagLoginImg from "@Assets/import/loginToSmag.png";
import coopIcon from "@Assets/coop.png";
import FormCard from "@Components/FormCard";
import FormHeader from "@Components/FormHeader";
import CardWithImage from "@Components/CardWithImage";
import InputTip from "@Components/InputTip";
import EmptyState from "@Components/EmptyState";
import BaseIcons from "@Icons/BaseIcons";
import { COLORS } from "@Constants/palette";
import { ImportLandingProps } from "./import.types";

const StyledContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	background: var(--gradient-background-2);
	.card {
		box-shadow: 0px 6px 60px rgba(0, 83, 94, 0.05);
		.flow-wrapper {
			display: flex;
			justify-content: space-between;
			margin: 2.4rem 0;
		}
	}
`;

const ImportLanding = ({ defaultFarm, goToDashboard, loggedInSmag }: ImportLandingProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<StyledContainer>
			{defaultFarm ? (
				<FormCard className="card">
					<FormHeader
						title={t("screens.importLanding.title")}
						subTitle={t("screens.importLanding.subtitle")}
					/>
					<div className="flow-wrapper">
						<CardWithImage
							image={telepacImportImg}
							imageWidth={200}
							path="telepac"
							title={t("screens.importLanding.telepac.title")}
						/>
						<CardWithImage
							image={loggedInSmag ? smagImportImg : smagLoginImg}
							imageWidth={200}
							path={loggedInSmag ? "smag" : "/account?smag"}
							title={
								loggedInSmag
									? t("screens.importLanding.smag.title.notLoggedIn")
									: t("screens.importLanding.smag.title.loggedIn")
							}
						/>
					</div>
					<InputTip>
						<h5>{t("screens.importLanding.explicabilityImport")}</h5>
					</InputTip>
				</FormCard>
			) : (
				<EmptyState
					illustration={<img src={coopIcon} alt="ferme" width={100} />}
					title={t("components.emptyState.noDefaultFarm.title")}
					description={t("components.emptyState.noDefaultFarm.description")}
					onClick={goToDashboard}
					btnIcon={<BaseIcons.Parcelle fill={COLORS.WHITE} width={16} height={16} />}
					btnText={t("components.emptyState.noDefaultFarm.btn")}
				/>
			)}
		</StyledContainer>
	);
};

export default ImportLanding;
