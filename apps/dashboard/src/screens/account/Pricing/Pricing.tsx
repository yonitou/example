import styled from "styled-components";
import { Trans, useTranslation } from "react-i18next";
import Button from "@Components/Button";

import { featuresList } from "@Types/feature.types";
import { PricingProps } from "./pricing.types";
import PlanCard from "./components/PlanCard";
import FeatureCard from "./components/FeatureCard";
import Skeleton from "./components/Skeleton";

const StyledWrapper = styled.div`
	background-color: var(--white);
	height: 100%;
	display: flex;
	flex-direction: column;
`;

const Footer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 4rem;
	padding: 1.6rem 0;
`;

const SubscribeButton = styled(Button)`
	flex-basis: 40rem;
`;

const MainTitle = styled.h1`
	text-align: center;
	margin-bottom: 2.4rem;
	span {
		color: var(--lake-100);
	}
`;

const PricingWrapper = styled.div`
	overflow: auto;
	flex: 1;
	padding: 4rem 13rem;
`;

const SectionTitle = styled.h2`
	margin: 2.4rem 0;
`;

const FeatureCardWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 2.4rem 1.6rem;
	flex-wrap: wrap;
	justify-content: center;
`;

const PlanCardWrapper = styled.div`
	display: flex;
	gap: 1.6rem;
	flex-wrap: wrap;
`;

const Pricing = ({ openChargebeePortal, plans, loading }: PricingProps): JSX.Element => {
	const { t } = useTranslation();

	return (
		<StyledWrapper>
			<PricingWrapper>
				<Trans i18nKey="screens.pricing.header">
					<MainTitle>
						Choose your <span>HYGO</span> offer
					</MainTitle>
				</Trans>
				<PlanCardWrapper>
					{loading ? <Skeleton /> : plans?.map((plan) => <PlanCard plan={plan} key={plan.planId} />)}
				</PlanCardWrapper>
				<SectionTitle>{t("screens.pricing.featuresList.title")}</SectionTitle>
				<FeatureCardWrapper>
					{featuresList.map((id) => (
						<FeatureCard id={id} key={id} />
					))}
				</FeatureCardWrapper>
			</PricingWrapper>
			<Footer>
				<h2>{t("screens.pricing.footer")}</h2>
				<SubscribeButton
					text={t("screens.pricing.footer.btn")}
					color="tangerine"
					onClick={openChargebeePortal}
				/>
			</Footer>
		</StyledWrapper>
	);
};

export default Pricing;
