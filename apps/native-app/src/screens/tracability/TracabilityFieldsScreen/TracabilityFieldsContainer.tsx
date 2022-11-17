import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fieldType } from "@Types/field.types";
import { ModalsContext } from "@Context/ModalContext";
import useSelectedFields from "@Hooks/useSelectedFields";
import { doneTaskType, taskTypeEnum } from "@Types/task.types";
import Analytics from "@Analytics";
import COLORS from "@Constants/palette";
import { TracabilityFieldsContainerProps } from "./screen.types";
import TracabilityFieldsScreen from "./TracabilityFieldsScreen";

const TracabilityFieldsContainer = ({ route, navigation }: TracabilityFieldsContainerProps): JSX.Element => {
	const { t } = useTranslation();
	const { logAnalyticEvent, events } = Analytics;
	const fromReportScreen: boolean = route?.params?.fromReportScreen ?? false;
	const [task, setTask] = useState<doneTaskType>();
	const [activeModulation, setActiveModulation] = useState<boolean>();
	const { setConfirmationModalProps } = useContext(ModalsContext);

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
	} = useSelectedFields({
		navigation,
		selectedProducts: task?.selectedProducts,
		fromReportScreen,
		initialFields: task?.selectedFields,
		type: taskTypeEnum.DONE,
	});

	const showSwitchButton = task?.selectedProducts.length > 0;

	const updateList = (field: fieldType, action: "ADD" | "DELETE"): void => {
		if (activeModulation) {
			setConfirmationModalProps({
				visibility: true,

				props: {
					handleConfirm: () => setActiveModulation(false),
					confirmLabel: t("common.button.confirm"),
					dismissLabel: t("common.button.cancel"),
					btnColorPalette: COLORS.LAKE,
					body: t("modals.tracabilityModulationWarning.description"),
				},
			});
			return;
		}
		logAnalyticEvent(events.tracability.tracabilityAndDoneTaskScreen.updateFields, {
			...task,
		});
		if (action === "ADD") {
			addField(field);
		} else {
			removeField(field);
		}
	};

	const handleFilter = (value: boolean): void => {
		setFieldsFiltering(value);
	};

	const onSubmit = (): void => {
		const taskParam = activeModulation
			? task
			: {
					...task,
					modulation: 0,
					selectedProducts: task.selectedProducts.map((p) => ({
						...p,
						modulation: 0,
						modulationActive: false,
					})),
			  };
		logAnalyticEvent(events.tracability.tracabilityAndDoneTaskScreen.validateFields, {
			...taskParam,
		});
		onNavNext(taskParam);
	};

	useEffect(() => {
		setTask((prev) => ({ ...prev, selectedFields }));
	}, [selectedFields]);

	useEffect(() => {
		if (route?.params) {
			setActiveModulation(route?.params?.task?.modulation > 0 ?? false);
			setTask(route?.params?.task);
		}
	}, [route]);

	return (
		<TracabilityFieldsScreen
			onNavBack={onNavBack}
			onNavNext={onSubmit}
			fields={authorizedFields}
			onNavClose={onNavClose}
			loading={loading}
			updateList={updateList}
			selectedFields={selectedFields}
			handleFilter={handleFilter}
			fieldsFiltering={fieldsFiltering}
			showSwitchButton={showSwitchButton}
		/>
	);
};

export default TracabilityFieldsContainer;
