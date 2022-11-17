import { StyleSheet, View } from "react-native";

import { useTranslation } from "react-i18next";
import { convertProductUnit } from "@Utils/quantityConverters";
import { activeProductType, productUnitEnum } from "@Types/activeProduct.types";
import { convertToHa } from "@Utils/hygoUtils";
import COLORS from "@Constants/palette";
import HygoIcons from "@Icons/HygoIcons";

import { TouchableOpacity } from "react-native-gesture-handler";
import Title from "@Components/Title";
import ParagraphSB from "@Components/ParagraphSB";
import ProductFamilyIcons from "@Icons/ProductFamilyIcons";
import productFamilies from "@Constants/productFamilies";

interface ProductsReportCardProps {
	selectedProducts: activeProductType[];
	onRequestEdit: () => void;
	totalArea: number;
	volume: number;
}

const ProductsReportCard = ({
	selectedProducts,
	onRequestEdit,
	totalArea,
	volume,
}: ProductsReportCardProps): JSX.Element => {
	const { t } = useTranslation();
	const totalPhyto: number = selectedProducts
		.filter((p) => p.unit === productUnitEnum.LITER_PER_HA)
		?.reduce((sum, { reducedQuantity }) => sum + reducedQuantity, 0);

	const water = volume - totalPhyto;

	return (
		<>
			<View style={styles.header}>
				<View style={styles.sidesWrapper}>
					<ProductFamilyIcons.Product fill={COLORS.LAKE[100]} width={24} height={24} />
					<Title style={styles.title}>{t("components.productsReportCard.title")}</Title>
				</View>

				<TouchableOpacity style={styles.sidesWrapper} onPress={onRequestEdit}>
					<Title style={styles.editLabel}>{t("common.button.edit")}</Title>
					<HygoIcons.SimpleArrowRight fill={COLORS.LAKE[100]} width={16} height={16} />
				</TouchableOpacity>
			</View>
			<View style={styles.productsContainer}>
				<View style={styles.row}>
					<View style={styles.left}>
						<HygoIcons.WaterFill width={20} height={20} fill={COLORS.NIGHT[100]} />
						<ParagraphSB style={styles.liquidName}>
							{t("components.productsReportCard.water").toUpperCase()}
						</ParagraphSB>
					</View>
					<ParagraphSB style={styles.middle}>
						{Number.isNaN(water) ? "..." : (water / convertToHa(totalArea)).toFixed(0)}{" "}
						{productUnitEnum.LITER_PER_HA}
					</ParagraphSB>
					<ParagraphSB style={styles.right}>
						{Number.isNaN(water) ? "..." : water.toFixed(0)} {t("common.units.liters").toUpperCase()}
					</ParagraphSB>
				</View>
				{selectedProducts.map((p) => {
					const ProductIcon = productFamilies[p.productFamily];
					return (
						<View style={styles.row} key={p.id}>
							<View style={styles.left}>
								<ProductIcon width={20} height={20} fill={COLORS.NIGHT[100]} />
								<ParagraphSB style={styles.liquidName}>{p.name.toUpperCase()}</ParagraphSB>
							</View>

							<ParagraphSB
								style={{
									...styles.middle,
									color: p?.reducedDose > p.maxDose ? COLORS.GASPACHO[100] : COLORS.NIGHT[50],
								}}
							>
								{Number.isNaN(p.reducedDose) || !p.reducedDose ? "..." : p?.reducedDose?.toFixed(2)}{" "}
								{p.unit}
							</ParagraphSB>
							<ParagraphSB style={styles.right}>
								{Number.isNaN(p.reducedQuantity) || !p.reducedQuantity
									? "..."
									: p?.reducedQuantity?.toFixed(2)}{" "}
								{convertProductUnit(p.unit)}
							</ParagraphSB>
						</View>
					);
				})}
				<View style={[styles.row, styles.withoutMargin]}>
					<View style={styles.left} />
					<ParagraphSB style={[styles.middle, styles.total]}>{t("common.total")}</ParagraphSB>
					<ParagraphSB style={[styles.right, styles.total]}>
						{volume.toFixed(0)} {t("common.units.liters").toUpperCase()}
					</ParagraphSB>
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 16,
	},
	withoutMargin: {
		marginBottom: 0,
	},
	productsContainer: {
		marginTop: 16,
	},
	header: {
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
	},
	title: {
		marginLeft: 8,
	},
	editLabel: {
		color: COLORS.LAKE[100],
		marginRight: 8,
	},
	sidesWrapper: {
		alignItems: "center",
		flexDirection: "row",
	},

	liquidName: {
		marginLeft: 8,
	},
	total: {
		color: COLORS.NIGHT[100],
	},
	left: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
	},
	middle: {
		color: COLORS.NIGHT[50],
		flex: 1,
		textAlign: "right",
	},
	right: {
		color: COLORS.NIGHT[50],
		flex: 1,
		textAlign: "right",
	},
});

export default ProductsReportCard;
