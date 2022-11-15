import { COLORS } from "@Constants/palette";
import productFamilies from "@Constants/productFamilies";
import BaseIcons from "@Icons/BaseIcons";
import ProductFamilyIcons from "@Icons/ProductFamilyIcons";
import { activeProductType, productUnitEnum } from "@Types/activeProduct.types";
import { convertProductUnit } from "@Utils/convertProductUnit";
import { convertToHa } from "@Utils/convertToHa";
import { convertToLPerHa } from "@Utils/convertToLPerHa";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

interface ProductsSectionProps {
	products: activeProductType[];
	volume: number;
	totalArea: number;
}

const StyledProductsSection = styled.section`
	background-color: var(--white);
	padding: 1.6rem;
	border-radius: 0.4rem;
	flex: 1;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	.title-wrapper {
		display: flex;
		align-items: center;
		h3 {
			margin-left: 0.8rem;
		}
	}
	.products-container {
		flex: 1;
		margin-top: 1.6rem;
		overflow: auto;
		.row {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 1.6rem;
			&:last-child {
				margin-bottom: 0;
			}
			.left {
				display: flex;
				align-items: center;
				flex: 1;
				h5.product-name {
					margin-left: 0.8rem;
					color: var(--night-100);
				}
			}
			h5.middle,
			h5.right {
				flex: 1;
				text-align: right;
				color: var(--night-50);
				&.total {
					color: var(--night-100);
				}
			}
		}
	}
`;

const ProductsSection = ({ products, totalArea, volume }: ProductsSectionProps): JSX.Element => {
	const { t } = useTranslation();
	const productsWithReducedQuantity = products?.map((product) => {
		const reducedDose = (product.dose * (100 - product.modulation)) / 100;
		return {
			...product,
			reducedDose,
			reducedQuantity: (convertToLPerHa(reducedDose, product.unit) * totalArea) / 10000,
		};
	});

	const totalPhyto: number = productsWithReducedQuantity
		?.filter((p) => p.unit === productUnitEnum.LITER_PER_HA)
		?.reduce((sum, { reducedQuantity }) => sum + reducedQuantity, 0);

	const water = volume - totalPhyto;

	return (
		<StyledProductsSection>
			<div className="title-wrapper">
				<ProductFamilyIcons.Product width={24} height={24} fill={COLORS.LAKE[100]} />
				<h3>{t("components.taskCard.productsSection.title")}</h3>
			</div>
			<div className="products-container">
				<div className="row">
					<div className="left">
						<BaseIcons.WaterFill width={24} height={24} fill={COLORS.NIGHT[100]} />
						<h5 className="product-name">{t("components.taskCard.productsSection.water").toUpperCase()}</h5>
					</div>
					<h5 className="middle">
						{Number.isNaN(water) ? "..." : (water / convertToHa(totalArea)).toFixed(0)}{" "}
						{productUnitEnum.LITER_PER_HA}
					</h5>
					<h5 className="right">
						{Number.isNaN(water) ? "..." : water.toFixed(0)} {t("common.units.liters").toUpperCase()}
					</h5>
				</div>
				{productsWithReducedQuantity?.map((p) => {
					const ProductIcon = productFamilies[p.productFamily];
					return (
						<div className="row" key={p.id}>
							<div className="left">
								<ProductIcon width={24} height={24} fill={COLORS.NIGHT[100]} />
								<h5 className="product-name">{p.name.toUpperCase()}</h5>
							</div>

							<h5
								className="middle"
								style={{
									color: p?.reducedDose > p.maxDose ? COLORS.GASPACHO[100] : COLORS.NIGHT[50],
								}}
							>
								{Number.isNaN(p.reducedDose) || !p.reducedDose ? "..." : p?.reducedDose?.toFixed(2)}{" "}
								{p.unit}
							</h5>
							<h5 className="right">
								{Number.isNaN(p.reducedQuantity) || !p.reducedQuantity
									? "..."
									: p?.reducedQuantity?.toFixed(2)}{" "}
								{convertProductUnit(p.unit)}
							</h5>
						</div>
					);
				})}
				<div className="row">
					<div className="left" />
					<h5 className="total middle">{t("common.total")}</h5>
					<h5 className="total right">
						{volume.toFixed(0)} {t("common.units.liters").toUpperCase()}
					</h5>
				</div>
			</div>
		</StyledProductsSection>
	);
};

export default ProductsSection;
