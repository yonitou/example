import { planType } from "@Types/plan.types";

export interface PricingProps {
	openChargebeePortal: () => void;
	plans: planType[];
	loading: boolean;
}
