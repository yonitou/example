import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Control, FieldValues, FormState, UseFormHandleSubmit } from "react-hook-form";

export interface SigninContainerProps {
	navigation: NativeStackNavigationProp<ParamListBase>;
}

export interface SigninScreenProps {
	onNavBack: () => void;
	onSubmit: (data: FieldValues) => Promise<void>;
	control: Control;
	handleSubmit: UseFormHandleSubmit<FieldValues>;
	loading: boolean;
	formState: FormState<FieldValues>;
	onPasswordForgotten: () => Promise<void>;
}
