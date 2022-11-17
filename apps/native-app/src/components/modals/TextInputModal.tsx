import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import COLORS from "@Constants/palette";
import Input from "@Components/Input";
import BaseButton from "@Components/BaseButton";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import Modal, { ModalPropsType } from "./Modal";

export interface TextInputModalPropsType extends ModalPropsType {
	defaultValue: string;
	setValue: (value: string) => void;
}

const TextInputModal = ({
	title,
	modalVisible,
	hideModal,
	defaultValue,
	setValue,
}: TextInputModalPropsType): JSX.Element => {
	const { t } = useTranslation();
	const { control, watch, formState } = useForm({ mode: "all" });
	const value = watch("name") ?? defaultValue;

	const handleSubmit = (): void => {
		setValue(value);
		hideModal();
	};

	return (
		<Modal title={title} modalVisible={modalVisible} hideModal={hideModal}>
			<View style={styles.container}>
				<Input
					name="name"
					autoFocus
					autoCapitalize="words"
					control={control}
					defaultValue={defaultValue}
					rules={{ required: { value: true, message: t("common.inputs.fieldName.errors.required") } }}
					error={formState.errors.name}
				/>
				<BaseButton color={COLORS.LAKE} onPress={handleSubmit} disabled={!formState.isValid} style={styles.btn}>
					{t("common.button.confirm")}
				</BaseButton>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: HORIZONTAL_PADDING,
	},
	btn: {
		marginTop: 16,
	},
});

export default TextInputModal;
