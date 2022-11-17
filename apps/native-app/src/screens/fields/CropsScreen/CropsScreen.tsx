import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import Header from "@Components/Header";
import { GRADIENTS } from "@Constants/palette";
import CropFinder from "@Components/CropFinder";
import Spinner from "@Components/Spinner";
import { CropsScreenProps } from "./screen.types";

const CropsScreen = ({ crops, onNavBack, onSelectCrop, onGoHome, loading }: CropsScreenProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<LinearGradient colors={GRADIENTS.BACKGROUND_2} style={styles.container}>
			<Header
				title={t("screens.crops.title")}
				onBackPress={onNavBack}
				onCancelPress={onGoHome}
				backgroundColor="transparent"
				subtitle={t("screens.crops.subtitle")}
			/>
			{loading ? <Spinner /> : <CropFinder crops={crops} onPress={onSelectCrop} />}
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default CropsScreen;
