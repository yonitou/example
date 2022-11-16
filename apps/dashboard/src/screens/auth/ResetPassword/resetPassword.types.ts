import { UseFormReturn } from "react-hook-form";

export interface FormInputs {
	password: string;
}

export interface ResetPasswordProps {
	loading: boolean;
	onSubmit: ({ password }: FormInputs) => Promise<void>;
	onGoBack: () => void;
	methods: UseFormReturn;
	passwordUpdated: boolean;
}
