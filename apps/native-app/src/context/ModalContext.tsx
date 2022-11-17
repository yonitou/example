import { createContext, useState, Dispatch, useMemo } from "react";
import { ProductMissingModalPropsType } from "@Components/modals/ProductMissingModal";
import { DoseInputModalPropsType } from "@Components/modals/DoseInputModal";
import { DebitInputModalPropsType } from "@Components/modals/DebitInputModal";
import { SlotSelectorModalPropsType } from "@Components/modals/SlotSelectorModal";
import { NozzleHeightSelectorModalPropsType } from "@Components/modals/NozzleHeightSelectorModal";
import { ColorSelectorModalPropsType } from "@Components/modals/ColorSelectorModal";
import { NozzleModalPropsType } from "@Components/modals/NozzleModal";
import { TextInputModalPropsType } from "@Components/modals/TextInputModal";
import { ParamsHelperModalPropsType } from "@Components/modals/ParamsHelperModal";
import { ProductsModulationModalPropsType } from "@Components/modals/ProductsModulationModal";
import { ConfirmationModalPropsType } from "@Components/modals/ConfirmationModal";
import { RecommendationDetailsModalPropsType } from "@Components/modals/RecommendationDetailsModal";
import { TargetSelectorModalPropsType } from "@Components/modals/TargetSelectorModal";

export type ModalPropsType =
	| ProductMissingModalPropsType
	| DoseInputModalPropsType
	| DebitInputModalPropsType
	| SlotSelectorModalPropsType
	| ColorSelectorModalPropsType
	| NozzleModalPropsType
	| NozzleHeightSelectorModalPropsType
	| TextInputModalPropsType
	| ParamsHelperModalPropsType
	| ProductsModulationModalPropsType
	| ConfirmationModalPropsType
	| RecommendationDetailsModalPropsType
	| TargetSelectorModalPropsType;

interface ModalsContextType {
	productMissingModalProps: { visibility: boolean; props: ProductMissingModalPropsType };
	setProductMissingModalProps: Dispatch<{ visibility: boolean; props: ProductMissingModalPropsType }>;
	doseInputModalProps: { visibility: boolean; props: DoseInputModalPropsType };
	setDoseInputModalProps: Dispatch<{ visibility: boolean; props: DoseInputModalPropsType }>;
	debitInputModalProps: { visibility: boolean; props: DebitInputModalPropsType };
	setDebitInputModalProps: Dispatch<{ visibility: boolean; props: DebitInputModalPropsType }>;
	confirmationModalProps: { visibility: boolean; props: ConfirmationModalPropsType };
	setConfirmationModalProps: Dispatch<{ visibility: boolean; props: ConfirmationModalPropsType }>;
	slotSelectorModalProps: { visibility: boolean; props: SlotSelectorModalPropsType };
	setSlotSelectorModalProps: Dispatch<{ visibility: boolean; props: SlotSelectorModalPropsType }>;
	colorSelectorModalProps: { visibility: boolean; props: ColorSelectorModalPropsType };
	setColorSelectorModalProps: Dispatch<{ visibility: boolean; props: ColorSelectorModalPropsType }>;
	nozzleModalProps: { visibility: boolean; props: NozzleModalPropsType };
	setNozzleModalProps: Dispatch<{ visibility: boolean; props: NozzleModalPropsType }>;
	mixtureLimitModalProps: { visibility: boolean; props: ModalPropsType };
	setMixtureLimitModalProps: Dispatch<{ visibility: boolean; props: ModalPropsType }>;
	nozzleHeightSelectorModalProps: { visibility: boolean; props: NozzleHeightSelectorModalPropsType };
	deleteAccountModalProps: { visibility: boolean; props: ModalPropsType };
	setDeleteAccountModalProps: Dispatch<{ visibility: boolean; props: ModalPropsType }>;
	addSensorModalProps: { visibility: boolean; props: ModalPropsType };
	setAddSensorModalProps: Dispatch<{ visibility: boolean; props: ModalPropsType }>;
	setNozzleHeightSelectorModalProps: Dispatch<{ visibility: boolean; props: NozzleHeightSelectorModalPropsType }>;
	textInputModalProps: { visibility: boolean; props: TextInputModalPropsType };
	setTextInputModalProps: Dispatch<{ visibility: boolean; props: TextInputModalPropsType }>;
	paramsHelperModalProps: { visibility: boolean; props: ParamsHelperModalPropsType };
	setParamsHelperModalProps: Dispatch<{ visibility: boolean; props: ParamsHelperModalPropsType }>;
	needHelpModalProps: { visibility: boolean; props: ModalPropsType };
	setNeedHelpModalProps: Dispatch<{ visibility: boolean; props: ModalPropsType }>;
	productsModulationModalProps: { visibility: boolean; props: ProductsModulationModalPropsType };
	setProductsModulationModalProps: Dispatch<{ visibility: boolean; props: ProductsModulationModalPropsType }>;
	recommendationDetailsModalProps: { visibility: boolean; props: RecommendationDetailsModalPropsType };
	setRecommendationDetailsModalProps: Dispatch<{ visibility: boolean; props: RecommendationDetailsModalPropsType }>;
	targetSelectorModalProps: { visibility: boolean; props: TargetSelectorModalPropsType };
	setTargetSelectorModalProps: Dispatch<{ visibility: boolean; props: TargetSelectorModalPropsType }>;
}

