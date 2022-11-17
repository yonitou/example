import { View, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import HygoIcons from "@Icons/HygoIcons";
import SafeArea from "@Components/SafeArea";
import Header from "@Components/Header";
import BaseButton from "@Components/BaseButton";
import COLORS, { GRADIENTS } from "@Constants/palette";
import FieldsList from "@Components/FieldsList";
import ParagraphSB from "@Components/ParagraphSB";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import { FieldsScreenProps } from "./screen.types";

const FieldsScreen = ({
	fields,
	selectedFields,
	onSelectField,
	onUnSelectFields,
	onPressField,
	selection,
	onGoHome,
	onPress,
	resetState,
}: FieldsScreenProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<LinearGradient colors={GRADIENTS.BACKGROUND_2} style={styles.container}>
			<Header
				title={selection ? t("screens.fields.titleWithSelection") : t("screens.fields.titleWithoutSelection")}
				backgroundColor="transparent"
				headerIcon={!selection && <HygoIcons.Parcelles width={24} height={24} fill={COLORS.LAKE[100]} />}
				onBackPress={selection ? resetState : onGoHome}
				subtitle={selection && t("screens.fields.subtitle")}
				onCancelPress={selection ? onGoHome : null}
			/>
			<SafeArea>
				<View style={styles.fieldsListContainer}>
					<FieldsList
						selectedFieldIds={selectedFields?.map((f) => f.id)}
						onSelect={onSelectField}
						onUnSelect={onUnSelectFields}
						selection={selection}
						onPressField={onPressField}
						authorizedFields={fields}
					/>
				</View>
				{selection && !selectedFields.length && (
					<View style={styles.explicabilityContainer}>
						<ParagraphSB style={styles.text}>{t("screens.fields.explicabilityText")}</ParagraphSB>
					</View>
				)}

				<BaseButton onPress={onPress} color={COLORS.LAKE} disabled={selection && selectedFields?.length === 0}>
					{selection ? t("screens.fields.saveSelectionButton") : t("screens.fields.editButton")}
				</BaseButton>
			</SafeArea>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	fieldsListContainer: {
		flex: 1,
		marginHorizontal: -Math.abs(HORIZONTAL_PADDING),
	},
	text: {
		color: COLORS.NIGHT[50],
	},
	explicabilityContainer: {
		padding: 8,
		backgroundColor: COLORS.NIGHT[5],
		borderRadius: 4,
		marginVertical: 16,
	},
});

export default FieldsScreen;
