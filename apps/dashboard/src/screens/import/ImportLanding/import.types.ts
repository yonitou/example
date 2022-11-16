import { farmType } from "@Types/farm.types";

export interface ImportLandingProps {
	defaultFarm: farmType;
	loggedInSmag: boolean;
	goToDashboard: () => void;
}
