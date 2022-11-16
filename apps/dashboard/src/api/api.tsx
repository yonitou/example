import axios from "axios";
import { coopUsertype, userType } from "@Types/user.types";
import { cropType } from "@Types/crops.types";
import { fieldType, updateFieldType } from "@Types/fields.types";
import { newUserType } from "@Types/newUser.types";
import { importStatusEnum } from "@Types/import.types";
import { farmType } from "@Types/farm.types";
import { coopType } from "@Types/coop.types";
import { doneTaskType } from "@Types/task.types";
import { deviceType } from "@Types/device.types";
import { smagFarm } from "@Types/smag.types";
import { tankType } from "@Types/tank.types";
import { planType } from "@Types/plan.types";

const baseURLs = {
	production: "https://api-prod-blue.alvie.fr",
	development: "https://api-test.alvie.fr",
	staging: "https://api-test.alvie.fr",
};

const api = axios.create({
	baseURL: baseURLs[process.env.NX_ENV as "production" | "development" | "staging"],
	timeout: 30000,

	headers: {
		"Access-Control-Allow-Origin": "*",
	},
});

api.interceptors.request.use(async (axiosConfig) => {
	const config = axiosConfig;
	const token = localStorage.getItem("hygoCookie");

	if (token) {
		config.headers.Authorization = `Bearer ${token || ""}`;
	}
	return config;
});

interface checkTokenType {
	email: string;
	password: string;
}
export const checkToken = async ({ email, password }: checkTokenType): Promise<string> => {
	const response = await api.post("/auth/tokens", {
		email,
		password,
	});
	return response.data?.token;
};

export const getFields = async ({ farmId }: { farmId: number }): Promise<fieldType[]> => {
	const response = await api.get(`/farms/${farmId}/fields`);
	return response.data;
};

export const getCrops = async (): Promise<cropType[]> => {
	const response = await api.get("/crops");
	return response.data;
};

// TODO : Linting return type

export const importToS3 = async (
	farmId: number,
	data: {
		filename: string;
		overwrite: boolean;
	}
): Promise<{ queueId: number; url: string }> => {
	const response = await api.post(`farms/${farmId}/imports`, data);
	return response.data;
};

export const checkImportStatus = async (farmId: number, queueId: number): Promise<importStatusEnum> => {
	const response = await api.get(`farms/${farmId}/imports/${queueId}`);
	return response.data?.status;
};

export const getCoopUsers = async (): Promise<coopUsertype[]> => {
	const response = await api.get("/administration/users");
	return response?.data;
};

export const patchFields = async (fields: updateFieldType[], farmId: number): Promise<number> => {
	const response = await api.patch(`/farms/${farmId}/fields`, fields);
	return response?.status;
};

export const createUser = async (newUser: newUserType): Promise<userType> => {
	const response = await api.post("/auth/users", newUser);
	return response.data;
};

interface createFieldFromCoordsParams {
	coordinates: { lat: number; lon: number }[];
	name: string;
	cropId: number;
	farmId: number;
}
export const createFieldFromCoords = async ({
	coordinates,
	cropId,
	name,
	farmId,
}: createFieldFromCoordsParams): Promise<{ id: number }> => {
	const response = await api.post(`/farms/${farmId}/fields`, { coordinates, cropId, name });
	return response.data;
};

export const getCoops = async (): Promise<coopType[]> => {
	const response = await api.get("/auth/coops");
	return response.data;
};

export const checkProductMix = async ({ productIds }: { productIds: number[] }): Promise<tankType> => {
	const response = await api.post("/measures/check_tank", { productIds });
	return response?.data;
};

export const checkEmailAndSendPasswordReset = async (email: string): Promise<number> => {
	const response = await api.post("/auth/sendResetPasswordEmail", {
		email,
	});
	return response?.status;
};

export const resetPassword = async (password: string, resetToken: string): Promise<number> => {
	const response = await api.post("/auth/resetPassword", { password, token: resetToken });
	return response?.status;
};

export const getPlans = async (): Promise<planType[]> => {
	const response = await api.get("/plans");
	return response?.data;
};

export const getFarms = async (): Promise<farmType[]> => {
	const response = await api.get("/farms");
	return response?.data;
};

export const createFarm = async (farm: { name: string }): Promise<farmType> => {
	const response = await api.post("/farms", farm);
	return response?.data;
};

