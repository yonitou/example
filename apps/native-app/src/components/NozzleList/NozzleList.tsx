import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import HygoIcons from "@Icons/HygoIcons";
import { nozzleType } from "@Types/nozzle.types";
import { textReducer } from "@Utils/hygoUtils";
import COLORS, { NOZZLE_COLORS } from "@Constants/palette";
import CircularButton from "@Components/CircularButton";

export interface NozzleListProps {
	nozzles: nozzleType[];
	onPressAdd: () => void;
	onPressNozzle: (n: nozzleType) => void;
}
const NozzleList = ({ nozzles, onPressAdd, onPressNozzle }: NozzleListProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<FlatList
			data={nozzles}
			horizontal
			showsHorizontalScrollIndicator={false}
			ListHeaderComponent={() => (
				<View style={styles.addBtnContainer}>
					<CircularButton onPress={onPressAdd} title={t("components.nozzleList.newNozzle")} large={false}>
						<HygoIcons.Add fill={COLORS.LAKE[100]} width={27} height={27} />
					</CircularButton>
				</View>
			)}
			ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
			keyExtractor={(item) => item.id.toString()}
			renderItem={({ item }) => {
				return (
					<CircularButton
						onPress={() => onPressNozzle(item)}
						title={textReducer(item?.name, 10)}
						large={false}
					>
						<HygoIcons.Nozzle fill={NOZZLE_COLORS[item.color]} width={24} height={30} />
					</CircularButton>
				);
			}}
		/>
	);
};

const styles = StyleSheet.create({
	addBtnContainer: {
		marginRight: 24,
	},
	listSeparator: {
		width: 24,
	},
});

export default NozzleList;
