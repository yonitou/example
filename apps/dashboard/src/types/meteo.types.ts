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
	maxsoilhumi: number;
}
