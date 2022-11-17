import { useContext, Dispatch, SetStateAction } from "react";
import { ModalsContext, ModalPropsType } from "@Context/ModalContext";
import ProductsModulationModal from "./ProductsModulationModal";
import ProductMissingModal from "./ProductMissingModal";
import DoseInputModal from "./DoseInputModal";
import DebitInputModal from "./DebitInputModal";
import ConfirmationModal from "./ConfirmationModal";
import SlotSelectorModal from "./SlotSelectorModal";
import NozzleHeightSelectorModal from "./NozzleHeightSelectorModal";
import ColorSelectorModal from "./ColorSelectorModal";
import NozzleModal from "./NozzleModal";
import TextInputModal from "./TextInputModal";
import ParamsHelperModal from "./ParamsHelperModal";
import NeedHelpModal from "./NeedHelpModal";
import AddSensorModal from "./AddSensorModal";
import DeleteAccountModal from "./DeleteAccountModal";
import RecommendationsDetailsModal from "./RecommendationDetailsModal";
import TargetSelectorModal from "./TargetSelectorModal";
import MixtureLimitModal from "./MixtureLimitModal";

const Modals = (): JSX.Element => {
	const hideModal = (
		setStateCallBack: Dispatch<SetStateAction<{ visibility: boolean; props: ModalPropsType }>>
	): void => setStateCallBack((prev) => ({ ...prev, visibility: false }));
	const {
		productMissingModalProps,
		setProductMissingModalProps,
		addSensorModalProps,
		setAddSensorModalProps,
		doseInputModalProps,
		setDoseInputModalProps,
		debitInputModalProps,
		deleteAccountModalProps,
		setDeleteAccountModalProps,
		setDebitInputModalProps,
		confirmationModalProps,
		setConfirmationModalProps,
		nozzleHeightSelectorModalProps,
		setNozzleHeightSelectorModalProps,
		slotSelectorModalProps,
		setSlotSelectorModalProps,
		mixtureLimitModalProps,
		setMixtureLimitModalProps,
		productsModulationModalProps,
		setProductsModulationModalProps,
		colorSelectorModalProps,
		setColorSelectorModalProps,
		nozzleModalProps,
		setNozzleModalProps,
		textInputModalProps,
		setTextInputModalProps,
		paramsHelperModalProps,
		setParamsHelperModalProps,
		needHelpModalProps,
		setNeedHelpModalProps,
		recommendationDetailsModalProps,
		setRecommendationDetailsModalProps,
		targetSelectorModalProps,
		setTargetSelectorModalProps,
	} = useContext(ModalsContext);

	return (
		<>
			{productMissingModalProps.visibility && (
				<ProductMissingModal
					modalVisible={productMissingModalProps.visibility}
					hideModal={() => hideModal(setProductMissingModalProps)}
				/>
			)}

			{doseInputModalProps.visibility && (
				<DoseInputModal
					modalVisible={doseInputModalProps.visibility}
					hideModal={() => hideModal(setDoseInputModalProps)}
					defaultValue={doseInputModalProps.props.defaultValue}
					setInput={doseInputModalProps.props.setInput}
					item={doseInputModalProps.props.item}
					dosesSum={doseInputModalProps.props.dosesSum}
					debit={doseInputModalProps.props.debit}
				/>
			)}

			{nozzleHeightSelectorModalProps.visibility && (
				<NozzleHeightSelectorModal
					modalVisible={nozzleHeightSelectorModalProps.visibility}
					hideModal={() => hideModal(setNozzleHeightSelectorModalProps)}
					defaultValue={nozzleHeightSelectorModalProps.props.defaultValue}
					setInput={nozzleHeightSelectorModalProps.props.setInput}
				/>
			)}

			{debitInputModalProps.visibility && (
				<DebitInputModal
					modalVisible={debitInputModalProps.visibility}
					hideModal={() => hideModal(setDebitInputModalProps)}
					defaultValue={debitInputModalProps.props.defaultValue}
					setInput={debitInputModalProps.props.setInput}
					dosesSum={debitInputModalProps.props.dosesSum}
				/>
			)}

			{confirmationModalProps.visibility && (
				<ConfirmationModal
					modalVisible={confirmationModalProps.visibility}
					btnColorPalette={confirmationModalProps.props.btnColorPalette}
					hideModal={() => hideModal(setConfirmationModalProps)}
					title={confirmationModalProps.props.title}
					handleConfirm={confirmationModalProps.props.handleConfirm}
					confirmLabel={confirmationModalProps.props.confirmLabel}
					dismissLabel={confirmationModalProps.props.dismissLabel}
					body={confirmationModalProps.props.body}
				/>
			)}

			{slotSelectorModalProps.visibility && (
				<SlotSelectorModal
					modalVisible={slotSelectorModalProps.visibility}
					hideModal={() => hideModal(setSlotSelectorModalProps)}
					slot={slotSelectorModalProps.props.slot}
					setSlot={slotSelectorModalProps.props.setSlot}
					onNavNext={slotSelectorModalProps.props.onNavNext}
				/>
			)}

			{colorSelectorModalProps.visibility && (
				<ColorSelectorModal
					modalVisible={colorSelectorModalProps.visibility}
					hideModal={() => hideModal(setColorSelectorModalProps)}
					onColorChange={colorSelectorModalProps.props.onColorChange}
				/>
			)}

			{addSensorModalProps.visibility && (
				<AddSensorModal
					modalVisible={addSensorModalProps.visibility}
					hideModal={() => hideModal(setAddSensorModalProps)}
				/>
			)}

			{nozzleModalProps.visibility && (
				<NozzleModal
					modalVisible={nozzleModalProps.visibility}
					hideModal={() => hideModal(setNozzleModalProps)}
					onPressAdd={nozzleModalProps.props.onPressAdd}
					onPressNozzle={nozzleModalProps.props.onPressNozzle}
				/>
			)}

			{textInputModalProps.visibility && (
				<TextInputModal
					modalVisible={textInputModalProps.visibility}
					hideModal={() => hideModal(setTextInputModalProps)}
					title={textInputModalProps.props.title}
					defaultValue={textInputModalProps.props.defaultValue}
					setValue={textInputModalProps.props.setValue}
				/>
			)}

			{paramsHelperModalProps.visibility && (
				<ParamsHelperModal
					modalVisible={paramsHelperModalProps.visibility}
					hideModal={() => hideModal(setParamsHelperModalProps)}
					explicabilityKeys={paramsHelperModalProps.props.explicabilityKeys}
				/>
			)}
			{needHelpModalProps.visibility && (
				<NeedHelpModal
					modalVisible={needHelpModalProps.visibility}
					hideModal={() => hideModal(setNeedHelpModalProps)}
				/>
			)}
			{mixtureLimitModalProps.visibility && (
				<MixtureLimitModal
					modalVisible={mixtureLimitModalProps.visibility}
					hideModal={() => hideModal(setMixtureLimitModalProps)}
				/>
			)}
			{deleteAccountModalProps.visibility && (
				<DeleteAccountModal
					modalVisible={deleteAccountModalProps.visibility}
					hideModal={() => hideModal(setDeleteAccountModalProps)}
				/>
			)}
			{productsModulationModalProps.visibility && (
				<ProductsModulationModal
					modalVisible={productsModulationModalProps.visibility}
					hideModal={() => hideModal(setProductsModulationModalProps)}
					selectedProducts={productsModulationModalProps.props.selectedProducts}
					onConfirm={productsModulationModalProps.props.onConfirm}
					showModalSwitchBtns={productsModulationModalProps.props.showModalSwitchBtns}
				/>
			)}
			{targetSelectorModalProps.visibility && (
				<TargetSelectorModal
					modalVisible={targetSelectorModalProps.visibility}
					hideModal={() => hideModal(setTargetSelectorModalProps)}
					onSubmit={targetSelectorModalProps.props.onSubmit}
					initialTargets={targetSelectorModalProps.props.initialTargets}
				/>
			)}
			{recommendationDetailsModalProps.visibility && (
				<RecommendationsDetailsModal
					modalVisible={recommendationDetailsModalProps.visibility}
					hideModal={() => hideModal(setRecommendationDetailsModalProps)}
					withProductsExamples={recommendationDetailsModalProps.props.withProductsExamples}
					recommendation={recommendationDetailsModalProps.props.recommendation}
					icon={recommendationDetailsModalProps.props.icon}
				/>
			)}
		</>
	);
};

export default Modals;
