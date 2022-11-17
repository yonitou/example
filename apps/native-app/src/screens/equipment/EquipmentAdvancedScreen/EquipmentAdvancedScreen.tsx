import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import HygoIcons from "@Icons/HygoIcons";
import EquipmentCard from "@Components/EquipmentCard";
import Header from "@Components/Header";
import BaseButton from "@Components/BaseButton";
import COLORS, { GRADIENTS } from "@Constants/palette";
import SafeArea from "@Components/SafeArea";
import Input from "@Components/Input";
import HardnessSelector from "./components/HardnessSelector";
import { EquipmentAdvancedScreenProps } from "./screen.types";

const EquipmentAdvancedScreen = ({
	loading,
	onSubmit,
	formState,
	onGoBack,
	handleSubmit,
	control,
}: EquipmentAdvancedScreenProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<LinearGradient style={styles.container} colors={GRADIENTS.BACKGROUND_2}>
			<Header
				title={t("screens.equipmentAdvanced.title")}
				headerIcon={<HygoIcons.PulvEquipment width={24} height={24} fill={COLORS.LAKE[100]} />}
				onBackPress={onGoBack}
				backgroundColor="transparent"
			/>

			<SafeArea>
				<View style={styles.content}>
					<EquipmentCard
						icon={<HygoIcons.Soil width={24} height={24} fill={COLORS.TANGERINE[100]} />}
						label={t("screens.equipmentAdvanced.equipmentCard.soil")}
						withCheckIcon={false}
					>
						<Input
							returnKeyType="done"
							control={control}
							editable={!loading}
							name="soilAcidity"
							unit={t("common.units.ph")}
							placeholder={t("common.inputs.soilAcidity.placeholder")}
							keyboardType="numeric"
							label={t("common.inputs.soilAcidity.label")}
							rules={{
								valueAsNumber: true,
								validate: (v) =>
									(v && v > 0 && v < 15) || !v || t("common.inputs.soilAcidity.errors.invalid"),
							}}
							error={formState.errors.soilAcidity}
						/>
					</EquipmentCard>

					<EquipmentCard
						icon={<HygoIcons.WaterFill width={24} height={24} fill={COLORS.TANGERINE[100]} />}
						label={t("screens.equipmentAdvanced.equipmentCard.water")}
						withCheckIcon={false}
						withMarginBottom={false}
					>
						<>
							<Input
								returnKeyType="done"
								containerStyle={styles.withMargin}
								control={control}
								editable={!loading}
								name="waterAcidity"
								unit={t("common.units.ph")}
								placeholder={t("common.inputs.waterAcidity.placeholder")}
								keyboardType="numeric"
								label={t("common.inputs.waterAcidity.label")}
								rules={{
									valueAsNumber: true,
									validate: (v) =>
										(v && v > 0 && v < 15) || !v || t("common.inputs.waterAcidity.errors.invalid"),
								}}
								error={formState.errors.waterAcidity}
							/>
							<Controller
								control={control}
								name="waterHardness"
								render={({ field: { onChange, value }, fieldState: { error } }) => {
									return (
										<HardnessSelector
											onSelect={onChange}
											value={value}
											error={error}
											disabled={loading}
										/>
									);
								}}
							/>
						</>
					</EquipmentCard>
				</View>
				<BaseButton
					color={COLORS.LAKE}
					loading={loading}
					disabled={!formState.isValid || !formState.isDirty}
					onPress={handleSubmit(onSubmit)}
				>
					{t("common.button.save")}
				</BaseButton>
			</SafeArea>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
	},
	withMargin: {
		marginBottom: 8,
	},
});

export default EquipmentAdvancedScreen;
