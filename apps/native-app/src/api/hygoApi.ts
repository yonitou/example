import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import _ from "lodash";
import Constants from "expo-constants";

import { fieldType } from "@Types/field.types";
import { activeProductType } from "@Types/activeProduct.types";
import { cropType } from "@Types/crop.types";
import { metricsType, meteoType } from "@Types/meteo.types";
import { nozzleType } from "@Types/nozzle.types";
import { comingTaskType, comingTaskTypeDB, doneTaskType } from "@Types/task.types";
import { fromISOToJSDate, getTodayDateAsJSDate, substractDays } from "@Utils/time";
import { soilEnum } from "@Types/soil.types";
import { hardnessEnum } from "@Types/hardness.types";
import { notificationType } from "@Types/notification.types";
import { farmType } from "@Types/farm.types";
import { coopUsertype, newUserType, userProperties } from "@Types/user.types";
import { modulationType } from "@Types/modulation.types";
import { deviceType } from "@Types/device.types";
import { coopType } from "@Types/coop.types";
import { tankType } from "@Types/tank.types";
import { targetType } from "@Types/target.types";
import { mixtureType } from "@Types/mixture.types";
import { planType } from "@Types/plan.types";
import getUserAgent from "./getUserAgent";

const hygoApi = axios.create({
	baseURL: Constants.manifest.extra.apiUrl,
	timeout: 30000,
	headers: {
		"User-Agent": getUserAgent(),
	},
});

hygoApi.interceptors.request.use(
	async (config) => {
		const newConfig = config;
		const uuid = await AsyncStorage.getItem("uuid");
		const token = await AsyncStorage.getItem("authtoken");
		newConfig.headers.Authorization = `Bearer ${token || ""}`;
		newConfig.headers.uuid = uuid;

		return newConfig;
	},
	(error) => {
		throw error;
	}
);

// hygoApi.interceptors.response.use(undefined, (error) => {
// 	console.log(error.response);
// 	return Promise.reject(error);
// });

export const getAuthorizedFieldsByProductIds = async (
	defaultFarm: farmType,
	productIds: number[]
): Promise<fieldType[]> => {
	const response = await hygoApi.post(`/farms/${defaultFarm.id}/fields/search`, {
		productIds,
		onlyChecked: true,
	});

	return response?.data;
};

// Retrieve active products list
export const getProducts = async (): Promise<activeProductType[]> => {
	const response = await hygoApi.get("/products");
	return response.data;
};

export const getPlans = async (): Promise<planType[]> => {
	const response = await hygoApi.get("/plans");
	return response?.data;
};

export const getTargets = async (): Promise<targetType[]> => {
	const response = await hygoApi.get("/products/targets");
	return response.data;
};

// Store a new pushToken for this device
export const storePushToken = async (token: string): Promise<string> => {
	const response = await hygoApi.post("/notification/pushtokens", {
		pushToken: token,
	});
	return response.data;
};

// Delete pushToken
export const deletePushToken = async (token: string): Promise<string> => {
	const response = await hygoApi.delete("/notification/pushtokens", { data: { pushToken: token } });
	return response.data;
};

export const createUser = async (newUser: newUserType): Promise<userProperties> => {
	const response = await hygoApi.post("/auth/users", newUser);
	return response.data;
};

export const getNozzles = async (): Promise<nozzleType[]> => {
	const response = await hygoApi.get("/equipments/nozzles");
	return response.data;
};

export const getNozzle = async (id: number): Promise<nozzleType> => {
	const response = await hygoApi.get(`equipments/nozzles/${id}`);
	return response?.data;
};

export const addNozzle = async (nozzle: nozzleType): Promise<Record<string, number>> => {
	const response = await hygoApi.post("/equipments/nozzles", {
		...nozzle,
	});
	return response.data;
};

export const updateNozzle = async (nozzle: nozzleType): Promise<string> => {
	const response = await hygoApi.patch(`/equipments/nozzles/${nozzle.id}`, { ...nozzle });
	return response.data;
};

export const deleteNozzle = async (nozzleId: number): Promise<string> => {
	const response = await hygoApi.delete(`/equipments/nozzles/${nozzleId}`);
	return response.data;
};

