import { RefObject } from "react";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { activeProductType, productFamilyEnum } from "@Types/activeProduct.types";
import { nozzleType } from "@Types/nozzle.types";
import { fieldType } from "@Types/field.types";
import { metricsType } from "@Types/meteo.types";
import { NativeScrollEvent, ScrollView } from "react-native";
import { doneTaskType } from "@Types/task.types";
import { targetType } from "@Types/target.types";
import { tankType } from "@Types/tank.types";

export interface DoneTaskReportContainerProps {
	navigation: NativeStackNavigationProp<ParamListBase>;
	route: RouteProp<{
		params: {
			taskId: number;
			task: doneTaskType;
		};
	}>;
}

export interface DoneTaskReportScreenProps {
	selectedDay: string;
	goNavBack: () => void;
	submitting: boolean;
	goToFields: () => void;
	goToTargets: () => void;
	onScrollBeginDrag: ({ nativeEvent }: { nativeEvent: NativeScrollEvent }) => void;
	scrollRef: RefObject<ScrollView>;
	goToProducts: () => void;
	goNavClose: () => void;
	taskId: number;
	productFamily: productFamilyEnum;
	tankIndications: tankType;
	modulation: number;
	condition: number;
	selectedTargets: targetType[];
	volume: number;
	debit: number;
	loading: boolean;
	selectedProducts: activeProductType[];
	selectedFields: fieldType[];
	goNavCloseAndDelete: () => void;
	selectedSlot: { min: number; max: number };
	nozzle: nozzleType;
	metricsOfTheSelectedSlot: metricsType;
	totalArea: number;
	onRequestEditDebit: () => void;
	startTime: Date;
	endTime: Date;
	onRequestEditNozzle: () => void;
	notes: string;
	setNotes: (notes: string) => void;
	saveReport: () => void;
}
