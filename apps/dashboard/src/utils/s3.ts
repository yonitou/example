import axios from "axios";
import { checkImportStatus, importToS3 } from "@Api/api";
import { importRequestType, importStatusEnum } from "@Types/import.types";

const putFileToS3 = async ({ farmId, overwrite, file }: importRequestType): Promise<number> => {
	const filename = file.name;
	const fileType = file.name.split(".")[1];

	const data = await importToS3(farmId, {
		filename,
		overwrite,
	});

	if (data) {
		const { url, queueId } = data;
		const options = {
			headers: {
				"Content-Type": fileType,
			},
		};
		if (!url) throw new Error("Cannot retrieve a signed request");

		await axios.put(url, file, options);
		return queueId;
	}
	throw new Error("Error with s3");
};

const sleep = (ms: number): Promise<unknown> =>
	new Promise((resolve) => {
		setTimeout(resolve, ms);
	});

const waitForImportToFinish = async (farmId: number, queueId: number): Promise<unknown> => {
	for (let index = 0; index < 90; index += 1) {
		await sleep(1000);
		const status = await checkImportStatus(farmId, queueId);
		if (status === importStatusEnum.OK) return;
		if (status === importStatusEnum.ERROR) throw Error(`Error while importing`);
	}
	throw Error("Timeout : Le serveur est trop lent à répondre");
};

export const sendFileToS3AndWaitForImportToFinish = async ({
	farmId,
	overwrite,
	file,
}: importRequestType): Promise<void> => {
	const queueId = await putFileToS3({ farmId, overwrite, file });

	await waitForImportToFinish(farmId, queueId);
};
