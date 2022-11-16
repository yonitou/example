import { metricsType } from "@Types/meteo.types";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

interface MetricsProductListProps {
	metrics: metricsType;
	productMetrics: Record<keyof metricsType, boolean>;
}

interface metricConverterType {
	category: string;
	label: string;
	unit: string;
}

const metricConverter: Record<string, metricConverterType> = {
	maxsoilhumi: { category: "racinary_product", label: "soilHumidity", unit: "percentage" },
	r72: { category: "racinary_product", label: "r72", unit: "millimeters" },
	r2: { category: "foliar_product", label: "r2", unit: "millimeters" },
	r24: { category: "foliar_product", label: "r24", unit: "millimeters" },
	minsoiltemp: { category: "racinary_product", label: "minsoiltemp", unit: "degrees" },
};

const StyledMetricsProductList = styled.div`
	background-color: var(--night-5);
	padding: 0.8rem 1.6rem;
	border-radius: 0.4rem;
	margin: 1.6rem 0;
	.metric-wrapper {
		margin-bottom: 0.4rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		&:last-child {
			margin-bottom: 0;
		}
		h5 {
			color: var(--night-50);
			&.metric-name {
				color: var(--night-100);
				span {
					color: var(--lake-100);
				}
			}
		}
	}
`;

const MetricsProductList = ({ metrics, productMetrics }: MetricsProductListProps): JSX.Element => {
	const { t } = useTranslation();
	const productMetricsArray =
		productMetrics &&
		Object.keys(productMetrics)
			?.map((m: keyof metricsType) => productMetrics?.[m] && m)
			?.filter((r) => r);

	if (!productMetricsArray || productMetricsArray.length === 0) return null;

	return (
		<StyledMetricsProductList>
			{productMetricsArray?.map((metric) => {
				return (
					<div className="metric-wrapper" key={metric}>
						<h5 className="metric-name">
							{t(`components.taskCard.metricsProductList.metrics.${metricConverter[metric].label}`)}:{" "}
							<span>
								{(metrics?.[metric as keyof metricsType] as number)?.toFixed(0)}
								{t(`common.units.${metricConverter[metric].unit}`)}
							</span>
						</h5>

						<h5>
							{t(`components.taskCard.metricsProductList.categories.${metricConverter[metric].category}`)}
						</h5>
					</div>
				);
			})}
		</StyledMetricsProductList>
	);
};

export default MetricsProductList;
