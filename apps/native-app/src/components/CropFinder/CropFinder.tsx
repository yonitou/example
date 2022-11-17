import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import HygoIcons from "@Icons/HygoIcons";
import COLORS from "@Constants/palette";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import { cropType } from "@Types/crop.types";
import Input from "../Input";
import CropCard from "./components/CropCard";

interface CropsFinderProps {
	crops: cropType[];
	onPress: (c: cropType) => void;
}

const CropFinder = ({ crops, onPress }: CropsFinderProps): JSX.Element => {
	const { control, watch } = useForm();
	const { t } = useTranslation();
	const value = watch("crop-finder") ?? "";
	const searchedCrops: cropType[] = crops
		.filter((c) => c.name.toLowerCase().match(value.toLowerCase()))
		.sort((it1, it2) => t(`crops.${it1.name}`).localeCompare(t(`crops.${it2.name}`)));

	return (
		<>
			<Input
				containerStyle={styles.inputContainer}
				control={control}
				name="crop-finder"
				autoCapitalize="words"
				clearable
				icon={<HygoIcons.MagnifyingGlass height={24} width={24} fill={COLORS.NIGHT[50]} />}
				placeholder={t("components.cropFinder.placeholder")}
			/>

			<FlatList
				style={styles.flatListWrapper}
				data={searchedCrops}
				keyboardShouldPersistTaps="handled"
				ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
				ListFooterComponent={() => <View style={styles.listSeparator} />}
				keyExtractor={(item) => item.id.toString()}
				showsVerticalScrollIndicator={false}
				removeClippedSubviews
				renderItem={({ item }) => {
					return <CropCard crop={item} onPress={onPress} />;
				}}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	flatListWrapper: {
		marginTop: 16,
	},
	inputContainer: {
		marginHorizontal: HORIZONTAL_PADDING,
	},
	listSeparator: {
		height: 4,
	},
});

export default CropFinder;
