import { activeProductType, productFamilyEnum } from "./activeProduct.types";
import { globalConditionType } from "./condition.types";
import { targetType } from "./target.types";

export interface mixtureType {
	selectedProducts: activeProductType[];
	selectedTargets: targetType[];
	conditions: globalConditionType[];
	id: number;
	productFamily: productFamilyEnum;
}
