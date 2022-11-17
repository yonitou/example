import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Control, FieldValues, FormState, UseFormHandleSubmit } from "react-hook-form";

export interface EquipmentAdvancedScreenProps {
	onSubmit: (data: FieldValues) => void;
	loading: boolean;
	onGoBack: () => void;
	handleSubmit: UseFormHandleSubmit<FieldValues>;
	control: Control;
	formState: FormState<FieldValues>;
}

export interface EquipmentAdvancedContainerProps {
	navigation: NativeStackNavigationProp<ParamListBase>;
}
