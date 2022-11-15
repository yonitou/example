import { UseFormReturn } from "react-hook-form";

export interface FormInputs {
	email: string;
	password: string;
}

export interface SigninProps {
	loading: boolean;
	methods: UseFormReturn;
	onClickSignUp: () => void;
	onSubmit: ({ email, password }: FormInputs) => Promise<void>;
}