export const setDefaultNozzle = async (defaultNozzleId: number): Promise<string> => {
	const response = await hygoApi.patch("/me", { defaultNozzleId });
	return response.data;
};

export const getFarmWeather = async ({
	startAt,
	fieldIds,
	slidingMaxWindowSizeInHours,
}: {
	startAt: Date;
	fieldIds?: number[];
	slidingMaxWindowSizeInHours?: number;
}): Promise<meteoType> => {
	const response = await hygoApi.post("/measures/weather", { startAt, fieldIds, slidingMaxWindowSizeInHours });
	return response?.data;
};

export const createDoneTask = async (task: doneTaskType, farmId: number): Promise<void> => {
	const { startTime, endTime, debit, notes, nozzle, selectedProducts, selectedFields, selectedTargets } = task;
	await hygoApi.post(`/farms/${farmId}/donetasks`, {
		startTime,
		endTime,
		debit,
		targetIds: selectedTargets?.map((t) => t.id),
		notes,
		nozzleId: nozzle.id,
		products: selectedProducts.map((p) => ({
			productId: p.id,
			dose: p.dose,
		})),
		selectedFieldIds: selectedFields.map((s) => s.id),
	});
};

export const getLocaleWeather = async (startAt: Date): Promise<meteoType> => {
	const response = await hygoApi.post("/measures/localWeather", { startAt });

	return response?.data;
};

export const getWeeklyModulations = async ({
	products,
	weekMeteo,
	nozzle,
	fieldIds,
	delayInHours,
	targetIds,
}: {
	products: activeProductType[];
	weekMeteo: metricsType[];
	nozzle: nozzleType;
	fieldIds: number[];
	delayInHours: number;
	targetIds: number[];
}): Promise<modulationType> => {
	const metricsByHour: metricsType[] = _.flatten(weekMeteo);

	const response = await hygoApi.post("/measures/modulation", {
		meteo: metricsByHour,
		products: products.map(({ id, dose, modulationActive }) => ({
			productId: id,
			dose,
			modulationActive,
		})),
		targetIds,
		fieldIds,
		nozzleId: nozzle.id,
		delayInHours,
	});

	return response?.data;
};

export interface realTimeType {
	histo: {
		timestamp: string;
		temp: number;
		humi: number;
	}[];
	windSpeed: number;
	position: { lon: number; lat: number };
}

// Get Realtime data
export const getRealtimeData = async (deviceId: number): Promise<realTimeType> => {
	const response = await hygoApi.get(`/equipments/devices/${deviceId}/realtime`);
	return response.data;
};

// Get Meteo Radar
interface radarTypes {
	url: string;
	d: string;
}

export const getMeteoRadar = async (signal: AbortSignal): Promise<radarTypes[]> => {
	const response = await hygoApi.get("/measures/radar", { signal });

	return response.data;
};

// Check if the database is ready (parcels and meteo datas loaded => 24h),and if a new version is needed
export const checkSetup = async (): Promise<string> => {
	const response = await hygoApi.post("/me/checkSetup", {
		version: Constants.manifest.extra.version,
		OTA: Constants.manifest.extra.OTA,
	});

	return response?.data;
};

export const createComingTask = async (task: Omit<comingTaskType, "productFamily">, farmId: number): Promise<void> => {
	const response = await hygoApi.post(`/farms/${farmId}/comingtasks`, task);
	return response?.data;
};

export const patchComingTask = async (task: Omit<comingTaskType, "productFamily">, farmId: number): Promise<void> => {
	const response = await hygoApi.put(`/farms/${farmId}/comingtasks/${task.id}`, task);
	return response?.data;
};

export const getComingTasks = async (farmId: number): Promise<comingTaskType[]> => {
	// Today date
	const startAfter = substractDays(new Date(new Date().setHours(0, 0, 0, 0)), 7);
	const response = await hygoApi.get(`farms/${farmId}/comingtasks`, { params: { startAfter } });
	const tasks: comingTaskType[] = response?.data?.map((d: comingTaskTypeDB): comingTaskType => {
		return { ...d, selectedDay: fromISOToJSDate(d.selectedDay) };
	});
	return tasks;
};

export const getComingTask = async (id: number, farmId: number): Promise<comingTaskType> => {
	const response = await hygoApi.get(`/farms/${farmId}/comingtasks/${id}`);
	return { ...response?.data, selectedDay: fromISOToJSDate(response?.data.selectedDay) };
};

