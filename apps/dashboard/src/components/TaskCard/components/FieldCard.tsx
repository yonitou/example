import CropIcon from "@Components/CropIcon";
import ParcelSVG from "@Components/ParcelSVG";
import { COLORS, computeColorFromConditions } from "@Constants/palette";
import { UserContext } from "@Context/UserContext";
import BaseIcons from "@Icons/BaseIcons";
import { fieldType } from "@Types/fields.types";
import { convertToHa } from "@Utils/convertToHa";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { formatDate } from "@Utils/formatDate";
import { tankType } from "@Types/tank.types";
import MetricsProductList from "./MetricsProductList";
import WeatherDetails from "./WeatherDetails";

interface FieldCardProps {
	field: fieldType;
	tankIndications: tankType;
}

const StyledFieldCard = styled.div`
	width: 42rem;
	box-shadow: 0px 0.8px 1.5px rgba(0, 83, 94, 0.1), 0px 6px 12px rgba(0, 83, 94, 0.1);
	border-radius: 0.4rem;
	display: inline-block;
	margin-right: 1.6rem;
	&:last-child {
		margin-right: 0;
	}
	.date-wrapper {
		padding: 0.8rem 1.6rem;
		border-radius: 0.4rem 0.4rem 0 0;
		background: var(--gradient-light-grey);
		display: flex;
		align-items: center;
		h5 {
			margin-left: 0.8rem;
			color: var(--night-100);
		}
	}
	.content {
		background-color: var(--white);
		padding: 1.6rem;
		border-radius: 0 0 0.4rem 0.4rem;
		.name-crop-wrapper {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 1.6rem;
			.crop {
				padding: 0.8rem 1.6rem;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 3rem;
				background-color: var(--night-5);
			}
			.name-wrapper {
				display: flex;
				align-items: center;
				.svg-field {
					margin-right: 1.6rem;
				}
				.name,
				.area {
					color: var(--night-100);
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
					width: 12rem;
				}
				.area {
					color: var(--night-50);
				}
			}
		}

		.condition {
			color: var(--night-50);
		}
	}
`;

const FieldCard = ({ field, tankIndications }: FieldCardProps): JSX.Element => {
	const { t } = useTranslation();
	const { crops } = useContext(UserContext);
	const crop = crops.find((c) => c.id === field?.crop?.id);

	return (
		<StyledFieldCard>
			{!!field?.startTime && !!field?.endTime && (
				<div className="date-wrapper">
					<BaseIcons.Clock width={16} height={16} fill={COLORS.NIGHT[25]} />
					<h5>
						<>
							{formatDate(new Date(field.startTime), 5, Math.round)} -
							{formatDate(new Date(field.endTime), 5, Math.round)}
						</>
					</h5>
				</div>
			)}
			<div className="content">
				<div className="name-crop-wrapper">
					<div className="name-wrapper">
						<ParcelSVG
							path={field.svg}
							className="svg-field"
							height={32}
							width={32}
							strokeWidth={1}
							fillOpacity={0.5}
							color={COLORS.LAKE[25]}
							stroke={COLORS.LAKE[100]}
						/>
						<div>
							<h3 className="name">{field.name}</h3>
							<h3 className="area">
								{convertToHa(field.area)}
								{t("common.units.hectare")} - {field.town}
							</h3>
						</div>
					</div>
					<h5 className="crop">
						<CropIcon crop={crop} fill={COLORS.NIGHT[100]} width={16} height={16} />
						{t(`crops.${crop?.name}`)}
					</h5>
				</div>
				<WeatherDetails metrics={field?.metricsOfTheSelectedSlot} />
				<MetricsProductList
					metrics={field?.metricsOfTheSelectedSlot}
					productMetrics={tankIndications?.productMetrics}
				/>
				<h3 style={{ color: computeColorFromConditions(field?.condition, "TEXT") }}>
					{t(`common.conditions.${field?.condition}`)}
				</h3>
			</div>
		</StyledFieldCard>
	);
};

export default FieldCard;
