import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { createFarm } from "@Api/api";
import { UserContext } from "@Context/UserContext";
import TextInput from "../../TextInput";
import BaseModal from "../BaseModal";

export interface FarmCreateModalPropsType {
	modalVisible?: boolean;
	hideModal?: () => void;
}
const FarmCreateModal = ({ modalVisible, hideModal }: FarmCreateModalPropsType): JSX.Element => {
	const { t } = useTranslation();
	const { loadFarms, updateDefaultFarm, setLoading } = useContext(UserContext);
	const methods = useForm({ mode: "onChange" });

	const onCreateFarm = async ({ name }: { name: string }): Promise<void> => {
		setLoading(true);
		const createdFarm = await createFarm({ name });
		await loadFarms();
		await updateDefaultFarm(createdFarm);
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
			onConfirm={methods.handleSubmit(onCreateFarm)}
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
export default FarmCreateModal;
