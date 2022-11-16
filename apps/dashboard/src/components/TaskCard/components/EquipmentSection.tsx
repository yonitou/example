import { COLORS, NOZZLE_COLORS } from "@Constants/palette";
import BaseIcons from "@Icons/BaseIcons";
import { productUnitEnum } from "@Types/activeProduct.types";
import { nozzleType } from "@Types/nozzle.types";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

interface EquipmentSectionProps {
	nozzle: nozzleType;
	debit: number;
}

const StyledEquipmentSection = styled.section`
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
	.equipment-wrapper {
		margin-top: 2.6rem;
		display: flex;
		justify-content: space-around;
		align-items: center;
		.circle-wrapper {
			display: flex;
			flex-direction: column;
			align-items: center;
			> h3 {
				color: var(--night);
				text-align: center;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
				width: 9rem;
			}
			.circle {
				width: 6.4rem;
				height: 6.4rem;
				border-radius: 50%;
				background-color: var(--white);
				display: flex;
				flex-direction: column;
				margin-bottom: 0.4rem;
				align-items: center;
				justify-content: center;
				box-shadow: 0px 2.32373px 4.357px rgba(0, 83, 94, 0.1), 0px 17.428px 34.856px rgba(0, 83, 94, 0.1);
				h3 {
					color: var(--night-100);
				}
				h5 {
					color: var(--night-50);
				}
			}
		}
	}
`;

const EquipmentSection = ({ nozzle, debit }: EquipmentSectionProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<StyledEquipmentSection>
			<div className="title-wrapper">
				<BaseIcons.Equipment width={24} height={24} fill={COLORS.LAKE[100]} />
				<h3>{t("components.taskCard.equipmentSection.title")}</h3>
			</div>
			<div className="equipment-wrapper">
				<div className="circle-wrapper">
					<div className="circle">
						<BaseIcons.Nozzle
							fill={nozzle?.color ? NOZZLE_COLORS[nozzle.color] : COLORS.WHITE}
							width={25}
							height={35}
						/>
					</div>
					<h3>{nozzle?.name ? nozzle.name : t("common.taskCard.equipmentSection.emptyNozzle")}</h3>
				</div>
				<div className="circle-wrapper">
					<div className="circle">
						<h3>{debit}</h3>
						<h5>{productUnitEnum.LITER_PER_HA}</h5>
					</div>
					<h3>{t("components.taskCard.equipmentSection.pressure")}</h3>
				</div>
			</div>
		</StyledEquipmentSection>
	);
};

export default EquipmentSection;
