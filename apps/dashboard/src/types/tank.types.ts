import { metricsType } from "./meteo.types";

export interface tankType {
	recommendations: recommendationType;
	configuration: tankConfigurationType;
	productMetrics: Record<keyof metricsType, boolean>;
}

interface recommendationType {
	warning: boolean;
	addWettingReco: boolean;
	addWettingAndOilReco: boolean;
	addOilReco: boolean;
	noAdjReco: boolean;
	noOilReco: boolean;
}

interface tankConfigurationType {
	withTargets: boolean;
}