export const updateFarm = async (farm: farmType): Promise<farmType> => {
	const response = await api.put(`/farms/${farm.id}`, farm);
	return response?.data;
};

export const patchDefaultFarm = async (defaultFarmId: number): Promise<number> => {
	const response = await api.patch("/me", { defaultFarmId: defaultFarmId || null });
	return response?.data?.defaultFarmId;
};

export const patchUser = async ({
	coopId,
	location,
}: {
	coopId: number;
	location: { lat: number; lon: number; label: string };
}): Promise<void> => {
	const response = await api.patch("/me", { coopId, location });
	return response?.data;
};

export const deleteFarm = async (farmId: number): Promise<number> => {
	const response = await api.delete(`/farms/${farmId}`);
	return response?.status;
};

export const getUser = async (): Promise<userType> => {
	const response = await api.get("/me");

	return response?.data;
};

export const deleteField = async (farmId: number, fieldId: number): Promise<void> => {
	await api.delete(`/farms/${farmId}/fields/${fieldId}`);
};

export const getTokenFromUser = async (userId: number): Promise<string> => {
	const response = await api.get(`/administration/users/${userId}/token`);
	return response?.data?.token;
};

export const getDevices = async (): Promise<deviceType[]> => {
	const response = await api.get("equipments/devices");
	return response?.data;
};

export const updateDevice = async (deviceId: number, name: string): Promise<deviceType> => {
	const response = await api.patch(`equipments/devices/${deviceId}`, { name });
	return response?.data;
};

export const createDevice = async (device: { name: string; barcode: string }): Promise<deviceType> => {
	const response = await api.post("equipments/devices", device);
	return response?.data;
};

export const deleteDevice = async (deviceId: number): Promise<void> => {
	const response = await api.delete(`equipments/devices/${deviceId}`);
	return response?.data;
};

export const getChargebeePortalSession = async (): Promise<Record<string, string>> => {
	const response = await api.post("chargebee/portalSession");
	return response?.data;
};

export const createDoneTask = async ({
	selectedFields,
	startTime,
	endTime,
	farmId,
}: {
	farmId: number;
	selectedFields: fieldType[];
	startTime: string;
	endTime: string;
}): Promise<void> => {
	await api.post(`/farms/${farmId}/donetasks`, {
		selectedFieldIds: selectedFields.map((x) => x.id),
		startTime,
		endTime,
	});
};

export const getDoneTasks = async (farmId: number, season: Date[]): Promise<doneTaskType[]> => {
	const response = await api.get(`/farms/${farmId}/donetasks`, {
		params: { startedBefore: season[1].toISOString(), startedAfter: season[0].toISOString(), onlyChecked: true },
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
	const response = await api.get(`/farms/${farmId}/donetasks/${taskId}`);
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

export const deleteDoneTask = async ({ id, farmId }: { id: number; farmId: number }): Promise<number> => {
	const response = await api.delete(`/farms/${farmId}/donetasks/${id}`);
	return response?.status;
};

export const exportTasks = async (farmId: number, season: Date[]): Promise<string> => {
	const response = await api.get(`farms/${farmId}/donetasks.xlsx`, {
		responseType: "blob",
		params: { startedBefore: season[1].toISOString(), startedAfter: season[0].toISOString() },
	});
	return response?.data;
};

export const getSmagToken = async (): Promise<string> => {
	const response = await api.get("smag/loginUri");
	return response?.data?.uri;
};

export const deleteSmagToken = async (): Promise<void> => {
	const response = await api.delete("smag/token");
	return response?.data;
};

export const getSmagFarms = async (year: number): Promise<smagFarm[]> => {
	const response = await api.get(`/smag/farms?cropYear=${year}`);
	return response?.data;
};

export const importSmagFields = async ({
	farmId,
	smagFarmUid,
	year,
}: {
	farmId: number;
	smagFarmUid: string;
	year: number;
}): Promise<void> => {
	const response = await api.post(`/farms/${farmId}/fields/import`, { cropYear: year, smagFarmUid });
	return response?.data;
};

export const exportSmagTasks = async ({
	farmId,
	taskIds,
}: {
	farmId: number;
	taskIds: number[];
}): Promise<{ failedExports: number; succeededExports: number }> => {
	const response = await api.post(`farms/${farmId}/donetasks/smagExports`, { taskIds });
	return response?.data;
};

export const deleteUserAccount = async (): Promise<void> => {
	const response = await api.delete("/me");
	return response?.data;
};
