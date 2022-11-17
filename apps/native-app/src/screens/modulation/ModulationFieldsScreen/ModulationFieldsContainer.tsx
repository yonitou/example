import { useContext } from "react";
import { fieldType } from "@Types/field.types";
import { ModalsContext } from "@Context/ModalContext";
import Analytics from "@Analytics";
import { slotType, taskTypeEnum } from "@Types/task.types";
import { ModulationContext } from "@Context/ModulationContext";
import useSelectedFields from "@Hooks/useSelectedFields";
import { ModulationFieldsContainerProps } from "./screen.types";
import ModulationFieldsScreen from "./ModulationFieldsScreen";

const ModulationFieldsContainer = ({ route, navigation }: ModulationFieldsContainerProps): JSX.Element => {
	const fromReportScreen: boolean = route?.params?.fromReportScreen ?? false;
	const {
		selectedProducts,
		modulationParams,
		selectedSlot,
		selectedFields: initialFields,
		setSelectedSlot,
		setSlotSize,
		setSelectedFields,
	} = useContext(ModulationContext);
	const { setSlotSelectorModalProps } = useContext(ModalsContext);
	const {
		onNavBack,
		onNavClose,
		onNavNext,
		addField,
		removeField,
		loading,
		authorizedFields,
		setFieldsFiltering,
		fieldsFiltering,
		selectedFields,
	} = useSelectedFields({ navigation, selectedProducts, fromReportScreen, initialFields, type: taskTypeEnum.COMING });

	const updateList = (item: fieldType, action: "ADD" | "DELETE"): void => {
		if (action === "ADD") {
			addField(item);
		} else {
			removeField(item);
		}
	};

	const onSubmit = (newSlot: slotType): void => {
		const { logAnalyticEvent, events } = Analytics;
		setSelectedFields(selectedFields);
		setSlotSize(newSlot.max - newSlot.min);
		logAnalyticEvent(events.modulation.modulationFieldsScreen.validateFields, {
			...modulationParams,
		});

		onNavNext();
	};

	const showSlotSelectorModal = (): void => {
		setSlotSelectorModalProps({
			visibility: true,
			props: {
				onNavNext: onSubmit,
				slot: selectedSlot,
				setSlot: setSelectedSlot,
			},
		});
	};

	return (
		<ModulationFieldsScreen
			onNavBack={onNavBack}
			onNavClose={onNavClose}
			fields={authorizedFields}
			showSlotSelectorModal={showSlotSelectorModal}
			loading={loading}
			updateList={updateList}
			handleFilter={setFieldsFiltering}
			fieldsFiltering={fieldsFiltering}
			selectedFields={selectedFields}
		/>
	);
};

export default ModulationFieldsContainer;
