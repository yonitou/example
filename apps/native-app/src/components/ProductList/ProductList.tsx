import { StyleSheet, View } from "react-native";
import { activeProductType } from "@Types/activeProduct.types";
import ProductCard from "@Components/ProductCard";
import { FlatList } from "react-native-gesture-handler";

export interface ProductListProps {
	selectedProducts: activeProductType[];
	onPressDelete: (item: activeProductType) => void;
	editable?: boolean;
	editProductDose?: (item: activeProductType) => void;
	useReducedDose?: boolean;
	maxProductsDisplayed: number;
	marginHorizontal: number;
}

const ProductList = ({
	selectedProducts,
	marginHorizontal,
	onPressDelete,
	editable,
	editProductDose,
	useReducedDose,
	maxProductsDisplayed,
}: ProductListProps): JSX.Element => {
	const maxHeight = maxProductsDisplayed * 64;
	return (
		<FlatList
			data={selectedProducts}
			style={[styles.productListWrapper, { maxHeight }]}
			showsVerticalScrollIndicator={false}
			keyExtractor={(item) => item.id.toString()}
			ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
			ListFooterComponent={() => <View style={styles.listSeparator} />}
			renderItem={({ item }) => {
				return (
					<ProductCard
						product={item}
						marginHorizontal={marginHorizontal}
						onDelete={onPressDelete}
						editable={editable}
						useReducedDose={useReducedDose}
						onPress={editProductDose}
					/>
				);
			}}
		/>
	);
};

const styles = StyleSheet.create({
	productListWrapper: {
		flexGrow: 0,
	},
	listSeparator: {
		height: 8,
	},
});

export default ProductList;
