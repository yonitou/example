import { useContext, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import COLORS from "@Constants/palette";
import BaseButton from "@Components/BaseButton";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import { targetType } from "@Types/target.types";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { UserContext } from "@Context/UserContext";
import ParagraphSB from "@Components/ParagraphSB";
import TargetIcon from "@Components/TargetIcon";
import HygoIcons from "@Icons/HygoIcons";
import Modal, { ModalPropsType } from "./Modal";

export interface TargetSelectorModalPropsType extends ModalPropsType {
	initialTargets: targetType[];
	onSubmit: (targets: targetType[]) => void;
}

const TargetSelectorModal = ({
	modalVisible,
	hideModal,
	initialTargets,
	onSubmit,
}: TargetSelectorModalPropsType): JSX.Element => {
	const { targets } = useContext(UserContext);
	const { t } = useTranslation();
	const [selectedTargets, setSelectedTargets] = useState<targetType[]>(initialTargets || []);

	const flatListRef = useRef<FlatList>();

	const onPress = (): void => {
		onSubmit(selectedTargets);
		hideModal();
	};

	const addTarget = (item: targetType): void => {
		setSelectedTargets((prevTargets) => [...prevTargets.filter((target) => target.id !== item.id), item]);
	};
	const removeTarget = (item: targetType): void => {
		setSelectedTargets((prevTargets) => [...prevTargets.filter((target) => target.id !== item.id)]);
	};

	const initialScrollIndex =
		selectedTargets?.length > 0 ? targets.findIndex((target) => target.id === selectedTargets[0].id) : 0;

	return (
		<Modal title={t("modals.targetSelector.title")} modalVisible={modalVisible} hideModal={hideModal} modalFlex={1}>
			<View style={styles.container}>
				<FlatList
					ref={flatListRef}
					getItemLayout={(_, index) => ({
						length: 40,
						offset: 40 * index,
						index,
					})}
					initialScrollIndex={initialScrollIndex}
					data={targets}
					ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => {
						const selectedTargetIds = selectedTargets?.map((target) => target.id);
						const isSelected = selectedTargetIds?.includes(item.id);
						return (
							<TouchableOpacity
								style={styles.targetWrapper}
								onPress={() => (isSelected ? removeTarget(item) : addTarget(item))}
							>
								{isSelected ? (
									<HygoIcons.RectChecked
										width={24}
										height={24}
										fill={COLORS.LAKE[100]}
										style={styles.checkbox}
									/>
								) : (
									<HygoIcons.RectUnChecked
										width={24}
										height={24}
										fill={COLORS.NIGHT[50]}
										style={styles.checkbox}
									/>
								)}
								<TargetIcon target={item} width={24} height={24} fill={COLORS.NIGHT[100]} />
								<ParagraphSB>{item.name}</ParagraphSB>
							</TouchableOpacity>
						);
					}}
				/>
				<BaseButton color={COLORS.LAKE} onPress={onPress} style={styles.btn}>
					{t("common.button.validate")}
				</BaseButton>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: HORIZONTAL_PADDING,
		flex: 1,
	},
	checkbox: {
		marginRight: 8,
	},
	targetWrapper: {
		flexDirection: "row",
		alignItems: "center",
	},
	listSeparator: {
		height: 16,
	},
	btn: {
		marginTop: 16,
	},
});

export default TargetSelectorModal;
