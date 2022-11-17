import { useEffect, useContext, useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";
import Analytics from "@Analytics";
import { getNozzle } from "@Api/hygoApi";
import { AuthContext } from "@Context/AuthContext";
import { ModulationContext } from "@Context/ModulationContext";
import useSelectedProducts from "@Hooks/useSelectedProducts";
import { taskTypeEnum } from "@Types/task.types";
import useTask from "@Hooks/useTask";
import { nozzleType } from "@Types/nozzle.types";
import { ModulationProductsContainerProps } from "./screen.types";
import ModulationProductsScreen from "./ModulationProductsScreen";

const ModulationProductsContainer = ({ navigation, route }: ModulationProductsContainerProps): JSX.Element => {
	const { logAnalyticEvent, events } = Analytics;
	const isFocused = useIsFocused();
	const fromReportScreen: boolean = route.params?.fromReportScreen ?? false;
	const targetsModalOpened: boolean = route?.params?.targetsModalOpened;
	const {
		modulationParams,
		setNozzle,
		debit,
		setDebit,
		setSelectedProducts,
		nozzle,
		selectedProducts: initialProducts,
		selectedTargets: initialTargets,
		setSelectedTargets,
	} = useContext(ModulationContext);
	const { user } = useContext(AuthContext);
	const {
		products,
		selectedProducts,
		tankIndications,
		addProduct,
		removeProduct,
		onNavBack,
		onNavNext,
		setSelectedTargets: updateTargetsList,
		selectedTargets,
	} = useSelectedProducts({
		navigation,
		initialTargets,
		fromReportScreen,
		initialProducts,
		type: taskTypeEnum.COMING,
		debit,
	});
	const { onRequestEditNozzle, onRequestEditDebit } = useTask({
		navigation,
		type: taskTypeEnum.COMING,
		task: modulationParams,
		onChangeNozzle: (nozz: nozzleType) => setNozzle(nozz),
		onChangeDebit: (deb: number) => setDebit(deb),
	});

	const onSubmit = (): void => {
		logAnalyticEvent(events.modulation.modulationProductsScreen.validateProducts, {
			...modulationParams,
		});
		setSelectedProducts(selectedProducts);
		setSelectedTargets(selectedTargets);
		onNavNext();
	};

	const loadEquipment = useCallback(async (): Promise<void> => {
		const defaultNozzle = await getNozzle(user?.configuration?.defaultNozzleId);
		setNozzle(defaultNozzle);
	}, [user, setNozzle]);

	const handleDebitClick = (): void => onRequestEditDebit(events.modulation.modulationProductsScreen.editDebit);

	const handleNozzleClick = (): void => onRequestEditNozzle(events.modulation.modulationProductsScreen.editNozzle);

	useEffect(() => {
		if (isFocused && !nozzle) loadEquipment();
	}, [isFocused, nozzle, loadEquipment]);

	return (
		<ModulationProductsScreen
			selectedTargets={selectedTargets}
			nozzle={nozzle}
			handleNozzleClick={handleNozzleClick}
			targetsModalOpened={targetsModalOpened}
			tankIndications={tankIndications}
			debit={debit}
			handleDebitClick={handleDebitClick}
			products={products}
			onSelectTargets={updateTargetsList}
			selectedProducts={selectedProducts}
			addProduct={addProduct}
			removeProduct={removeProduct}
			onNavBack={onNavBack}
			onNavNext={onSubmit}
		/>
	);
};

export default ModulationProductsContainer;
