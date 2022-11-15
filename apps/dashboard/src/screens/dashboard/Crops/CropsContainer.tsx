import { CropsScreenContext } from "@Context/CropScreenContext";
import { ModalsContext } from "@Context/ModalContext";
import { OADContext, smagStepEnum } from "@Context/OADContext";
import { featuresEnum } from "@Types/feature.types";
import { useFeature } from "flagged";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Crops from "./Crops";

const CropsContainer = (): JSX.Element => {
	const { multiSelectionEnabled, currentMode, selectedFields, fields } = useContext(CropsScreenContext);
	const { smagOnboardingStep, setSmagStepCookie, loggedInSmag } = useContext(OADContext);
	const { setSmagOnboardingCropsModalProps } = useContext(ModalsContext);
	const navigate = useNavigate();
	const hasTasks = useFeature(featuresEnum.TASKS);

	const lastSelectedField = selectedFields?.[(selectedFields?.length ?? 0) - 1];

	useEffect(() => {
		if (loggedInSmag && smagOnboardingStep === smagStepEnum.SHOW_ONBOARDING_CROPS && fields?.length > 0) {
			setSmagOnboardingCropsModalProps({
				visibility: true,
				props: {
					onConfirm: (): void => {
						setSmagStepCookie(smagStepEnum.SHOW_ONBOARDING_TASKS);
						hasTasks && navigate("/interventions");
					},
				},
			});
		}
	}, [
		smagOnboardingStep,
		setSmagOnboardingCropsModalProps,
		navigate,
		setSmagStepCookie,
		fields,
		loggedInSmag,
		hasTasks,
	]);

	return (
		<Crops
			lastSelectedField={lastSelectedField}
			multiSelectionEnabled={multiSelectionEnabled}
			currentMode={currentMode}
		/>
	);
};
export default CropsContainer;
