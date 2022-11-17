import { useTranslation } from "react-i18next";
import { FlatList } from "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";
import SafeArea from "@Components/SafeArea";
import HygoIcons from "@Icons/HygoIcons";
import { globalConditionType } from "@Types/condition.types";
import COLORS from "@Constants/palette";
import Title from "@Components/Title";
import ParagraphLight from "@Components/ParagraphLight";
import BaseButton from "@Components/BaseButton";
import Modal, { ModalPropsType } from "./Modal";

export interface ParamsHelperModalPropsType extends ModalPropsType {
	explicabilityKeys: Array<keyof globalConditionType>;
}

const ParamsHelperModal = ({ modalVisible, hideModal, explicabilityKeys }: ParamsHelperModalPropsType): JSX.Element => {
	const { t } = useTranslation();
	const keyToIcon: Record<keyof globalConditionType, JSX.Element> = {
		RCond: <HygoIcons.Rain fill={COLORS.LAKE[100]} width={24} height={24} style={styles.icon} />,
		RFertiCond: <HygoIcons.Rain fill={COLORS.LAKE[100]} width={24} height={24} style={styles.icon} />,
		DTCond: <HygoIcons.Temperature fill={COLORS.LAKE[100]} width={24} height={24} style={styles.icon} />,
		windCond: <HygoIcons.Wind fill={COLORS.LAKE[100]} width={24} height={24} style={styles.icon} />,
		absorption: <HygoIcons.WaterFill fill={COLORS.LAKE[100]} width={24} height={24} style={styles.icon} />,
		rosee: <HygoIcons.WaterFill fill={COLORS.LAKE[100]} width={24} height={24} style={styles.icon} />,
		humiCond: <HygoIcons.WaterFill fill={COLORS.LAKE[100]} width={24} height={24} style={styles.icon} />,
		insect: <HygoIcons.Insect fill={COLORS.LAKE[100]} width={24} height={24} style={styles.icon} />,
		growingTime: <HygoIcons.Meadow fill={COLORS.LAKE[100]} width={24} height={24} style={styles.icon} />,
		humiSoilCond: <HygoIcons.WaterFill fill={COLORS.LAKE[100]} width={24} height={24} style={styles.icon} />,
		uv: <HygoIcons.Weather fill={COLORS.LAKE[100]} width={24} height={24} style={styles.icon} />,
		tempCond: <HygoIcons.Temperature fill={COLORS.LAKE[100]} width={24} height={24} style={styles.icon} />,
		thermalRisk: <HygoIcons.Temperature fill={COLORS.LAKE[100]} width={24} height={24} style={styles.icon} />,
		turbCond: <HygoIcons.Wind fill={COLORS.LAKE[100]} width={24} height={24} style={styles.icon} />,
		tempFertiCond: <HygoIcons.Temperature fill={COLORS.LAKE[100]} width={24} height={24} style={styles.icon} />,
		targetCond: <HygoIcons.Insect fill={COLORS.LAKE[100]} width={24} height={24} style={styles.icon} />,
		globalCond: null,
		timestamp: null,
	};

	return (
		<Modal title={t("modals.paramsHelper.title")} modalVisible={modalVisible} hideModal={hideModal} modalFlex={4}>
			<SafeArea withBottomPadding={false}>
				<FlatList
					data={explicabilityKeys}
					showsVerticalScrollIndicator={false}
					ItemSeparatorComponent={() => <View style={styles.flatListSeparator} />}
					keyExtractor={(item) => item}
					renderItem={({ item }) => {
						return (
							<>
								<View style={styles.titleWrapper}>
									{keyToIcon[item]}
									<Title>{t(`explicability.${item}.label`)}</Title>
								</View>
								<ParagraphLight>{t(`explicability.${item}.description`)}</ParagraphLight>
							</>
						);
					}}
				/>
				<BaseButton color={COLORS.LAKE} onPress={hideModal} style={styles.button}>
					{t("common.button.understood")}
				</BaseButton>
			</SafeArea>
		</Modal>
	);
};

const styles = StyleSheet.create({
	icon: {
		marginRight: 8,
	},
	titleWrapper: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 8,
	},
	flatListSeparator: {
		height: 16,
	},
	button: {
		marginTop: 35,
	},
});

export default ParamsHelperModal;
