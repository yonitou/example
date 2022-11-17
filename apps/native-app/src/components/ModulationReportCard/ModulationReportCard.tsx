import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ModalsContext } from "@Context/ModalContext";
import HygoIcons from "@Icons/HygoIcons";
import { activeProductType, productStatusEnum } from "@Types/activeProduct.types";
import COLORS from "@Constants/palette";
import Title from "@Components/Title";
import SwitchButton from "@Components/SwitchButton";
import ParagraphSB from "@Components/ParagraphSB";
import { useTranslation } from "react-i18next";

interface ModulationReportCardProps {
	modulation: number;
	modulationIsActive: boolean;
	updateProducts?: (products: activeProductType[]) => void;
	selectedProducts: activeProductType[];
	showModalSwitchBtns?: boolean;
}

const ModulationReportCard = ({
	modulation,
	updateProducts,
	modulationIsActive,
	selectedProducts,

	showModalSwitchBtns = true,
}: ModulationReportCardProps): JSX.Element => {
	const { t } = useTranslation();
	const { setProductsModulationModalProps } = useContext(ModalsContext);
	const modulableProducts = selectedProducts.filter((p) => p.modulationStatus === productStatusEnum.MODULABLE);
	const nonModulableProducts = selectedProducts.filter((p) => p.modulationStatus !== productStatusEnum.MODULABLE);
	const showProductModulationDetails =
		(modulableProducts.length > 1 && modulation > 0) || nonModulableProducts.length > 0;
	const modalEnabled = modulableProducts.length > 1;

	const onChange = (value: boolean): void => {
		const newProducts = selectedProducts.map((p) => ({
			...p,
			modulationActive: value,
		}));
		updateProducts(newProducts);
	};
	const openProductsModulationModal = (): void => {
		if (modalEnabled)
			setProductsModulationModalProps({
				visibility: true,
				props: {
					selectedProducts,
					showModalSwitchBtns,
					onConfirm: showModalSwitchBtns && updateProducts,
				},
			});
	};

	return (
		<>
			<View style={styles.header}>
				<View style={styles.sidesWrapper}>
					<HygoIcons.DropHalfFilled fill={COLORS.LAKE[100]} width={24} height={24} />
					<Title style={styles.title}>
						{t("components.modulationReportCard.title", { modulation: (modulation || 0)?.toFixed(0) })}
					</Title>
				</View>

				{updateProducts && modulableProducts.length > 0 && (
					<SwitchButton value={modulationIsActive} onValueChange={onChange} />
				)}
			</View>

			{showProductModulationDetails && (
				<TouchableOpacity
					style={styles.cardBody}
					onPress={openProductsModulationModal}
					disabled={!modalEnabled}
				>
					<View>
						{modulableProducts.length > 0 && (
							<ParagraphSB style={styles.productModulationDetails}>
								{modulableProducts.filter((p) => p.modulationActive).length} /{" "}
								{modulableProducts.length} des produits modulés
							</ParagraphSB>
						)}
						{modulableProducts.length > 0 && nonModulableProducts.length > 0 && (
							<View style={styles.separator} />
						)}
						{nonModulableProducts.length > 0 && (
							<ParagraphSB style={styles.productWithoutModulationDetails}>
								{t("components.modulationReportCard.noModulable", {
									count: nonModulableProducts.length,
								})}
							</ParagraphSB>
						)}
					</View>
					{modalEnabled && <HygoIcons.ChevronRight width={24} height={24} fill={COLORS.LAKE[100]} />}
				</TouchableOpacity>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	cardBody: {
		marginTop: 16,
		backgroundColor: COLORS.NIGHT[5],
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 4,
	},
	header: {
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
	},
	title: {
		marginLeft: 8,
	},
	separator: {
		height: 4,
	},
	sidesWrapper: {
		alignItems: "center",
		flexDirection: "row",
	},
	productModulationDetails: {
		color: COLORS.LAKE[100],
	},
	productWithoutModulationDetails: {
		color: COLORS.NIGHT[50],
	},
});

export default ModulationReportCard;
