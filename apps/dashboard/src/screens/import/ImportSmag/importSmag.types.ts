import { farmType } from "@Types/farm.types";
import { smagFarm } from "@Types/smag.types";

export interface ImportSmagScreenProps {
	defaultFarm: farmType;
	success: boolean;
	error: boolean;
	loading: boolean;
	selectedYear: number;
	smagFarms: smagFarm[];
	selectedFarm: smagFarm;
	loadingSmagFarms: boolean;
	retryImport: () => void;
	doImport: () => Promise<void>;
	onChangeFarm: (uuid: string) => void;
	onChangeYear: (year: number) => void;
	backFromError: () => void;
	goToDashboard: () => void;
	goBack: () => void;
}