export const deleteComingTask = async (id: number, farmId: number): Promise<number> => {
	const response = await hygoApi.delete(`/farms/${farmId}/comingtasks/${id}`);
	return response?.status;
};

export const deleteDoneTask = async (id: number, farmId: number): Promise<number> => {
	const response = await hygoApi.delete(`/farms/${farmId}/donetasks/${id}`);
	return response?.status;
};

export const patchDoneTask = async (task: doneTaskType, farmId: number): Promise<number> => {
	const { nozzle, debit, notes, selectedProducts, selectedFields, selectedTargets, modulation } = task;
	const response = await hygoApi.patch(`/farms/${farmId}/donetasks/${task.id}`, {
		nozzleId: nozzle.id,
		debit,
		targetIds: selectedTargets?.map((t) => t.id),
		notes,
		modulation: selectedProducts.some((p) => p.modulationActive) ? modulation : null,
		products: selectedProducts.map((p) => ({
			productId: p.id,
			dose: p.dose,
			modulation: p.modulationActive ? p.modulation : null,
		})),
		selectedFieldIds: selectedFields.map((f) => f.id),
	});
	return response?.status;
};

export const markComingTaskAsDone = async (farmId: number, taskId: number): Promise<void> => {
	const response = await hygoApi.post(`/farms/${farmId}/comingtasks/${taskId}/donetask`);
	return response?.data;
};

export const markDoneTasksAsRead = async (farmId: number, taskIds: number[]): Promise<void> => {
	const response = await hygoApi.patch(`/farms/${farmId}/donetasks/markAsRead`, {
		taskIds,
	});
	return response?.data;
};

export const getDoneTasks = async ({
	farmId,
	startedBefore,
	startedAfter,
}: {
	farmId: number;
	startedBefore?: Date;
	startedAfter?: Date;
	onlyChecked?: boolean;
}): Promise<doneTaskType[]> => {
	const response = await hygoApi.get(`/farms/${farmId}/donetasks`, {
		params: { startedBefore, startedAfter },
	});
	return response.data.map((task: doneTaskType) => {
		const startTimeToDate = new Date(task?.startTime);
		const endTimeToDate = new Date(task?.endTime);
		return {
			...task,
			startTime: startTimeToDate,
			endTime: endTimeToDate,
			selectedSlot: { min: startTimeToDate.getHours(), max: endTimeToDate.getHours() },
		};
	});
};

export const getDoneTask = async (farmId: number, taskId: number): Promise<doneTaskType> => {
	const response = await hygoApi.get(`/farms/${farmId}/donetasks/${taskId}`);
	const task = response?.data;
	const startTimeToDate = new Date(task?.startTime);
	const endTimeToDate = new Date(task?.endTime);
	return {
		...task,
		startTime: startTimeToDate,
		endTime: endTimeToDate,
		selectedSlot: { min: startTimeToDate.getHours(), max: endTimeToDate.getHours() },
	};
};

export const sendMail = async (data: { htmlBody: string; subject: string }): Promise<void> => {
	await hygoApi.post("/notification/sendMail", data);
};

export const getNotifications = async (): Promise<notificationType[]> => {
	const response = await hygoApi.get("/notification/notifications");
	return response?.data?.map((notif: notificationType) => {
		return { ...notif, jsonData: { ...notif.jsonData, date: new Date(notif?.jsonData?.date) } };
	});
};

export const markNotificationsAsRead = async (ids: number[]): Promise<number> => {
	const response = await hygoApi.patch("/notification/notifications", { ids });
	return response?.status;
};

export const getCoops = async (): Promise<coopType[]> => {
	const response = await hygoApi.get("/auth/coops");
	return response.data;
};

export const getDevices = async (): Promise<deviceType[]> => {
	const response = await hygoApi.get("equipments/devices");
	return response?.data;
};

export const deleteNotification = async (id: number): Promise<number> => {
	const response = await hygoApi.delete(`/notification/notifications/${id}`);
	return response?.status;
};

export const getCrops = async (): Promise<cropType[]> => {
	const response = await hygoApi.get("/crops");
	return response.data;
};

