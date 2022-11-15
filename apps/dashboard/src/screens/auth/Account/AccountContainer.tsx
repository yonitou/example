import { useEffect, useState, useContext, useMemo, useRef } from "react";
import { useFeature } from "flagged";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { patchUser } from "@Api/api";
import { UserContext } from "@Context/UserContext";
import { AuthContext } from "@Context/AuthContext";
import { SnackbarContext, snackbarTypeEnum } from "@Context/SnackbarContext";
import { useQuery } from "@Hook/useQuery";
import useChargebee from "@Hook/useChargebee";
import { ModalsContext } from "@Context/ModalContext";
import { featuresEnum } from "@Types/feature.types";
import Account from "./Account";
import { FormInputs } from "./account.types";

const AccountContainer = (): JSX.Element => {
	const { t } = useTranslation();
	const { coops, plans } = useContext(UserContext);
	const { user, refetchUserProps, planId } = useContext(AuthContext);
	const { showSnackbar } = useContext(SnackbarContext);
	const { setAccountDeleteModalProps } = useContext(ModalsContext);
	const { openChargebeePortal } = useChargebee();
	const navigate = useNavigate();
	const query = useQuery();
	const smagSectionRef = useRef<HTMLDivElement>();
	const hasFarmWeather = useFeature(featuresEnum.FARM_WEATHER);

	const [loading, setLoading] = useState<boolean>(false);
	const userCoop = coops?.find((c) => c.id === user?.coopId);

	const defaultValues = useMemo(
		() => ({
			coop: userCoop && { value: userCoop?.id.toString(), label: userCoop?.name },
			location: { lat: user.location.lat, lon: user.location.lon, label: user.location.label },
			googleAutocomplete: user.location.label,
		}),
		[userCoop, user]
	);

	const methods = useForm({
		mode: "onChange",
		defaultValues,
	});

	const onSubmit = async (formValues: FormInputs): Promise<void> => {
		setLoading(true);
		if (!formValues.location.label) {
			methods.setError("googleAutocomplete", {
				type: "custom",
				message: t("common.inputs.location.errors.notFindable"),
			});
			setLoading(false);
			return;
		}
		try {
			await patchUser({ coopId: parseInt(formValues.coop.value, 10), location: formValues.location });
			showSnackbar(t("common.snackbar.updateAccount.success"), snackbarTypeEnum.SUCCESS);
		} catch (e) {
			showSnackbar(t("common.snackbar.updateAccount.error"), snackbarTypeEnum.ERROR);
		} finally {
			await refetchUserProps();
			setLoading(false);
		}
	};

	useEffect(() => {
		methods.reset(defaultValues);
	}, [defaultValues, methods]);

	useEffect(() => {
		const checkSmagAuth = (): void => {
			const errorCode = query.get("errorCode");
			if (errorCode) {
				showSnackbar(t(`common.snackbar.smagAuth.${errorCode}`), snackbarTypeEnum.ERROR);
			}
		};
		const checkIfFromImport = (): void => {
			const fromImport = query.has("smag");
			if (fromImport) {
				smagSectionRef.current.scrollIntoView({ behavior: "smooth" });
			}
		};
		checkSmagAuth();
		checkIfFromImport();
	});

	const onClickPricing = (): void => navigate("/pricing");
	const onCancel = (): void => navigate(-1);

	const plan = plans.find((p) => p.planId === planId);

	const openAccountDeleteModal = (): void => {
		setAccountDeleteModalProps({
			visibility: true,
			props: {},
		});
	};
	return (
		<Account
			plan={plan}
			planStatus={user?.plan?.status}
			methods={methods}
			hasFarmWeather={!!hasFarmWeather}
			onSubmit={onSubmit}
			loading={loading}
			coops={coops}
			onClickPricing={onClickPricing}
			onClickManageSubscription={openChargebeePortal}
			onCancel={onCancel}
			smagSectionRef={smagSectionRef}
			openAccountDeleteModal={openAccountDeleteModal}
		/>
	);
};

export default AccountContainer;
