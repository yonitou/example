import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Dispatch, RefObject, SetStateAction } from "react";
import { activeProductType, productFamilyEnum } from "@Types/activeProduct.types";
import { fieldType } from "@Types/field.types";
import { conditionEnum } from "@Types/condition.types";
import { metricsType } from "@Types/meteo.types";
import { nozzleType } from "@Types/nozzle.types";
import { comingTaskType, slotType } from "@Types/task.types";
import { NativeScrollEvent, ScrollView } from "react-native";
import { targetType } from "@Types/target.types";
import { tankType } from "@Types/tank.types";

export interface ComingTaskReportScreenProps {
	goNavBack: () => void;
	saveReport: () => void;
	goNavClose: () => void;
	goToProducts: () => void;
	goToFields: () => void;
	goToSlots: () => void;
	goToTargets: () => void;
	onScrollBeginDrag: ({ nativeEvent }: { nativeEvent: NativeScrollEvent }) => void;
	tankIndications: tankType;
	productFamily: productFamilyEnum;
	taskId: number;
	submitting: boolean;
	modulationOfTheSelectedSlot: number;
	conditionsOfTheSelectedSlot: conditionEnum;
	scrollRef: RefObject<ScrollView>;
	metricsOfTheSelectedSlot: metricsType;
	loading: boolean;
	selectedTargets: targetType[];
	volume: number;
	debit: number;
	selectedProducts: activeProductType[];
	selectedFields: fieldType[];
	selectedSlot: slotType;
	selectedDay: string;
	totalArea: number;
	updateProducts: (products: activeProductType[]) => void;
	nozzle: nozzleType;
	notes: string;
	setNotes: Dispatch<SetStateAction<string>>;
	onRequestEditNozzle: () => void;
	onRequestEditDebit: () => void;
	goNavCloseAndDelete: () => void;
}
export interface ComingTaskReportContainerProps {
	navigation: NativeStackNavigationProp<ParamListBase>;
	route: RouteProp<{
		params: {
			initModulation: comingTaskType;
			fromModulation: boolean;
		};
	}>;
}
