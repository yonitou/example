import { COLORS } from "@Constants/palette";
import BaseIcons from "@Icons/BaseIcons";
import { metricsType } from "@Types/meteo.types";
import { convertMsToKmh } from "@Utils/convertMsToKmh";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

interface WeatherDetailsProps {
	metrics: metricsType;
}

const StyledWeatherDetails = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	.metric-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		svg {
			margin-right: 0.4rem;
		}
		h5:first-child {
			color: var(--night-100);
		}
		h5:nth-child(2) {
			color: var(--night-50);
		}
	}
`;

const WeatherDetails = ({ metrics }: WeatherDetailsProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<StyledWeatherDetails>
			<div className="metric-wrapper">
				<BaseIcons.Temperature height={32} width={32} />
				<div>
					<h5>
						{metrics?.maxtemp?.toFixed(0) ?? "..."}
						{t("common.units.degrees")}
					</h5>
					<h5>
						{metrics?.mintemp?.toFixed(0) ?? "..."}
						{t("common.units.degrees")}
					</h5>
				</div>
			</div>

			<div className="metric-wrapper">
				<BaseIcons.Rain height={32} width={32} />
				<div>
					<h5>
						{metrics?.rmin?.toFixed(1) ?? "..."}
						{t("common.units.millimeters")}
					</h5>
					<h5>
						{metrics?.rmax?.toFixed(1) ?? "..."}
						{t("common.units.millimeters")}
					</h5>
				</div>
			</div>
			<div className="metric-wrapper">
				<BaseIcons.Wind height={32} width={32} fill={COLORS.LAKE[100]} />
				<div>
					<h5>
						{convertMsToKmh(metrics?.wind)?.toFixed(0) ?? "..."}
						{t("common.units.kmPerHour")}
					</h5>
				</div>
			</div>
			<div className="metric-wrapper">
				<BaseIcons.WaterFill height={32} width={32} fill={COLORS.LAKE[100]} />
				<div>
					<h5>
						{metrics?.maxhumi?.toFixed(0) ?? "..."}
						{t("common.units.percentage")}
					</h5>
					<h5>
						{metrics?.minhumi?.toFixed(0) ?? "..."}
						{t("common.units.percentage")}
					</h5>
				</div>
			</div>
		</StyledWeatherDetails>
	);
};

export default WeatherDetails;
