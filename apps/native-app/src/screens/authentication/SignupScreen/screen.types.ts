import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Control, FieldValues, FormState, UseFormHandleSubmit } from "react-hook-form";

export interface SignupContainerProps {
	navigation: NativeStackNavigationProp<ParamListBase>;
}

export interface SignupScreenProps {
	onNavBack: () => void;
	control: Control;
	handleSubmit: UseFormHandleSubmit<FieldValues>;
	loading: boolean;
	activeStep: 1 | 2;
	setValue: (name: string, value: unknown) => void;
	onSubmit: (data: FieldValues) => Promise<void>;
	goPreviousStep: () => void;
	values: Record<string, string>;
	goNextStep: () => void;
	formState: FormState<FieldValues>;
}
