import { UseFormReturn } from "react-hook-form";
import { userLevelEnum } from "@Types/user.types";

export interface formValuesType {
	firstName: string;
	lastName: string;
	email: string;
	level: userLevelEnum;
	coop: { value: string; label: string };
	location: { lon: number; lat: number; label: string };
	googleAutocomplete: string;
	phone: string;
	password: string;
}

export interface SignupAgriProps {
	onClickCreateAccount: (formValues: formValuesType) => void;
	onGoBack: () => void;
	loading: boolean;
	methods: UseFormReturn;
	activeStep: number;
	serverError: boolean;
	goPreviousStep: () => void;
	goNextStep: () => void;
	level: userLevelEnum;
}
