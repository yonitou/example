import { createContext, useState, useContext, useEffect, useCallback, useMemo } from "react";
import _ from "lodash";
import { createComingTask, getFarmWeather, getWeeklyModulations, patchComingTask } from "@Api/hygoApi";
import { activeProductType } from "@Types/activeProduct.types";
import { conditionEnum } from "@Types/condition.types";
import { fieldType } from "@Types/field.types";
import { meteoType, metricsType } from "@Types/meteo.types";
import { modulationDataType, ModulationInfosType, modulationStatusEnum, modulationType } from "@Types/modulation.types";
import { nozzleType } from "@Types/nozzle.types";
import { slotType } from "@Types/task.types";
import { addHours, getStartOfDayAsJSDate, getTodayDateAsJSDate } from "@Utils/time";
import { targetType } from "@Types/target.types";
import { UserContext } from "./UserContext";
import { AuthContext } from "./AuthContext";

interface ModulationContextProps extends Readonly<ModulationInfosType> {
	readonly modulationParams: ModulationInfosType;
	modulationStatus: modulationStatusEnum;
	conditionsOfTheSelectedDay: conditionEnum[];
	modulationOfTheSelectedDay: number[];
	conditions: conditionEnum[][];
	slotSize: number;
	taskId: number;
	modulationError: string;
	modulationData: modulationDataType[];
	getDataOverSlot: (slot?: slotType) => {
		conditionsOfTheSelectedSlot: conditionEnum;
		modulationOfTheSelectedSlot: number;
		modulationByProductOverSlot: { productId: number; modulation: number }[];
		metricsOfTheSelectedSlot: metricsType;
	};
	saveContext: () => Promise<void>;
	setSelectedSlot: (s: slotType) => void;
	setDebit: (n: number) => void;
	setNozzle: (n: nozzleType) => void;
	setSlotSize: (n: number) => void;
	setSelectedProducts: (products: activeProductType[]) => void;
	setSelectedTargets: (targets: targetType[]) => void;
	setSelectedFields: (fields: fieldType[]) => void;
	setNotes: (str: string) => void;
	initState: (initMod: ModulationInfosType) => void;
	setSelectedDay: (d: Date) => void;
	resetState: () => void;
}

export const ModulationContext = createContext({} as ModulationContextProps);

const ModulationProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
	const { defaultFarm } = useContext(UserContext);
	const { user } = useContext(AuthContext);
	const [selectedDay, setSelectedDay] = useState<Date>(getTodayDateAsJSDate());
	const [selectedFields, setSelectedFields] = useState<Array<fieldType>>([]);
	const [selectedProducts, setSelectedProducts] = useState<Array<activeProductType>>([]);
	const [selectedTargets, setSelectedTargets] = useState<targetType[]>([]);
	const [debit, setDebit] = useState<number>(user?.equipments?.debit || 100);
	const [nozzle, setNozzle] = useState<nozzleType>(null);
	const [notes, setNotes] = useState<string>("");
	const [selectedSlot, setSelectedSlot] = useState<slotType>({ min: 9, max: 12 });
	const [taskId, setTaskId] = useState<number>(null);
	const [slotSize, setSlotSize] = useState<number>(null);
	const [modulation, setModulation] = useState<modulationType>(null);
	const [modulationError, setModulationError] = useState<string>(null);
	const [meteoMetrics, setMeteoMetrics] = useState<meteoType>(null);

	// params to navigate through screens
	const modulationParams = useMemo(
		() => ({
			id: taskId,
			selectedFields,
			selectedProducts,
			selectedSlot,
			debit,
			nozzle,
			selectedDay,
			notes,
			selectedTargets,
		}),
		[debit, nozzle, notes, taskId, selectedDay, selectedFields, selectedProducts, selectedSlot, selectedTargets]
	);

	/*= ==========Modulations and losses ============= */

	useEffect(() => {
		const loadWeeklyModulations = async (): Promise<void> => {
			if (
				meteoMetrics?.aggregationByHour?.length > 0 &&
				selectedProducts.length > 0 &&
				slotSize &&
				nozzle &&
				selectedFields?.length > 0
			) {
				try {
					setModulation(null);
					setModulationError(null);
					const fetchedMod = await getWeeklyModulations({
						products: selectedProducts,
						weekMeteo: meteoMetrics.aggregationByHour,
						nozzle,
						delayInHours: slotSize,
						fieldIds: selectedFields?.map((f) => f.id),
						targetIds: selectedTargets?.map((t) => t.id),
					});
					setModulation(fetchedMod);
				} catch (e) {
					if (e?.response?.status === 412) setModulationError(e?.response?.data?.code);
					else throw e;
				}
			}
		};
		loadWeeklyModulations();
	}, [meteoMetrics, selectedProducts, nozzle, slotSize, selectedFields, selectedTargets]);

	/*= ===== Meteo ====== */

	useEffect(() => {
		const loadMeteo = async (fields: fieldType[]): Promise<void> => {
			if (!fields || fields.length === 0 || !slotSize) {
				setMeteoMetrics(null);
				return;
			}
			try {
				const data = await getFarmWeather({
					startAt: getTodayDateAsJSDate(),
					fieldIds: fields.map((f) => f.id),
					slidingMaxWindowSizeInHours: slotSize,
				});

				setMeteoMetrics(data);
			} catch (error) {
				setMeteoMetrics(null);
			}
		};
		loadMeteo(selectedFields);
	}, [selectedFields, slotSize]);

	const resetState = useCallback((): void => {
		setSelectedDay(getTodayDateAsJSDate());
		setSelectedFields([]);
		setSelectedProducts([]);
		setSelectedTargets([]);
		setDebit(user?.equipments?.debit || 100);
		setNozzle(null);
		setNotes("");
		setSelectedSlot({ min: 9, max: 12 });
		setTaskId(null);
		setSlotSize(null);
		setModulation(null);
		setModulationError(null);
		setMeteoMetrics(null);
	}, [user]);

	const initState = useCallback((initModulation: ModulationInfosType): void => {
		if (!initModulation) return;
		setTaskId(initModulation.id);
		setSelectedFields(initModulation.selectedFields);
		setSelectedProducts(initModulation.selectedProducts);
		setSelectedTargets(initModulation.selectedTargets);
		setSelectedSlot(initModulation.selectedSlot);
		setDebit(initModulation.debit);
		setNozzle(initModulation.nozzle);
		setSelectedDay(initModulation.selectedDay);
		setSlotSize(initModulation.selectedSlot.max - initModulation.selectedSlot.min);
		setNotes(initModulation.notes);
	}, []);

	const getDataOverSlot = useCallback(
		(
			slot?: slotType
		): {
			conditionsOfTheSelectedSlot: conditionEnum;
			modulationOfTheSelectedSlot: number;
			modulationByProductOverSlot: { productId: number; modulation: number }[];
			metricsOfTheSelectedSlot: metricsType;
		} => {
			const selectedTimestamp = addHours(selectedDay, slot ? slot?.min : selectedSlot?.min).toISOString();

			const modulationAndCondtions = modulation?.data.find((mod) => mod.timestamp === selectedTimestamp);
			const metricsOfTheSelectedSlot = meteoMetrics?.slidingAggregation.find(
				(mod) => mod.timestamps.from === selectedTimestamp
			);

			return {
				conditionsOfTheSelectedSlot: modulationAndCondtions?.conditionOverSlot,
				modulationOfTheSelectedSlot: modulationAndCondtions?.modulationOverSlot,
				modulationByProductOverSlot: modulationAndCondtions?.modulationByProductOverSlot,
				metricsOfTheSelectedSlot,
			};
		},
		[meteoMetrics?.slidingAggregation, modulation?.data, selectedDay, selectedSlot?.min]
	);

	const conditions = _(modulation?.data)
		.map((m) => {
			return { ...m, timestamp: new Date(m.timestamp).toISOString() };
		})
		.groupBy((m) => {
			const d = new Date(m.timestamp);
			d.setHours(0, 0, 0, 0);
			return d.toISOString();
		})
		.values()
		.sortBy((m) => new Date(m[0].timestamp).getTime())
		.map((hours) => _.sortBy(hours, (h) => new Date(h.timestamp).getTime()).map((x) => x.condition))
		.value();

	const conditionsOfTheSelectedDay = modulation?.data
		.filter((mod) => getStartOfDayAsJSDate(new Date(mod.timestamp)).toISOString() === selectedDay.toISOString())
		.map((mod) => mod.condition);

	const modulationOfTheSelectedDay = modulation?.data
		.filter((mod) => getStartOfDayAsJSDate(new Date(mod.timestamp)).toISOString() === selectedDay.toISOString())
		.map((mod) => mod.modulation);

	const saveContext = useCallback(async (): Promise<void> => {
		const comingTask = {
			id: taskId,
			selectedFields,
			selectedProducts: selectedProducts.map((product) => ({
				...product,
				modulation: getDataOverSlot().modulationByProductOverSlot?.find((mod) => mod.productId === product.id)
					.modulation,
			})),
			selectedTargets,
			selectedSlot,
			debit,
			nozzle,
			selectedDay,
			notes,
			metricsOfTheSelectedSlot: getDataOverSlot().metricsOfTheSelectedSlot,
			modulation: getDataOverSlot().modulationOfTheSelectedSlot,
			condition: getDataOverSlot().conditionsOfTheSelectedSlot,
		};
		taskId ? await patchComingTask(comingTask, defaultFarm.id) : await createComingTask(comingTask, defaultFarm.id);
	}, [
		debit,
		getDataOverSlot,
		defaultFarm,
		notes,
		nozzle,
		selectedDay,
		selectedTargets,
		selectedFields,
		selectedProducts,
		selectedSlot,
		taskId,
	]);

	const value = useMemo(
		(): ModulationContextProps => ({
			modulationParams,
			selectedFields,
			selectedProducts,
			initState,
			modulationError,
			slotSize,
			setSelectedProducts,
			debit,
			setDebit,
			setSelectedFields,
			nozzle,
			setNozzle,
			selectedSlot,
			selectedTargets,
			setSelectedSlot,
			setSelectedTargets,
			selectedDay,
			setSelectedDay,
			conditions,
			conditionsOfTheSelectedDay,
			taskId,
			modulationOfTheSelectedDay,
			modulationStatus: modulation?.status,
			setSlotSize,
			getDataOverSlot,
			modulationData: modulation?.data,
			saveContext,
			resetState,
			notes,
			setNotes,
		}),
		[
			modulationParams,
			selectedFields,
			selectedProducts,
			selectedTargets,
			initState,
			modulationError,
			slotSize,
			debit,
			nozzle,
			selectedSlot,
			selectedDay,
			conditions,
			conditionsOfTheSelectedDay,
			taskId,
			modulationOfTheSelectedDay,
			modulation?.status,
			getDataOverSlot,
			modulation?.data,
			saveContext,
			resetState,
			notes,
		]
	);

	return <ModulationContext.Provider value={value}>{children}</ModulationContext.Provider>;
};

export default ModulationProvider;