export const ModalsContext = createContext({} as ModalsContextType);

const ModalsProvider = ({ children }: { children: JSX.Element[] }): JSX.Element => {
	const [productMissingModalProps, setProductMissingModalProps] = useState({
		visibility: false,
		props: {} as ProductMissingModalPropsType,
	});
	const [mixtureLimitModalProps, setMixtureLimitModalProps] = useState({
		visibility: false,
		props: {} as ModalPropsType,
	});
	const [doseInputModalProps, setDoseInputModalProps] = useState({
		visibility: false,
		props: {} as DoseInputModalPropsType,
	});
	const [debitInputModalProps, setDebitInputModalProps] = useState({
		visibility: false,
		props: {} as DebitInputModalPropsType,
	});
	const [deleteAccountModalProps, setDeleteAccountModalProps] = useState({
		visibility: false,
		props: {} as ModalPropsType,
	});
	const [confirmationModalProps, setConfirmationModalProps] = useState({
		visibility: false,
		props: {} as ConfirmationModalPropsType,
	});
	const [slotSelectorModalProps, setSlotSelectorModalProps] = useState({
		visibility: false,
		props: {} as SlotSelectorModalPropsType,
	});
	const [colorSelectorModalProps, setColorSelectorModalProps] = useState({
		visibility: false,
		props: {} as ColorSelectorModalPropsType,
	});
	const [nozzleHeightSelectorModalProps, setNozzleHeightSelectorModalProps] = useState({
		visibility: false,
		props: {} as NozzleHeightSelectorModalPropsType,
	});
	const [nozzleModalProps, setNozzleModalProps] = useState({
		visibility: false,
		props: {} as NozzleModalPropsType,
	});
	const [textInputModalProps, setTextInputModalProps] = useState({
		visibility: false,
		props: {} as TextInputModalPropsType,
	});
	const [paramsHelperModalProps, setParamsHelperModalProps] = useState({
		visibility: false,
		props: {} as ParamsHelperModalPropsType,
	});
	const [needHelpModalProps, setNeedHelpModalProps] = useState({
		visibility: false,
		props: {} as ModalPropsType,
	});
	const [addSensorModalProps, setAddSensorModalProps] = useState({
		visibility: false,
		props: {} as ModalPropsType,
	});
	const [productsModulationModalProps, setProductsModulationModalProps] = useState({
		visibility: false,
		props: {} as ProductsModulationModalPropsType,
	});
	const [recommendationDetailsModalProps, setRecommendationDetailsModalProps] = useState({
		visibility: false,
		props: {} as RecommendationDetailsModalPropsType,
	});
	const [targetSelectorModalProps, setTargetSelectorModalProps] = useState({
		visibility: false,
		props: {} as TargetSelectorModalPropsType,
	});

	const value = useMemo(
		(): ModalsContextType => ({
			targetSelectorModalProps,
			setTargetSelectorModalProps,
			productMissingModalProps,
			setProductMissingModalProps,
			mixtureLimitModalProps,
			setMixtureLimitModalProps,
			doseInputModalProps,
			setDoseInputModalProps,
			debitInputModalProps,
			deleteAccountModalProps,
			setDeleteAccountModalProps,
			setDebitInputModalProps,
			confirmationModalProps,
			setConfirmationModalProps,
			addSensorModalProps,
			setAddSensorModalProps,
			slotSelectorModalProps,
			setSlotSelectorModalProps,
			colorSelectorModalProps,
			setColorSelectorModalProps,
			nozzleModalProps,
			setNozzleModalProps,
			nozzleHeightSelectorModalProps,
			setNozzleHeightSelectorModalProps,
			textInputModalProps,
			setTextInputModalProps,
			paramsHelperModalProps,
			setParamsHelperModalProps,
			needHelpModalProps,
			setNeedHelpModalProps,
			productsModulationModalProps,
			setProductsModulationModalProps,
			recommendationDetailsModalProps,
			setRecommendationDetailsModalProps,
		}),
		[
			productMissingModalProps,
			mixtureLimitModalProps,
			targetSelectorModalProps,
			doseInputModalProps,
			debitInputModalProps,
			confirmationModalProps,
			slotSelectorModalProps,
			deleteAccountModalProps,
			colorSelectorModalProps,
			nozzleModalProps,
			nozzleHeightSelectorModalProps,
			textInputModalProps,
			paramsHelperModalProps,
			needHelpModalProps,
			productsModulationModalProps,
			addSensorModalProps,
			recommendationDetailsModalProps,
		]
	);

	return <ModalsContext.Provider value={value}>{children}</ModalsContext.Provider>;
};

export default ModalsProvider;