export const getFarms = async (withFields: boolean): Promise<farmType[]> => {
	const params = withFields ? { withFields: 1 } : null;
	const response = await hygoApi.get("/farms", { params });

	return response?.data;
};

export const deleteUserAccount = async (): Promise<void> => {
	const response = await hygoApi.delete("/me");
	return response?.data;
};

export const getUser = async (): Promise<userProperties> => {
	const response = await hygoApi.get("/me");
	return response?.data;
};

// SignIn using a barcode
export const signInWithBarCode = async (barcode: string): Promise<string> => {
	const response = await hygoApi.post("/auth/tokens", { barcode });
	return response?.data?.token;
};

export const signInWithCredentials = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}): Promise<string> => {
	const response = await hygoApi.post("/auth/tokens", {
		email,
		password,
	});
	return response.data?.token;
};

export const getFields = async ({ id }: farmType, signal?: AbortSignal): Promise<fieldType[]> => {
	const response = await hygoApi.get(`/farms/${id}/fields`, { signal, params: { onlyChecked: true } });

	return response?.data;
};

export const updateField = async (
	fields: { fieldId: number; cropId?: number; name?: string },
	farmId: number
): Promise<string> => {
	const response = await hygoApi.patch(`/farms/${farmId}/fields`, [fields]);
	return response?.data;
};

export const updateSoil = async (soil: soilEnum): Promise<string> => {
	const response = await hygoApi.patch("/me", { soil });
	return response.data;
};

export const updateAcidityAndWater = async ({
	waterHardness,
	waterAcidity,
	soilAcidity,
}: {
	waterHardness: hardnessEnum;
	waterAcidity: number;
	soilAcidity: number;
}): Promise<string> => {
	const response = await hygoApi.patch("/me", { waterHardness, soilAcidity, waterAcidity });
	return response.data;
};

export const patchHveMode = async (hveMode: boolean): Promise<boolean> => {
	const response = await hygoApi.patch("/me", { hveMode });
	return response?.data?.configuration?.hveMode;
};

export const patchDebit = async (debit: number): Promise<boolean> => {
	const response = await hygoApi.patch("/me", { debit });
	return response?.data;
};

export const getTokenFromUser = async (userId: number): Promise<string> => {
	const response = await hygoApi.get(`/administration/users/${userId}/token`);
	return response?.data?.token;
};

export const getCoopUsers = async (): Promise<coopUsertype[]> => {
	const response = await hygoApi.get("/administration/users");
	return response?.data;
};

export const checkProductMix = async ({ productIds }: { productIds: number[] }): Promise<tankType> => {
	const response = await hygoApi.post("/measures/check_tank", { productIds });
	return response?.data;
};

export const createMixture = async ({ farmId, mixture }: { farmId: number; mixture: mixtureType }): Promise<void> => {
	const response = await hygoApi.post(`/farms/${farmId}/mixtures`, {
		...mixture,
		targetIds: mixture?.selectedTargets?.map((t) => t.id),
		productIds: mixture?.selectedProducts?.map((p) => p.id),
	});
	return response?.data;
};

export const getMixtures = async (farmId: number): Promise<mixtureType[]> => {
	const startAt = getTodayDateAsJSDate();
	const response = await hygoApi.get(`farms/${farmId}/mixtures`, { params: { startAt } });
	return response?.data;
};

export const getMixtureById = async ({ farmId, id }: { farmId: number; id: number }): Promise<mixtureType> => {
	const startAt = getTodayDateAsJSDate();
	const response = await hygoApi.get(`farms/${farmId}/mixtures/${id}`, { params: { startAt } });
	return response?.data;
};

export const deleteMixture = async ({ id, farmId }: { id: number; farmId: number }): Promise<void> => {
	const response = await hygoApi.delete(`/farms/${farmId}/mixtures/${id}`);
	return response?.data;
};

export const updateMixture = async ({ farmId, mixture }: { farmId: number; mixture: mixtureType }): Promise<void> => {
	const response = await hygoApi.put(`/farms/${farmId}/mixtures/${mixture.id}`, {
		mixture,
		targetIds: mixture?.selectedTargets?.map((t) => t.id),
		productIds: mixture?.selectedProducts?.map((p) => p.id),
	});
	return response?.data;
};
