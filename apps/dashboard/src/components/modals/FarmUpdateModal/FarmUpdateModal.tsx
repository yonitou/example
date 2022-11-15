import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { updateFarm } from "@Api/api";
import { UserContext } from "@Context/UserContext";
import TextInput from "../../TextInput";
import BaseModal from "../BaseModal";

export interface FarmUpdateModalPropsType {
	modalVisible?: boolean;
	hideModal?: () => void;
}
const FarmUpdateModal = ({ modalVisible, hideModal }: FarmUpdateModalPropsType): JSX.Element => {
	const { t } = useTranslation();
	const { loadFarms, updateDefaultFarm, setLoading, defaultFarm } = useContext(UserContext);
	const methods = useForm({
		mode: "onChange",
		defaultValues: {
			name: defaultFarm.name,
		},
	});

	const onUpdateFarm = async ({ name }: { name: string }): Promise<void> => {
		setLoading(true);
		const updatedFarm = await updateFarm({ ...defaultFarm, name });
		await updateDefaultFarm(updatedFarm, false);
		await loadFarms();
		setLoading(false);
	};

	return (
		<BaseModal
			modalVisible={modalVisible}
			hideModal={hideModal}
			title={t("modals.farmCreate.title")}
			confirmBtnText={t("common.button.save")}
			cancelBtnText={t("common.button.cancel")}
			onCancel={hideModal}
			onConfirm={methods.handleSubmit(onUpdateFarm)}
			confirmBtnDisabled={!methods.formState.isValid}
			colorCancelBtn="tangerine"
			colorConfirmBtn="tangerine"
			sideBySideButtons
		>
			{/* eslint-disable-next-line */}
			<FormProvider {...methods}>
				<div className="input-wrapper">
					<TextInput
						name="name"
						rules={{
							required: {
								value: true,
								message: t("common.inputs.farmName.errors.required"),
							},
						}}
						placeholder={t("common.inputs.farmName.placeholder")}
						error={methods.formState.errors.name}
					/>
				</div>
			</FormProvider>
		</BaseModal>
	);
};
export default FarmUpdateModal;
