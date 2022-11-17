import { Image, View, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import BaseButton from "@Components/BaseButton";
import FieldsList from "@Components/FieldsList";
import SafeArea from "@Components/SafeArea";
import Header from "@Components/Header";
import StepProgress from "@Components/StepProgress";
import Spinner from "@Components/Spinner";
import COLORS, { GRADIENTS } from "@Constants/palette";
import curvedArrow from "@Assets/modulation/curved-arrow.png";

import { LinearGradient } from "expo-linear-gradient";
import SwitchButton from "@Components/SwitchButton";
import Title from "@Components/Title";
import ParagraphSB from "@Components/ParagraphSB";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import { TracabilityFieldsScreenProps } from "./screen.types";

const TracabilityFieldsScreen = ({
	fields,
	loading,
	updateList,
	onNavBack,
	onNavClose,
	selectedFields,
	onNavNext,
	handleFilter,
	fieldsFiltering,
	showSwitchButton,
}: TracabilityFieldsScreenProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<LinearGradient colors={GRADIENTS.BACKGROUND_2} style={styles.container}>
			<Header
				onBackPress={onNavBack}
				onCancelPress={onNavClose}
				backgroundColor="transparent"
				customTitle={
					<StepProgress step={2} title={t("screens.selectedFields.tracability.title")} totalSteps={3} />
				}
			/>
			<SafeArea>
				{showSwitchButton && (
					<SwitchButton
						value={fieldsFiltering}
						style={styles.switch}
						onValueChange={handleFilter}
						title={t("screens.selectedFields.switchLabel")}
					/>
				)}

				{loading && <Spinner />}
				{!loading && fields?.length > 0 && (
					<View style={styles.fieldsListContainer}>
						<FieldsList
							selectedFieldIds={selectedFields?.map((f) => f.id)}
							onSelect={(field) => updateList(field, "ADD")}
							onUnSelect={(field) => updateList(field, "DELETE")}
							selection
							authorizedFields={fields}
						/>
					</View>
				)}
				{!loading && (fields?.length === 0 || !fields) && (
					<View style={styles.emptyContainer}>
						<Image source={curvedArrow} style={styles.imageNoField} />
						<Title style={styles.textNoFields}>{t("screens.selectedFields.noFields.title")}</Title>
						<ParagraphSB style={styles.subtextNoFields}>
							{t("screens.selectedFields.noFields.description")}
						</ParagraphSB>
					</View>
				)}

				<BaseButton onPress={onNavNext} disabled={selectedFields.length === 0} color={COLORS.LAKE}>
					{t("screens.selectedFields.button")}
				</BaseButton>
			</SafeArea>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	textNoFields: {
		color: COLORS.LAKE[100],
	},
	subtextNoFields: {
		color: COLORS.NIGHT[50],
	},
	switch: {
		marginBottom: 24,
	},
	imageNoField: {
		alignSelf: "flex-end",
		marginRight: HORIZONTAL_PADDING,
	},
	emptyContainer: {
		flex: 1,
	},
	fieldsListContainer: {
		marginHorizontal: -Math.abs(HORIZONTAL_PADDING),
		flex: 1,
	},
});

export default TracabilityFieldsScreen;
