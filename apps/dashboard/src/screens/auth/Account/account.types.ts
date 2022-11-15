import { coopType } from "@Types/coop.types";
import { planStatusEnum, planType } from "@Types/plan.types";
import { Ref } from "react";
import { UseFormReturn } from "react-hook-form";

export interface FormInputs {
	coop: { value: string; label: string };
	location: { lat: number; lon: number; label: string };
	googleAutocomplete: string;
}
export interface AccountProps {
	methods: UseFormReturn<FormInputs>;
	plan: planType;
	hasFarmWeather: boolean;
	loading: boolean;
	smagSectionRef: Ref<HTMLDivElement>;
	planStatus: planStatusEnum;
	onSubmit: ({ coop }: FormInputs) => Promise<void>;
	onCancel: () => void;
	onClickManageSubscription: () => void;
	onClickPricing: () => void;
	coops: coopType[];
	openAccountDeleteModal: () => void;
}
