import { equipmentPackDetails, featureDetails } from "@Constants/plans";
import { featuresList } from "@Types/feature.types";
import { planType } from "@Types/plan.types";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

export const Wrapper = styled.div`
	padding: 1.6rem;
	flex: 1 1 28rem;
	border-radius: 0.8rem;
	background-color: var(--smoke-100);
	display: flex;
	flex-direction: column;
	@media (max-width: 1500px) {
		flex: calc(50% - 0.8rem);
	}
`;

const Title = styled.h3`
	margin: 1.6rem 0 0.8rem 0;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
`;

const PriceWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;
`;

const PlanPrice = styled.h2<{ priceColor: string }>`
	color: ${(props) => props.priceColor};
	span {
		font-size: 1.4rem;
		color: var(--night-100);
	}
`;

const FeaturesCard = styled.div`
	flex: 1;
	gap: 0.8rem;
	display: flex;
	flex-direction: column;
`;

const EquipmentPrice = styled.h3`
	color: var(--lake-100);
`;

const EquipmentDetailsWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 1.6rem;
`;

const EquipmentCard = styled.div`
	height: 12.8rem;
	padding: 1.6rem;
	background-color: var(--grass-10);
	border: 1px solid var(--grass-100);
	display: flex;
	border-radius: 0.4rem;
	align-items: center;
`;

const EmptyEquipmentCard = styled(EquipmentCard)`
	background-color: transparent;
	border: 1px solid var(--night-50);
	justify-content: center;
	h3 {
		color: var(--night-50);
	}
`;

const PriceFrequency = styled.h5`
	color: var(--night-50);
`;

const PlanFeatureCard = styled.div<{ blank: boolean }>`
	background-color: ${(props) => (props.blank ? "transparent" : "var(--white)")};
	border-radius: 0.4rem;
	flex: 0 0 8rem;
	display: flex;
	align-items: center;
	gap: 1.6rem;
	padding: 1.6rem;
	img {
		opacity: ${(props) => (props.blank ? 0.25 : 1)};
	}
`;

interface PlanCardProps {
	plan: planType;
}

const PlanCard = ({ plan }: PlanCardProps): JSX.Element => {
	const { t } = useTranslation();
	const hasEquipment = !!plan?.equipmentPack?.name;
	return (
		<Wrapper>
			<Header>
				<img src={plan.image} width={100} alt={plan.i18nId} />
				<PriceWrapper>
					<h2>{t(`plans.${plan.i18nId}.name`)}</h2>
					<PlanPrice priceColor={plan.color}>
						{plan.price}
						{t("common.units.euro")} <span>/{t("common.units.year")}</span>
					</PlanPrice>
					{!!plan.equipmentPack.name && (
						<PriceFrequency>{t("screens.pricing.components.planCard.byPulve")}</PriceFrequency>
					)}
				</PriceWrapper>
			</Header>
			<Title>{t("screens.pricing.components.planCard.equipment.title")}</Title>
			{hasEquipment ? (
				<EquipmentCard>
					<EquipmentDetailsWrapper>
						<img
							src={equipmentPackDetails[plan.equipmentPack.name]}
							alt={plan.equipmentPack.name}
							width={50}
						/>
						<div>
							<h3>{t(`plans.equipments.${plan.equipmentPack.name}.name`)}</h3>
							{!!plan.equipmentPack.price && (
								<EquipmentPrice>
									{plan.equipmentPack.price} {t("common.units.euro")} / {t("screens.pricing.station")}
								</EquipmentPrice>
							)}
							<p>{t(`plans.equipments.${plan.equipmentPack.name}.description`)}</p>
						</div>
					</EquipmentDetailsWrapper>
				</EquipmentCard>
			) : (
				<EmptyEquipmentCard>
					<h3>{t("screens.pricing.components.planCard.equipment.empty")}</h3>
				</EmptyEquipmentCard>
			)}

			<Title>{t("screens.pricing.components.planCard.features.title")}</Title>
			<FeaturesCard>
				{featuresList.map((feature) => {
					const hasFeature = plan.features.includes(feature);
					return (
						<PlanFeatureCard blank={!hasFeature} key={feature}>
							<img src={featureDetails[feature]} alt={feature} width={42} />
							{hasFeature && <h3>{t(`plans.features.${feature}.name`)}</h3>}
						</PlanFeatureCard>
					);
				})}
			</FeaturesCard>
		</Wrapper>
	);
};

export default PlanCard;
