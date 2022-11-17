export enum UserStatusEnum {
	LOGGED_IN = "LOGGED_IN",
	LOGGED_OUT = "LOGGED_OUT",
	NEED_SETUP = "NEED_SETUP",
	ADMIN = "ADMIN",
	NEED_EQUIPMENT = "NEED_EQUIPMENT",
}

export enum ErrorsEnum {
	noDefaultFarm = "noDefaultFarm",
	defaultFarmWithoutFields = "defaultFarmWithoutFields",
	needUpdateVersion = "needUpdateVersion",
	noPlan = "noPlan",
}
