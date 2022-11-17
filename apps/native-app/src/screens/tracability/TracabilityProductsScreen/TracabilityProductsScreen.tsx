import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import StepProgress from "@Components/StepProgress";
import BaseButton from "@Components/BaseButton";
import ProductFinder from "@Components/ProductFinder";
import Header from "@Components/Header";
import SafeArea from "@Components/SafeArea";
import HygoIcons from "@Icons/HygoIcons";
import COLORS, { GRADIENTS, NOZZLE_COLORS } from "@Constants/palette";
import { LinearGradient } from "expo-linear-gradient";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import Title from "@Components/Title";
import CircularButton from "@Components/CircularButton";
import ParagraphSB from "@Components/ParagraphSB";
import { productUnitEnum } from "@Types/activeProduct.types";
import { TracabilityProductsScreenProps } from "./screen.types";

const TracabilityProductsScreen = ({
	products,
	selectedProducts,
	addProduct,
	removeProduct,
	onNavBack,
	onNavClose,
	onNavNext,
	activeModulation,
	handleDebitClick,
	handleNozzleClick,
	nozzle,
	tankIndications,
	debit,
	onSelectTargets,
	selectedTargets,
	targetsModalOpened,
	modulation,
}: TracabilityProductsScreenProps): JSX.Element => {
	const { t } = useTranslation();
	const [finderFocus, setFinderFocus] = useState<boolean>(false);

	return (
		<LinearGradient colors={GRADIENTS.BACKGROUND_2} style={styles.container}>
			<Header
				onBackPress={onNavBack}
				onCancelPress={onNavClose}
				customTitle={
					<StepProgress step={3} title={t("screens.selectedProducts.tracability.title")} totalSteps={3} />
				}
				backgroundColor="transparent"
			/>
			<SafeArea withHorizontalPadding={false}>
				<View style={styles.productFinderWrapper}>
					<ProductFinder
						marginHorizontal={HORIZONTAL_PADDING}
						onSelectTargets={onSelectTargets}
						products={products}
						selectedTargets={selectedTargets}
						tankIndications={{ ...tankIndications, recommendations: null }}
						onAddProduct={addProduct}
						maxProductsDisplayed={4}
						onBlur={() => setFinderFocus(false)}
						onFocus={() => setFinderFocus(true)}
						autoFocus={selectedProducts?.length === 0}
						selectedProducts={selectedProducts}
						targetsModalOpened={targetsModalOpened}
						onPressDelete={removeProduct}
						editable
						useReducedDose={activeModulation}
						editProductDose={addProduct}
					/>
					{activeModulation && !finderFocus && (
						<View style={styles.activeModulationDetails}>
							<HygoIcons.DropHalfFilled fill={COLORS.TANGERINE[100]} width={24} height={24} />
							<Title style={styles.activeModulationDetailsText}>
								{t("screens.selectedProducts.modulation")} ({modulation?.toFixed(0)}
								{t("common.units.percentage")})
							</Title>
						</View>
					)}
				</View>
				{selectedProducts.length > 0 && !finderFocus && (
					<View style={styles.footer}>
						<View style={styles.circleBtnsWrapper}>
							<CircularButton
								onPress={handleNozzleClick}
								title={nozzle?.name || t("common.equipment.emptyNozzle")}
							>
								<HygoIcons.Nozzle
									fill={nozzle?.color ? NOZZLE_COLORS[nozzle.color] : COLORS.WHITE[100]}
									width={30}
									height={40}
								/>
							</CircularButton>
							<CircularButton onPress={handleDebitClick} title={t("common.equipment.pressure")}>
								<>
									<Title>{debit}</Title>
									<ParagraphSB style={styles.unitDebit}>{productUnitEnum.LITER_PER_HA}</ParagraphSB>
								</>
							</CircularButton>
						</View>
						<BaseButton
							onPress={onNavNext}
							style={styles.submitBtn}
							disabled={selectedProducts.length <= 0}
							color={COLORS.LAKE}
						>
							{t("screens.selectedProducts.button")}
						</BaseButton>
					</View>
				)}
			</SafeArea>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	productFinderWrapper: {
		flex: 1,
	},
	footer: {
		paddingHorizontal: HORIZONTAL_PADDING,
	},
	submitBtn: {
		marginTop: 24,
	},
	activeModulationDetails: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: HORIZONTAL_PADDING,
		marginTop: 8,
	},
	activeModulationDetailsText: {
		marginLeft: 8,
	},
	circleBtnsWrapper: {
		justifyContent: "space-around",
		flexDirection: "row",
	},
	unitDebit: {
		color: COLORS.NIGHT[50],
	},
});

export default TracabilityProductsScreen;
