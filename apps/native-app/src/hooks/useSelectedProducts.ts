import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState, useContext, useEffect } from "react";
import { ModalsContext } from "@Context/ModalContext";
import { UserContext } from "@Context/UserContext";
import { activeProductType, productUnitEnum } from "@Types/activeProduct.types";
import { doneTaskType, taskTypeEnum } from "@Types/task.types";
import Analytics from "@Analytics";
import { useFeature } from "flagged";
import { featuresEnum } from "@Types/feature.types";
import { checkProductMix } from "@Api/hygoApi";
import { tankType } from "@Types/tank.types";
import { targetType } from "@Types/target.types";

interface useSelectedProductsProps {
	initialProducts: activeProductType[];
	initialTargets: targetType[];
	navigation?: NativeStackNavigationProp<ParamListBase>;
	fromReportScreen?: boolean;
	type?: taskTypeEnum;
	debit?: number;
}

interface useSelectedProductsResult {
	products: activeProductType[];
	selectedProducts: activeProductType[];
	selectedTargets: targetType[];
	tankIndications: tankType;
	setSelectedProducts: (prods: activeProductType[]) => void;
	setSelectedTargets: (targets: targetType[]) => void;
	addProduct: (item: activeProductType, withDoseModal?: boolean) => void;
	removeProduct: (item: activeProductType) => void;
	onNavBack: () => void;
	onNavClose: () => void;
	onNavNext: (taskParam?: doneTaskType) => void;
}

const useSelectedProducts = ({
	navigation,
	fromReportScreen,
	initialProducts = [],
	initialTargets = [],
	type,
	debit,
}: useSelectedProductsProps): useSelectedProductsResult => {
	const hasOptimize = useFeature(featuresEnum.OPTIMIZE);
	const { logAnalyticEvent, events } = Analytics;
	const { setDoseInputModalProps } = useContext(ModalsContext);
	const [selectedProducts, setSelectedProducts] = useState<activeProductType[]>(initialProducts);
	const [selectedTargets, setSelectedTargets] = useState<targetType[]>(initialTargets);
	const { products } = useContext(UserContext);
	const [tankIndications, setTankIndications] = useState<tankType>();
	const isDoneTask = type === taskTypeEnum.DONE;

	const onNavBack = (): void => {
		if (!isDoneTask && fromReportScreen) navigation.navigate("ComingTaskReportScreen");
		else {
			logAnalyticEvent(events.modulation.modulationProductsScreen.navBack, {
				selectedProducts,
			});
			navigation.goBack();
		}
	};
	const onNavClose = (): void => (fromReportScreen && isDoneTask ? navigation.pop() : navigation.navigate("Tabs"));

	const tracabilityNavigation = (taskParam?: doneTaskType): void => {
		navigation.push("DoneTaskReportScreen", {
			task: taskParam,
		});
	};

	const modulationNavigation = (): void => {
		if (!fromReportScreen) navigation.push("ModulationFieldsScreen");
		else navigation.push("ComingTaskReportScreen");
	};

	const onNavNext = (taskParam?: doneTaskType): void => {
		isDoneTask ? tracabilityNavigation(taskParam) : modulationNavigation();
	};

	const removeProduct = (item: activeProductType): void => {
		setSelectedProducts((prevSelectedProducts) => [...prevSelectedProducts.filter((p) => p.id !== item.id)]);
	};

	const addProduct = (item: activeProductType, withDoseModal = true): void => {
		if (!withDoseModal) {
			setSelectedProducts((prevSelectedProducts) => [
				...prevSelectedProducts.filter((p) => p.id !== item.id),
				item,
			]);
			return;
		}
		setDoseInputModalProps({
			visibility: true,
			props: {
				defaultValue: item?.dose || item?.minDose,
				debit,
				dosesSum: selectedProducts
					.filter((p) => p.unit === productUnitEnum.LITER_PER_HA && p.id !== item.id)
					.reduce((sum, { dose }) => sum + dose, 0),
				setInput: (dose: number) => {
					const newItem: activeProductType = { ...item, dose, modulationActive: !!hasOptimize };

					setSelectedProducts((prevSelectedProducts) => [
						...prevSelectedProducts.filter((p) => p.id !== newItem.id),
						newItem,
					]);
				},
				item,
			},
		});
	};

	useEffect(() => {
		const checkTankIndications = async (): Promise<void> => {
			const fetchedTankIndications = await checkProductMix({ productIds: selectedProducts?.map((p) => p.id) });
			setTankIndications(fetchedTankIndications);
			if (!fetchedTankIndications?.configuration?.withTargets) setSelectedTargets([]);
		};
		selectedProducts?.length > 0 ? checkTankIndications() : setTankIndications(null);
	}, [selectedProducts]);

	useEffect(() => {
		if (initialProducts?.length > 0) setSelectedProducts(initialProducts);
	}, [initialProducts]);
	useEffect(() => {
		if (initialTargets?.length > 0) setSelectedTargets(initialTargets);
	}, [initialTargets]);

	return {
		products,
		selectedProducts,
		setSelectedTargets,
		tankIndications,
		setSelectedProducts,
		addProduct,
		removeProduct,
		onNavBack,
		onNavClose,
		onNavNext,
		selectedTargets,
	};
};

export default useSelectedProducts;
