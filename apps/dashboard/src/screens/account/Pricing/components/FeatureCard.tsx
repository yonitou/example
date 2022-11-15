import { featureDetails } from "@Constants/plans";
import { featuresEnum } from "@Types/feature.types";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const Wrapper = styled.div`
	padding: 1.6rem;
	height: 14.4rem;
	flex: 1 1 28rem;
	border: 1px solid var(--night-100);
	border-radius: 0.4rem;
	@media (max-width: 1500px) {
		flex: calc(50% - 0.8rem);
	}
`;

const TopContent = styled.div`
	display: flex;
	align-items: center;
	gap: 1.6rem;
	margin-bottom: 1.6rem;
`;

interface FeatureCardProps {
	id: featuresEnum;
}

const FeatureCard = ({ id }: FeatureCardProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<Wrapper>
			<TopContent>
				<img src={featureDetails[id]} alt={id} width={42} />
				<h3>{t(`plans.features.${id}.name`)}</h3>
			</TopContent>
			<p>{t(`plans.features.${id}.description`)}</p>
		</Wrapper>
	);
};

export default FeatureCard;
