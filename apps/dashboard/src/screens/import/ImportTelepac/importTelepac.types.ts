import { farmType } from "@Types/farm.types";
import { UseFormReturn } from "react-hook-form";

export interface ImportTelepacScreenProps {
	error: boolean;
	success: boolean;
	enableButton: boolean;
	methods: UseFormReturn;
	isImporting: boolean;
	defaultFarm: farmType;
	handleChangeDropzone: (file?: File) => void;
	inputFile: File;
	handleImport: () => void;
	retryImport: () => void;
	goToDashboard: () => void;
	backFromError: () => void;
	goBack: () => void;
}
