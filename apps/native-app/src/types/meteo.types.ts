export interface meteoType {
	aggregationBy24Hour: metricsType[];
	aggregationByHour: metricsType[];
	slidingAggregation: metricsType[];
}

export interface metricsType {
	timestamps?: { from: string; to: string };
	maxhumi: number;
	minhumi: number;
	avghumi?: number;
	maxtemp: number;
	mintemp: number;
	avgtemp?: number;
	wind?: number;
	gust?: number;
	precipitation?: number;
	probability?: number;
	pictocode?: number;
	r2: number;
	r24: number;
	r72: number;
	rmax: number;
	rmin: number;
	minsoiltemp: number;
	maxsoilhumi: number;
}

export enum meteoErrorEnum {
	SOME_FIELDS_DONT_HAVE_WEATHER_YET = "someFieldsDontHaveWeatherYet",
	NETWORK_ERROR = "NETWORK_ERROR",
}
