import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { UserContext } from "@Context/UserContext";
import { fieldType } from "@Types/fields.types";
import { createDoneTask } from "@Api/api";
import { SnackbarContext, snackbarTypeEnum } from "@Context/SnackbarContext";
import Admin from "./Tracability";

const today = new Date();

const TracabilityContainer = (): JSX.Element => {
	const { t } = useTranslation();
	const [selectedFields, setSelectedFields] = useState<fieldType[]>([]);
	const [startTime, setStartTime] = useState<Date>(new Date(new Date().setMinutes(today.getMinutes() - 30)));
	const [endTime, setEndTime] = useState<Date>(today);
	const [loading, setLoading] = useState<boolean>(false);
	const { crops, fields, defaultFarm, farms } = useContext(UserContext);
	const { showSnackbar } = useContext(SnackbarContext);

	const filterTimeStartTime = (date: Date): boolean =>
		today.getTime() > new Date(date)?.getTime() && endTime?.getTime() > new Date(date)?.getTime();
	const filterTimeEndTime = (date: Date): boolean =>
		new Date().getTime() > new Date(date)?.getTime() && startTime?.getTime() < new Date(date)?.getTime();

	useEffect(() => {
		setSelectedFields([]);
	}, [defaultFarm]);

	const onSubmit = async (): Promise<void> => {
		try {
			setLoading(true);
			await createDoneTask({
				selectedFields,
				startTime: startTime?.toISOString(),
				endTime: endTime?.toISOString(),
				farmId: defaultFarm?.id,
			});
			showSnackbar(t("common.snackbar.createDoneTask.success"), snackbarTypeEnum.SUCCESS);
		} catch (e) {
			showSnackbar(t("common.snackbar.createDoneTask.error"), snackbarTypeEnum.ERROR);
			throw e;
		} finally {
			setLoading(false);
		}
	};

	return (
		<Admin
			loading={loading}
			crops={crops}
			fields={fields}
			selectedFields={selectedFields}
			setSelectedFields={setSelectedFields}
			startTime={startTime}
			setStartTime={setStartTime}
			endTime={endTime}
			setEndTime={setEndTime}
			onSubmit={onSubmit}
			farms={farms}
			filterTimeStartTime={filterTimeStartTime}
			filterTimeEndTime={filterTimeEndTime}
		/>
	);
};

export default TracabilityContainer;
