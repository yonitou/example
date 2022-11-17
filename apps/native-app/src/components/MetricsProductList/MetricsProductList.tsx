import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import { metricsType } from "@Types/meteo.types";
import COLORS from "@Constants/palette";
import ParagraphSB from "@Components/ParagraphSB";
import { useTranslation } from "react-i18next";

interface MetricsProductListProps {
	metrics: metricsType;
	style?: StyleProp<ViewStyle>;
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

const MetricsProductList = ({ metrics, style, productMetrics }: MetricsProductListProps): JSX.Element => {
	const { t } = useTranslation();
	const productMetricsArray =
		productMetrics &&
		Object.keys(productMetrics)
			?.map((m: keyof metricsType) => productMetrics?.[m] && m)
			?.filter((r) => r);

	if (!productMetricsArray || productMetricsArray.length === 0) return null;

	return (
		<View style={[styles.container, style]}>
			{productMetricsArray?.map((metric, index, arr) => {
				const isLast = index === arr.length - 1;
				const marginBottom = isLast ? 0 : 4;
				return (
					<View style={[styles.wrapper, { marginBottom }]} key={metric}>
						<ParagraphSB>
							{t(`components.metricsProductList.metrics.${metricConverter[metric].label}`)}:{" "}
							<ParagraphSB style={styles.lakeText}>
								{(metrics?.[metric as keyof metricsType] as number)?.toFixed(0)}
								{t(`common.units.${metricConverter[metric].unit}`)}
							</ParagraphSB>
						</ParagraphSB>

						<ParagraphSB style={styles.grayText}>
							{t(`components.metricsProductList.categories.${metricConverter[metric].category}`)}
						</ParagraphSB>
					</View>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.NIGHT[5],
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 4,
	},
	wrapper: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	lakeText: {
		color: COLORS.LAKE[100],
	},
	grayText: {
		color: COLORS.NIGHT[50],
	},
});

export default MetricsProductList;
