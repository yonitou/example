import { createContext, useState, useContext, useEffect, useCallback, Dispatch, SetStateAction, useMemo } from "react";
import {
	getCrops,
	getDevices,
	getFarms,
	getFields,
	getFarmWeather,
	getNozzles,
	getProducts,
	patchHveMode,
	getLocaleWeather,
	getTargets,
	getPlans,
} from "@Api/hygoApi";

import useCoopUsers from "@Hooks/useCoopUsers";
import { activeProductType } from "@Types/activeProduct.types";
import { UserStatusEnum } from "@Types/auth.types";
import { cropType } from "@Types/crop.types";
import { farmType } from "@Types/farm.types";
import { fieldType } from "@Types/field.types";
import { meteoErrorEnum, meteoType } from "@Types/meteo.types";
import { nozzleType } from "@Types/nozzle.types";
import { coopUsertype } from "@Types/user.types";
import { getTodayDateAsJSDate } from "@Utils/time";
import { appStateEnum } from "@Types/app.types";
import { deviceType } from "@Types/device.types";
import { useFeature } from "flagged";
import { featuresEnum } from "@Types/feature.types";
import { useCoopsList } from "@Hooks/useCoopList";
import { coopType } from "@Types/coop.types";
import { targetType } from "@Types/target.types";
import { planType } from "@Types/plan.types";
import { AuthContext } from "./AuthContext";

interface UserContextProps {
	farms: farmType[];
	products: activeProductType[];
	fields: fieldType[];
	crops: cropType[];
	meteo: meteoType;
	meteoError: meteoErrorEnum;
	defaultFarm: farmType;
	coopUsers: coopUsertype[];
	devices: deviceType[];
	hveMode: boolean;
	nozzles: nozzleType[];
	appState: string;
	coops: coopType[];
	plans: planType[];
	targets: targetType[];
	fetchWeather: () => void;
	setAppState: Dispatch<SetStateAction<string>>;
	fetchFields: () => Promise<void>;
	fetchNozzles: () => Promise<void>;
	updateHveMode: (value: boolean) => void;
	updateDefaultFarm: (farmId: number) => void;
}

export const UserContext = createContext({} as UserContextProps);

const UserProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
	const { status, user, fetchUser, updateUserStatus } = useContext(AuthContext);
	const { coopUsers } = useCoopUsers();
	const { coops } = useCoopsList();
	const [farms, setFarms] = useState<farmType[]>([]);
	const [defaultFarm, setDefaultFarm] = useState<farmType>();
	const [hveMode, setHveMode] = useState<boolean>();
	const [plans, setPlans] = useState<planType[]>([]);
	const [products, setProducts] = useState<activeProductType[]>([]);
	const [meteoError, setMeteoError] = useState<meteoErrorEnum>();
	const [meteo, setMeteo] = useState<meteoType>();
	const [crops, setCrops] = useState<cropType[]>([]);
	const [targets, setTargets] = useState<targetType[]>([]);
	const [fields, setFields] = useState<fieldType[]>([]);
	const [devices, setDevices] = useState<deviceType[]>([]);
	const [nozzles, setNozzles] = useState<nozzleType[]>([]);
	const [appState, setAppState] = useState<appStateEnum>(appStateEnum.ACTIVE);
	const hasTasks = useFeature(featuresEnum.TASKS);
	const hasFarmWeather = useFeature(featuresEnum.FARM_WEATHER);
	const hasTracability = useFeature(featuresEnum.TRACABILITY);

	const updateHveMode = useCallback(
		async (value: boolean): Promise<void> => {
			await patchHveMode(value);
			setHveMode(value);
			await fetchUser();
		},
		[fetchUser]
	);

	const updateDefaultFarm = useCallback(
		async (farmId: number): Promise<void> => {
			if (farms.length) {
				setFields([]);
				setMeteo(null);
				setDefaultFarm(farms.find((f) => f.id === farmId));
			}
		},
		[farms]
	);

	const fetchFields = useCallback(async (): Promise<void> => {
		const fetchedFields = await getFields(defaultFarm);
		setFields(fetchedFields);
	}, [defaultFarm]);

	const fetchPlans = useCallback(async (): Promise<void> => {
		const fetchedPlans = await getPlans();
		setPlans(fetchedPlans);
	}, []);

	const fetchNozzles = async (): Promise<void> => {
		const fetchedNozzles = await getNozzles();
		setNozzles(fetchedNozzles);
	};

	const fetchProducts = async (): Promise<void> => {
		const fetchedProducts = await getProducts();
		setProducts(fetchedProducts);
	};

	const fetchCrops = async (): Promise<void> => {
		const fetchedCrops = await getCrops();
		setCrops(fetchedCrops);
	};

	const fetchDevices = async (): Promise<void> => {
		const fetchedDevices = await getDevices();
		setDevices(fetchedDevices);
	};

	const fetchTargets = useCallback(async (): Promise<void> => {
		const fetchedTargets = await getTargets();
		setTargets(fetchedTargets?.sort((it1, it2) => it1.name.localeCompare(it2.name)));
	}, []);

	const fetchFarms = useCallback(async (): Promise<void> => {
		const fetchedFarms = await getFarms(!!hasFarmWeather);
		setFarms(fetchedFarms);
	}, [hasFarmWeather]);

	const fetchFarmWeather = useCallback(async (): Promise<void> => {
		try {
			if (fields?.length > 0) {
				const fetchedMeteo = await getFarmWeather({
					startAt: getTodayDateAsJSDate(),
					fieldIds: fields.map((f) => f.id),
				});
				setMeteo(fetchedMeteo);
			}
		} catch (e) {
			if (e?.response?.data?.code === "someFieldsDontHaveWeatherYet")
				setMeteoError(meteoErrorEnum.SOME_FIELDS_DONT_HAVE_WEATHER_YET);
			else if (!e?.response?.status) setMeteoError(meteoErrorEnum.NETWORK_ERROR);
			else throw e;
		}
	}, [fields]);

	const fetchLocaleWeather = useCallback(async (): Promise<void> => {
		try {
			const fetchedMeteo = await getLocaleWeather(getTodayDateAsJSDate());
			setMeteo(fetchedMeteo);
		} catch (e) {
			if (!e?.response?.status) setMeteoError(meteoErrorEnum.NETWORK_ERROR);
			else throw e;
		}
	}, []);

	const init = useCallback(async (): Promise<void> => {
		await fetchProducts();
		await fetchTargets();
		await fetchFarms();
		await fetchPlans();
		await fetchCrops();
		if (hasTracability) await fetchDevices();
		if (hasTasks) await fetchNozzles();
	}, [hasTasks, hasTracability, fetchFarms, fetchTargets, fetchPlans]);

	const resetState = (): void => {
		setDefaultFarm(null);
		setFarms([]);
		setHveMode(null);
		setDevices([]);
		setNozzles([]);
		setProducts([]);
		setTargets([]);
		setMeteoError(null);
		setMeteo(null);
		setCrops([]);
		setFields([]);
	};

	const fetchWeather = useCallback((): void => {
		setMeteoError(null);
		hasFarmWeather ? fetchFarmWeather() : fetchLocaleWeather();
	}, [hasFarmWeather, fetchFarmWeather, fetchLocaleWeather]);

	useEffect(() => {
		if (status === UserStatusEnum.LOGGED_IN && user) init();
		if (!user) resetState();
	}, [status, init, user]);

	useEffect(() => {
		if (user) setHveMode(user?.configuration?.hveMode);
	}, [user]);

	useEffect(() => {
		if (!farms?.length || status !== UserStatusEnum.LOGGED_IN) return;
		if (!defaultFarm && farms?.length > 0)
			setDefaultFarm(farms.find((f) => f.id === user?.configuration?.defaultFarmId));
		if (defaultFarm && hasFarmWeather) fetchFields();
	}, [farms, defaultFarm, user, fetchFields, hasFarmWeather, status]);

	useEffect(() => {
		if (appState !== appStateEnum.ACTIVE || status !== UserStatusEnum.LOGGED_IN || !user) setMeteo(null);
		else fetchWeather();
	}, [appState, status, user, fetchWeather]);

	useEffect(() => {
		if (appState === appStateEnum.BACKGROUND && status === UserStatusEnum.LOGGED_IN && user) updateUserStatus();
	}, [appState, status, user, updateUserStatus]);

	const value = useMemo(
		(): UserContextProps => ({
			defaultFarm,
			coopUsers,
			updateDefaultFarm,
			plans,
			fetchFields,
			fetchNozzles,
			fetchWeather,
			targets,
			farms,
			nozzles,
			hveMode,
			setAppState,
			devices,
			appState,
			coops,
			updateHveMode,
			products,
			fields,
			meteo,
			crops,
			meteoError,
		}),
		[
			defaultFarm,
			coops,
			devices,
			coopUsers,
			targets,
			updateDefaultFarm,
			fetchFields,
			farms,
			nozzles,
			fetchWeather,
			plans,
			hveMode,
			appState,
			updateHveMode,
			products,
			fields,
			meteo,
			crops,
			meteoError,
		]
	);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
