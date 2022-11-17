import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import { activeProductType, productStatusEnum } from "@Types/activeProduct.types";
import COLORS from "@Constants/palette";

import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import { FlatList } from "react-native-gesture-handler";
import Title from "@Components/Title";
import SwitchButton from "@Components/SwitchButton";
import BaseButton from "@Components/BaseButton";
import Modal, { ModalPropsType } from "./Modal";

export interface ProductsModulationModalPropsType extends ModalPropsType {
	selectedProducts: activeProductType[];
	onConfirm: (products: activeProductType[]) => void;
	showModalSwitchBtns: boolean;
}

const ProductsModulationModal = ({
	modalVisible,
	selectedProducts,
	onConfirm,
	showModalSwitchBtns,
	hideModal,
}: ProductsModulationModalPropsType): JSX.Element => {
	const { t } = useTranslation();
	const [products, setProducts] = useState<activeProductType[]>([]);

	useEffect(() => {
		setProducts(selectedProducts);
	}, [selectedProducts]);

	const onSwitchPress = (activeModulation: boolean, id: number): void => {
		const newProducts = products.map((p) => (p.id === id ? { ...p, modulationActive: activeModulation } : p));
		setProducts(newProducts);
	};

	const handleConfirm = (): void => {
		hideModal();
		onConfirm && onConfirm(products);
	};

	const modulableProducts = products.filter((p) => p.modulationStatus === productStatusEnum.MODULABLE);

	return (
		<Modal modalVisible={modalVisible} hideModal={hideModal}>
			<View style={styles.container}>
				<FlatList
					showsVerticalScrollIndicator={false}
					data={modulableProducts}
					keyExtractor={(item) => item.id.toString()}
					ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
					renderItem={({ item }) => {
						return (
							<View style={styles.productContainer}>
								<Title>
									{item.name.toUpperCase()} ({item?.modulation?.toFixed(0)}
									{t("common.units.percentage")})
								</Title>
								{showModalSwitchBtns && (
									<SwitchButton
										value={item.modulationActive}
										onValueChange={(v) => onSwitchPress(v, item.id)}
									/>
								)}
							</View>
						);
					}}
				/>
				<BaseButton
					onPress={showModalSwitchBtns ? handleConfirm : hideModal}
					color={COLORS.LAKE}
					style={styles.btn}
				>
					{t("common.button.confirm")}
				</BaseButton>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: HORIZONTAL_PADDING,
	},
	productContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	btn: {
		marginTop: 16,
	},
	itemSeparator: {
		height: 16,
	},
});

export default ProductsModulationModal;
