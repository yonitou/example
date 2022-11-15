import { useContext, useEffect, useState, createContext, SetStateAction, Dispatch, useMemo, useCallback } from "react";
import i18next from "i18next";
import { getCrops, getDevices, getFarms, getFields, getPlans, patchDefaultFarm } from "@Api/api";
import { useCoopUsers } from "@Hook/useCoopsUsers";
import { useCoopsList } from "@Hook/useCoopsList";
import { cropType } from "@Types/crops.types";
import { farmType } from "@Types/farm.types";
import { fieldType } from "@Types/fields.types";
import { coopType } from "@Types/coop.types";
import { coopUsertype } from "@Types/user.types";
import { deviceType } from "@Types/device.types";
import { planType } from "@Types/plan.types";
import { AuthContext } from "./AuthContext";

interface UserContextProps {
	fields: fieldType[];
	crops: cropType[];
	fieldsByCrop: { [crop: string]: fieldType[] };
	farms: farmType[];
	loadDevices: () => Promise<void>;
	plans: planType[];
	devices: deviceType[];
	refetchFields: () => Promise<fieldType[]>;
	loadCrops: () => Promise<void>;
	loadFarms: () => Promise<farmType[]>;
	updateDefaultFarm: (farm: farmType, needFetch?: boolean) => Promise<void>;
	loading?: boolean;
	coopUsers: coopUsertype[];
	setLoading: Dispatch<SetStateAction<boolean>>;
	setFields: Dispatch<SetStateAction<fieldType[]>>;
	coops: coopType[];
	defaultFarm: farmType;
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps);

const UserProvider = ({ children }: { children: JSX.Element | JSX.Element[] }): JSX.Element => {
	const [fields, setFields] = useState<fieldType[]>([]);
	const [devices, setDevices] = useState<deviceType[]>([]);
	const [farms, setFarms] = useState<farmType[]>([]);
	const [defaultFarm, setDefaultFarm] = useState<farmType>(null);
	const [crops, setCrops] = useState<cropType[]>([]);
	const [plans, setPlans] = useState<planType[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const { user, refetchUserProps, isAuth, farmerSelected } = useContext(AuthContext);
	const { coopUsers } = useCoopUsers();
	const { coops } = useCoopsList();

	const loadFields = async ({ farmId }: { farmId: number }): Promise<fieldType[]> => {
		try {
			setFields([]);
			const fetchedFields: fieldType[] = await getFields({ farmId });
			setFields(fetchedFields);
			return fetchedFields;
		} catch (e) {
			setFields([]);
			return [];
		}
	};

	const fieldsByCrop: { [crop: string]: fieldType[] } = fields
		?.filter((field: fieldType) => field.crop.name)
		.reduce<Record<string, fieldType[]>>((acc, next) => {
			const group = next.crop.name;
			return {
				...acc,
				[group]: [...(acc[group] || []), next],
			};
		}, {});

	const loadFarms = useCallback(async (): Promise<farmType[]> => {
		try {
			const fetchedFarms: farmType[] = await getFarms();
			setFarms(fetchedFarms);
			return fetchedFarms;
		} catch (e) {
			setFarms([]);
			return [];
		}
	}, []);

	const loadPlans = useCallback(async (): Promise<void> => {
		const fetchedPlans = await getPlans();
		setPlans(fetchedPlans);
	}, []);

	const loadCrops = async (): Promise<void> => {
		try {
			const fetchedCrops: cropType[] = await getCrops();
			setCrops(
				fetchedCrops.sort((a, b) => i18next.t(`crops.${a.name}`).localeCompare(i18next.t(`crops.${b.name}`)))
			);
		} catch (e) {
			setCrops([]);
		}
	};

	const loadDevices = async (): Promise<void> => {
		try {
			const fetchedDevices: deviceType[] = await getDevices();
			setDevices(fetchedDevices);
		} catch (e) {
			setDevices([]);
		}
	};

	const updateDefaultFarm = useCallback(
		async (farm: farmType, needFetch = true): Promise<void> => {
			await patchDefaultFarm(farm?.id || null);
			if (farm) {
				setDefaultFarm(farm);
				await refetchUserProps();
			} else {
				await refetchUserProps();
				setDefaultFarm(null);
			}

			if (farm && farm.id !== defaultFarm?.id && needFetch) await loadFields({ farmId: farm.id });

			if (!farm) setFields([]);
		},
		[defaultFarm, refetchUserProps]
	);

	const refetchFields = useCallback(async (): Promise<fieldType[]> => {
		setLoading(true);
		const fetchedFields = await loadFields({ farmId: defaultFarm.id });
		setLoading(false);
		return fetchedFields;
	}, [defaultFarm]);

	const resetState = (): void => {
		setDefaultFarm(null);
		setFarms([]);
		setFields([]);
	};

	useEffect(() => {
		const init = async (): Promise<void> => {
			if (!farmerSelected) {
				return;
			}
			setLoading(true);
			await loadDevices();
			await loadPlans();
			await loadCrops();
			const fetchedFarms = await loadFarms();
			if (!fetchedFarms.length) setLoading(false);
		};
		if (isAuth) {
			init();
		} else resetState();
	}, [isAuth, loadFarms, farmerSelected, loadPlans]);

	useEffect(() => {
		const initFarmAndFields = async (): Promise<void> => {
			const farm = farms.find((f) => f.id === user?.configuration?.defaultFarmId);
			if (farms.length > 0 && !defaultFarm && farm) {
				setDefaultFarm(farm);
				await loadFields({ farmId: farm.id });
				setLoading(false);
			}
		};
		if (!isAuth) return;
		initFarmAndFields();
	}, [farms, defaultFarm, user, isAuth]);

	const values = useMemo(
		() => ({
			fields,
			crops,
			fieldsByCrop,
			refetchFields,
			loading,
			coopUsers,
			setLoading,
			coops,
			farms,
			loadFarms,
			loadCrops,
			devices,
			defaultFarm,
			updateDefaultFarm,
			plans,
			setFields,
			loadDevices,
		}),
		[
			fields,
			plans,
			crops,
			devices,
			fieldsByCrop,
			loadFarms,
			refetchFields,
			loading,
			coopUsers,
			coops,
			farms,
			defaultFarm,
			updateDefaultFarm,
		]
	);

	return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserProvider;
