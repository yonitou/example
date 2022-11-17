import { ErrorsEnum } from "@Types/auth.types";

export interface NeedSetupScreenProps {
	error: ErrorsEnum;
	logout: () => void;
}
