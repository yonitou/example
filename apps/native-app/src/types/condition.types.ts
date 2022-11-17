export interface globalConditionType {
	timestamp: string;
	RCond?: conditionEnum;
	DTCond?: conditionEnum;
	windCond?: conditionEnum;
	absorption?: conditionEnum;
	tempCond?: conditionEnum;
	humiCond?: conditionEnum;
	humiSoilCond?: conditionEnum;
	globalCond: conditionEnum;
	turbCond: conditionEnum;
	RFertiCond: conditionEnum;
	tempFertiCond: conditionEnum;
	rosee: conditionEnum;
	insect: conditionEnum;
	growingTime: conditionEnum;
	uv: conditionEnum;
	thermalRisk: conditionEnum;
	targetCond: conditionEnum;
}

export enum conditionEnum {
	BAD = "BAD",
	CORRECT = "CORRECT",
	GOOD = "GOOD",
	EXCELLENT = "EXCELLENT",
	ABSENT_TARGET = "ABSENT_TARGET",
}
