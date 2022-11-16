import TargetIcon from "@Components/TargetIcon";
import { COLORS } from "@Constants/palette";
import BaseIcons from "@Icons/BaseIcons";
import { targetType } from "@Types/target.types";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

interface TargetSectionProps {
	targets: targetType[];
}

const StyledTargetSection = styled.section`
	background-color: var(--white);
	border-radius: 0.4rem;
	padding: 1.6rem;
	flex: 1;
	.title-wrapper {
		display: flex;
		align-items: center;
		h3 {
			margin-left: 0.8rem;
		}
	}
	.targets-wrapper {
		margin-top: 1.6rem;
		.row {
			display: flex;
			align-items: center;
			margin-bottom: 0.8rem;
			&:last-child {
				margin-bottom: 0;
			}
		}
	}
`;

const TargetSection = ({ targets }: TargetSectionProps): JSX.Element => {
	const { t } = useTranslation();

	return (
		<StyledTargetSection>
			<div className="title-wrapper">
				<BaseIcons.Aim width={24} height={24} fill={COLORS.LAKE[100]} />
				<h3>{t("common.taskCard.targetSection.title")}</h3>
			</div>
			<div className="targets-wrapper">
				{targets.map((target) => {
					return (
						<div className="row" key={target.id}>
							<TargetIcon target={target} fill={COLORS.NIGHT[100]} width={20} height={20} />
							<h5>{target.name}</h5>
						</div>
					);
				})}
			</div>
		</StyledTargetSection>
	);
};

export default TargetSection;
