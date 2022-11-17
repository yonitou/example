import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import BaseButton from "@Components/BaseButton";
import ProductFinder from "@Components/ProductFinder";
import Header from "@Components/Header";
import StepProgress from "@Components/StepProgress";
import SafeArea from "@Components/SafeArea";
import COLORS, { GRADIENTS, NOZZLE_COLORS } from "@Constants/palette";
import Title from "@Components/Title";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import CircularButton from "@Components/CircularButton";
import HygoIcons from "@Icons/HygoIcons";
import ParagraphSB from "@Components/ParagraphSB";
import { productUnitEnum } from "@Types/activeProduct.types";
import { ModulationProductsScreenProps } from "./screen.types";

const ModulationProductsScreen = ({
	nozzle,
	handleNozzleClick,
	tankIndications,
	debit,
	handleDebitClick,
	targetsModalOpened,
	products,
	selectedProducts,
	addProduct,
	removeProduct,
	onSelectTargets,
	onNavBack,
	selectedTargets,
	onNavNext,
}: ModulationProductsScreenProps): JSX.Element => {
	const { t } = useTranslation();
	const [finderFocus, setFinderFocus] = useState<boolean>(false);

	return (
		<LinearGradient colors={GRADIENTS.BACKGROUND_2} style={styles.container}>
			<Header
				onBackPress={onNavBack}
				customTitle={<StepProgress step={1} title={t("screens.selectedProducts.title")} totalSteps={3} />}
				backgroundColor="transparent"
			/>
			<SafeArea withHorizontalPadding={false}>
				<View style={styles.productFinderWrapper}>
					<ProductFinder
						marginHorizontal={HORIZONTAL_PADDING}
						targetsModalOpened={targetsModalOpened}
						selectedTargets={selectedTargets}
						products={products}
						onAddProduct={addProduct}
						tankIndications={tankIndications}
						maxProductsDisplayed={4}
						onSelectTargets={onSelectTargets}
						onBlur={() => setFinderFocus(false)}
						onFocus={() => setFinderFocus(true)}
						autoFocus={selectedProducts?.length === 0}
						selectedProducts={selectedProducts}
						onPressDelete={removeProduct}
						editable
						editProductDose={addProduct}
					/>
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
							disabled={selectedProducts.length <= 0 || !nozzle}
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
	circleBtnsWrapper: {
		justifyContent: "space-around",
		flexDirection: "row",
	},
	footer: {
		paddingHorizontal: HORIZONTAL_PADDING,
	},
	unitDebit: {
		color: COLORS.NIGHT[50],
	},
	submitBtn: {
		marginTop: 24,
	},
});

export default ModulationProductsScreen;
