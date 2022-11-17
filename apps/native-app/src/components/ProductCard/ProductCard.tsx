import COLORS from "@Constants/palette";
import HygoIcons from "@Icons/HygoIcons";
import Title from "@Components/Title";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, StyleSheet } from "react-native";
import { activeProductType } from "@Types/activeProduct.types";
import BaseButton from "@Components/BaseButton";
import productFamilies from "@Constants/productFamilies";

interface ProductCardProps {
	product: activeProductType;
	onPress: (p: activeProductType) => void;
	editable?: boolean;
	useReducedDose?: boolean;
	marginHorizontal: number;
	onDelete?: (p: activeProductType) => void;
}

const ProductCard = ({
	product,
	onPress,
	editable,
	useReducedDose,
	onDelete,
	marginHorizontal,
}: ProductCardProps): JSX.Element => {
	const paddingVertical = onDelete ? 8 : 16;
	const reducedDose = (product.dose * (100 - product.modulation)) / 100;

	const ProductIcon = productFamilies?.[product?.productFamily];
	return (
		<TouchableOpacity
			onPress={() => onPress(product)}
			style={[{ ...styles.productCardWrapper, marginHorizontal }, { paddingVertical }]}
			disabled={!editable}
		>
			<View style={styles.nameWrapper}>
				<ProductIcon fill={COLORS.NIGHT[100]} width={24} height={24} />
				<Title style={styles.productName} numberOfLines={1}>
					{product.name.toUpperCase()}
				</Title>
			</View>
			<View style={styles.doseWrapper}>
				{product.dose && (
					<Title
						style={[
							styles.textDose,
							useReducedDose && product.modulationActive ? { color: COLORS.TANGERINE[100] } : null,
						]}
					>
						{useReducedDose ? reducedDose.toFixed(2) : product.dose.toString()} {product.unit}
					</Title>
				)}
				{onDelete ? (
					<BaseButton
						color={COLORS.GASPACHO}
						style={styles.deleteBtn}
						borderRadius={4}
						onPress={() => onDelete(product)}
					>
						<HygoIcons.Minus fill={COLORS.WHITE[100]} width={24} height={24} />
					</BaseButton>
				) : (
					<HygoIcons.Add fill={COLORS.LAKE[100]} width={24} height={24} />
				)}
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	productCardWrapper: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 16,
		paddingHorizontal: 8,
		backgroundColor: COLORS.WHITE[100],
		borderRadius: 8,
		shadowColor: COLORS.NIGHT[50],
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.19,
		shadowRadius: 5.62,
		elevation: 6,
	},
	doseWrapper: {
		flexDirection: "row",
		alignItems: "center",
	},
	textDose: {
		color: COLORS.NIGHT[50],
		marginRight: 16,
	},
	deleteBtn: {
		width: 40,
		height: 40,
	},
	nameWrapper: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
	},
	productName: {
		marginLeft: 8,
		flex: 1,
	},
});

export default ProductCard;
