import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { SnackbarContext, SnackTypeEnum } from "@Context/SnackBarContext";
import { cropType } from "@Types/crop.types";
import { updateField } from "@Api/hygoApi";
import { UserContext } from "@Context/UserContext";
import Analytics from "@Analytics";
import { CropsContainerProps } from "./screen.types";
import CropsScreen from "./CropsScreen";

const CropsContainer = ({ navigation, route }: CropsContainerProps): JSX.Element => {
	const { t } = useTranslation();
	const { logAnalyticEvent, events } = Analytics;
	const { showSnackbar } = useContext(SnackbarContext);

	const [loading, setLoading] = useState<boolean>(false);
	const { defaultFarm, crops, fetchFields } = useContext(UserContext);
	const selectedFields = route?.params?.selectedFields;

	const handleSelectCrop = async (crop: cropType): Promise<void> => {
		setLoading(true);
		const requests = selectedFields?.map((f) => {
			const field = {
				fieldId: f.id,
				cropId: crop.id,
			};
			return updateField(field, defaultFarm.id);
		});
		try {
			await Promise.all(requests);
			await fetchFields();
			logAnalyticEvent(events.fieldsScreen.fieldsScreen.updateCrops, {
				selectedFields,
				selectedCrop: crop,
			});
			showSnackbar(t("common.snackbar.updateField.success"), SnackTypeEnum.OK);
		} catch (e) {
			showSnackbar(t("common.snackbar.updateField.error"), SnackTypeEnum.ERROR);
		} finally {
			navigation.navigate("FieldsScreen", { refresh: true });
		}
	};

	const onGoHome = (): void => navigation.navigate("Tabs", { screen: "HomeScreen" });

	const onNavBack = (): void => navigation.goBack();

	return (
		<CropsScreen
			crops={crops}
			onSelectCrop={handleSelectCrop}
			onGoHome={onGoHome}
			onNavBack={onNavBack}
			loading={loading}
		/>
	);
};

export default CropsContainer;
