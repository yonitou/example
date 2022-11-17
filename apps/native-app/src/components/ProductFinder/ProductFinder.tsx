import { useState, useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View, TextInput } from "react-native";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import { ModalsContext } from "@Context/ModalContext";
import { activeProductType } from "@Types/activeProduct.types";
import HygoIcons from "@Icons/HygoIcons";
import COLORS, { GRADIENTS } from "@Constants/palette";
import Title from "@Components/Title";
import Subtitle from "@Components/Subtitle";
import { recommendationType, tankType } from "@Types/tank.types";
import ParagraphSB from "@Components/ParagraphSB";
import ProductCard from "@Components/ProductCard";
import { targetType } from "@Types/target.types";
import ProductList, { ProductListProps } from "../ProductList";
import Input from "../Input";
import RecommendationCard from "./components/RecommendationCard";
import TargetSelector from "./components/TargetSelector";

interface ProductFinderProps extends ProductListProps {
	products: activeProductType[];
	onAddProduct: (p: activeProductType) => void;
	onBlur?: () => void;
	onFocus?: () => void;
	tankIndications?: tankType;
	autoFocus?: boolean;
	maxProductsDisplayed: number;
	selectedTargets: targetType[];
	targetsModalOpened?: boolean;
	marginHorizontal: number;
	onSelectTargets: (targets: targetType[]) => void;
}

const ProductFinder = ({
	products,
	onAddProduct,
	maxProductsDisplayed,
	onBlur,
	targetsModalOpened,
	tankIndications,
	onFocus,
	autoFocus = true,
	selectedProducts,
	marginHorizontal,
	onPressDelete,
	onSelectTargets,
	editable,
	editProductDose,
	useReducedDose = false,
	selectedTargets,
}: ProductFinderProps): JSX.Element => {
	const { t } = useTranslation();
	const { setProductMissingModalProps } = useContext(ModalsContext);
	const inputRef = useRef<TextInput>(null);
	const { control, watch, setValue } = useForm();
	const product = watch("product") ?? "";
	const [focused, setFocused] = useState<boolean>(false);

	const searchedProducts: activeProductType[] = products
		.filter((p) => !selectedProducts.find((sp) => sp.id === p.id))
		.filter((p) => p.name.toLowerCase().replace(/\s/g, "").match(product.toLowerCase().replace(/\s/g, "")))
		.sort((it1, it2) => it1.name.localeCompare(it2.name));

	const handleFocusOnBlur = (value: boolean): void => {
		setFocused(value);
		value ? onFocus && onFocus() : onBlur && onBlur();
	};

	const onPressAdd = (item: activeProductType): void => {
		setValue("product", "");
		onAddProduct(item);
		inputRef.current.blur();
	};

	const onPressMissing = (): void => {
		setProductMissingModalProps({
			visibility: true,
			props: {},
		});
	};

	const filteredRecommendations =
		tankIndications?.recommendations &&
		Object.keys(tankIndications?.recommendations)
			?.map((reco: keyof recommendationType) => tankIndications?.recommendations[reco] && reco)
			?.filter((r) => r);

	return (
		<>
			{!focused && selectedProducts?.length > 0 && (
				<ProductList
					selectedProducts={selectedProducts.slice().sort((it1, it2) => it1.name.localeCompare(it2.name))}
					onPressDelete={onPressDelete}
					editable={editable}
					marginHorizontal={marginHorizontal}
					maxProductsDisplayed={maxProductsDisplayed}
					editProductDose={editProductDose}
					useReducedDose={useReducedDose}
				/>
			)}
			<Input
				containerStyle={{ marginHorizontal }}
				inputRef={inputRef}
				control={control}
				handleFocusOrBlur={(value) => handleFocusOnBlur(value)}
				autoCapitalize="characters"
				clearable
				name="product"
				icon={
					focused ? (
						<HygoIcons.MagnifyingGlass height={24} width={24} fill={COLORS.NIGHT[50]} />
					) : (
						<HygoIcons.Add height={24} width={24} fill={COLORS.NIGHT[50]} />
					)
				}
				placeholder={
					focused
						? t("components.productFinder.focusedPlaceholder")
						: t("components.productFinder.bluredPlaceholder")
				}
				autoFocus={autoFocus}
			/>
			{!focused && filteredRecommendations?.length > 0 && (
				<FlatList
					contentContainerStyle={{ ...styles.recommendationsWrapper, marginHorizontal }}
					style={styles.flatListRecommendations}
					data={filteredRecommendations}
					scrollEnabled={false}
					ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
					keyExtractor={(item) => item}
					renderItem={({ item }) => {
						return <RecommendationCard recommendation={item as keyof recommendationType} />;
					}}
				/>
			)}
			{!focused && tankIndications?.configuration?.withTargets && (
				<View style={{ ...styles.recommendationsWrapper, marginHorizontal }}>
					<TargetSelector
						selectedTargets={selectedTargets}
						onSelectTargets={onSelectTargets}
						targetsModalOpened={targetsModalOpened}
					/>
				</View>
			)}

			{product.length >= 3 && focused && (
				<FlatList
					style={styles.flatListWrapper}
					data={searchedProducts}
					keyboardShouldPersistTaps="handled"
					ListEmptyComponent={() => (
						<View style={{ ...styles.emptyContainer, marginHorizontal }}>
							<HygoIcons.SadDrop colors={GRADIENTS.LAKE_GRAD} width={57} height={80} />
							<View style={styles.textWrapper}>
								<Title>{t("components.productFinder.noProducts.title")}</Title>
								<ParagraphSB style={styles.emptyTextDescription}>
									{t("components.productFinder.noProducts.description")}
								</ParagraphSB>
							</View>
						</View>
					)}
					ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
					keyExtractor={(item) => item.id.toString()}
					showsVerticalScrollIndicator={false}
					ListFooterComponent={() => (
						<TouchableOpacity onPress={onPressMissing} style={styles.missingProductBtn}>
							<HygoIcons.Help fill={COLORS.LAKE[100]} width={24} height={24} />
							<Subtitle style={styles.missingText}>
								{t("components.productFinder.noProducts.button")}
							</Subtitle>
						</TouchableOpacity>
					)}
					renderItem={({ item }) => {
						return (
							<ProductCard
								product={item}
								onPress={onPressAdd}
								editable
								marginHorizontal={marginHorizontal}
							/>
						);
					}}
				/>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	flatListWrapper: {
		paddingTop: 16,
	},
	flatListRecommendations: {
		flexGrow: 0,
		flexShrink: 0,
	},
	recommendationsWrapper: {
		marginTop: 8,
	},
	textWrapper: {
		flex: 1,
		marginLeft: 16,
	},
	emptyTextDescription: {
		color: COLORS.NIGHT[50],
	},
	emptyContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	listSeparator: {
		height: 4,
	},
	missingProductBtn: {
		flexDirection: "row",
		alignItems: "center",
		margin: 16,
	},
	missingText: {
		marginLeft: 8,
		color: COLORS.LAKE[100],
	},
});

export default ProductFinder;
