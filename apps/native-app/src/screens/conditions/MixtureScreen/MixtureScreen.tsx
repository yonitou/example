import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@Components/Header";
import BaseButton from "@Components/BaseButton";
import COLORS, { GRADIENTS } from "@Constants/palette";
import SafeArea from "@Components/SafeArea";
import { useState } from "react";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import ProductFinder from "@Components/ProductFinder";
import HygoIcons from "@Icons/HygoIcons";
import Spinner from "@Components/Spinner";
import { MixtureScreenProps } from "./screen.types";

const MixtureScreen = ({
	onNavBack,
	selectedTargets,
	products,
	onAddProduct,
	tankIndications,
	updateTargetsList,
	selectedProducts,
	onSubmit,
	removeProduct,
	submitting,
	loading,
	mixtureId,
}: MixtureScreenProps): JSX.Element => {
	const { t } = useTranslation();
	const [finderFocus, setFinderFocus] = useState<boolean>(false);

	return (
		<LinearGradient colors={GRADIENTS.BACKGROUND_2} style={styles.container}>
			<Header
				onBackPress={onNavBack}
				backgroundColor="transparent"
				headerIcon={<HygoIcons.ProductAdd width={24} height={24} fill={COLORS.LAKE[100]} />}
				title={mixtureId ? t("screens.mixture.title.update") : t("screens.mixture.title.add")}
			/>
			<SafeArea withHorizontalPadding={false}>
				{loading ? (
					<Spinner />
				) : (
					<>
						<View style={styles.productFinderWrapper}>
							<ProductFinder
								marginHorizontal={HORIZONTAL_PADDING}
								selectedTargets={selectedTargets}
								products={products}
								onAddProduct={onAddProduct}
								tankIndications={tankIndications}
								maxProductsDisplayed={4}
								onSelectTargets={updateTargetsList}
								autoFocus={selectedProducts?.length === 0}
								selectedProducts={selectedProducts}
								onBlur={() => setFinderFocus(false)}
								onFocus={() => setFinderFocus(true)}
								onPressDelete={removeProduct}
							/>
						</View>
						{selectedProducts.length > 0 && !finderFocus && (
							<View style={styles.footer}>
								<BaseButton
									loading={submitting}
									onPress={onSubmit}
									style={styles.submitBtn}
									disabled={selectedProducts.length <= 0}
									color={COLORS.LAKE}
								>
									{t("common.button.confirm")}
								</BaseButton>
							</View>
						)}
					</>
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
});

export default MixtureScreen;
