import { updateAcidityAndWater } from "@Api/hygoApi";
import { AuthContext } from "@Context/AuthContext";
import { SnackbarContext, SnackTypeEnum } from "@Context/SnackBarContext";
import { useContext, useEffect, useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import EquipmentAdvancedScreen from "./EquipmentAdvancedScreen";
import { EquipmentAdvancedContainerProps } from "./screen.types";

const EquipmentAdvancedContainer = ({ navigation }: EquipmentAdvancedContainerProps): JSX.Element => {
	const { t } = useTranslation();
	const { user, fetchUser } = useContext(AuthContext);
	const { showSnackbar } = useContext(SnackbarContext);
	const [loading, setLoading] = useState<boolean>(false);
	const defaultValues = useMemo(
		(): FieldValues => ({
			soilAcidity: user?.equipments?.soilAcidity?.toString() || "",
			waterAcidity: user?.equipments?.waterAcidity?.toString() || "",
			waterHardness: user?.equipments?.waterHardness
				? {
						value: user?.equipments?.waterHardness,
						label: t(
							`screens.equipmentAdvancedScreen.components.hardnessSelector.${user?.equipments?.waterHardness}`
						),
				  }
				: {
						value: "",
						label: "",
				  },
		}),
		[user, t]
	);

	const { control, formState, handleSubmit, reset } = useForm({
		mode: "all",
		defaultValues,
	});

	const onSubmit = async (data: FieldValues): Promise<void> => {
		setLoading(true);
		try {
			await updateAcidityAndWater({
				waterHardness: data.waterHardness?.value,
				soilAcidity: parseFloat(data.soilAcidity) || null,
				waterAcidity: parseFloat(data.waterAcidity) || null,
			});
		} catch (e) {
			showSnackbar(t("common.snackbar.updateEquipmentAdvanced.error"), SnackTypeEnum.ERROR);
		} finally {
			await fetchUser();
			setLoading(false);
		}
	};

	const onGoback = (): void => navigation.pop();

	useEffect(() => {
		reset(defaultValues);
	}, [defaultValues, reset]);

	return (
		<EquipmentAdvancedScreen
			control={control}
			formState={formState}
			onSubmit={onSubmit}
			onGoBack={onGoback}
			loading={loading}
			handleSubmit={handleSubmit}
		/>
	);
};

export default EquipmentAdvancedContainer;
