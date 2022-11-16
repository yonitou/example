import { getSmagFarms, importSmagFields } from "@Api/api";
import { OADContext, smagStepEnum } from "@Context/OADContext";
import { SnackbarContext, snackbarTypeEnum } from "@Context/SnackbarContext";
import { UserContext } from "@Context/UserContext";
import { useQuery } from "@Hook/useQuery";
import { smagFarm } from "@Types/smag.types";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ImportSmag from "./ImportSmag";

const ImportSmagContainer = (): JSX.Element => {
	const { t } = useTranslation();
	const { defaultFarm, refetchFields } = useContext(UserContext);
	const { showSnackbar } = useContext(SnackbarContext);
	const { setSmagStepCookie, smagOnboardingStep } = useContext(OADContext);
	const query = useQuery();
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);
	const [loadingSmagFarms, setLoadingSmagFarms] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const [success, setSuccess] = useState<boolean>(false);
	const [selectedYear, setSelectedYear] = useState<number>();
	const [smagFarms, setSmagFarms] = useState<smagFarm[]>();
	const [selectedFarm, setSelectedFarm] = useState<smagFarm>();

	const goBack = (): void => navigate(-1);

	const goToDashboard = (): void => navigate("/");

	const backFromError = (): void => setError(false);

	const onChangeYear = async (year: number): Promise<void> => {
		setLoadingSmagFarms(true);
		setSmagFarms(null);
		setSelectedFarm(null);
		setSelectedYear(year);
		const fetchedSmagFarms = await getSmagFarms(year);
		setSmagFarms(fetchedSmagFarms);
		setLoadingSmagFarms(false);
	};

	const onChangeFarm = (uuid: string): void => setSelectedFarm(smagFarms.find((sf) => sf.uuid === uuid));

	const doImport = async (): Promise<void> => {
		try {
			setLoading(true);
			await importSmagFields({ year: selectedYear, smagFarmUid: selectedFarm.uuid, farmId: defaultFarm.id });
			setSuccess(true);
			if (
				smagOnboardingStep === smagStepEnum.HIDE_IMPORT_TOOLTIP ||
				smagOnboardingStep === smagStepEnum.SHOW_IMPORT_TOOLTIP
			)
				setSmagStepCookie(smagStepEnum.SHOW_ONBOARDING_CROPS);
			await refetchFields();
		} catch (e) {
			setError(true);
		} finally {
			setLoading(false);
		}
	};

	const retryImport = (): void => {
		backFromError();
		setLoading(true);
		doImport();
	};

	useEffect(() => {
		const checkSmagAuth = (): void => {
			if (query.has("success")) {
				showSnackbar(t("common.snackbar.smagAuth.success"), snackbarTypeEnum.SUCCESS);
			}
		};
		checkSmagAuth();
	});

	return (
		<ImportSmag
			defaultFarm={defaultFarm}
			goToDashboard={goToDashboard}
			retryImport={retryImport}
			selectedFarm={selectedFarm}
			onChangeFarm={onChangeFarm}
			loadingSmagFarms={loadingSmagFarms}
			goBack={goBack}
			success={success}
			error={error}
			loading={loading}
			backFromError={backFromError}
			selectedYear={selectedYear}
			onChangeYear={onChangeYear}
			doImport={doImport}
			smagFarms={smagFarms}
		/>
	);
};

export default ImportSmagContainer;
