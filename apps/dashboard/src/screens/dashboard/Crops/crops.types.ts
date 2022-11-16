import { ModeEnum } from "@Context/CropScreenContext";
import { fieldType } from "@Types/fields.types";

export interface CropsProps {
	lastSelectedField: fieldType;
	multiSelectionEnabled: boolean;
	currentMode: ModeEnum;
}
