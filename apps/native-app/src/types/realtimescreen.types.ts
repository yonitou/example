export interface XYType {
	x: Date;
	y: number;
}

export interface realTimeDataType {
	humi: number;
	temp: number;
	timestamp: string;
	windSpeed?: number;
	position: { lat: number; lon: number };
}
