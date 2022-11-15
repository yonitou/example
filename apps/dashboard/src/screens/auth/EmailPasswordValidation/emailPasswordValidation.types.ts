import { UseFormReturn } from "react-hook-form";

export interface FormInputs {
	email: string;
}
export interface EmailPasswordValidationProps {
	loading: boolean;
	onSubmit: ({ email }: FormInputs) => Promise<void>;
	onGoBack: () => void;
	methods: UseFormReturn;
	emailSent: boolean;
}
