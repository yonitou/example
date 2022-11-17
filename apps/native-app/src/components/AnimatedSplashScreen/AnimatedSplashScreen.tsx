import { useCallback, useContext, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { View, StyleSheet, ImageSourcePropType, Image } from "react-native";
import Constants from "expo-constants";
import { useFonts } from "expo-font";
import { useAssets } from "expo-asset";
import nunitoBold from "@Assets/fonts/Nunito-Bold.ttf";
import nunitoSemiBold from "@Assets/fonts/Nunito-SemiBold.ttf";
import nunitoRegular from "@Assets/fonts/Nunito-Regular.ttf";
import avenirBlack from "@Assets/fonts/Avenir-Black.ttf";
import { AuthContext } from "@Context/AuthContext";
import { useTranslation } from "react-i18next";

interface AnimatedSplashScreenProps {
	children: JSX.Element;
	image: ImageSourcePropType;
	imagesList: number[];
}

const AnimatedSplashScreen = ({ children, image, imagesList }: AnimatedSplashScreenProps): JSX.Element => {
	const { ready } = useTranslation();
	const [isAppReady, setAppReady] = useState(false);
	const [loaded] = useFonts({
		"Nunito-Bold": nunitoBold,
		"Nunito-SemiBold": nunitoSemiBold,
		"Nunito-Regular": nunitoRegular,
		"Avenir-Black": avenirBlack,
	});
	const [assets] = useAssets(imagesList);
	const [imageLoaded, setImageLoaded] = useState<boolean>(false);

	const { checkTutorialToken } = useContext(AuthContext);

	const imageResizeMode = Constants.manifest.splash.resizeMode || "contain";

	const onRessourcesLoaded = useCallback(async () => {
		try {
			await SplashScreen.hideAsync();
			await Promise.all([checkTutorialToken()]);
		} finally {
			setAppReady(true);
		}
	}, [checkTutorialToken]);

	useEffect(() => {
		if (loaded && ready && assets && imageLoaded) onRessourcesLoaded();
	}, [imageLoaded, assets, loaded, onRessourcesLoaded, ready]);

	return (
		<View style={styles.container}>
			{isAppReady && <View style={styles.container}>{children}</View>}
			{!isAppReady && (
				<View
					pointerEvents="none"
					style={[
						StyleSheet.absoluteFill,
						{
							backgroundColor: Constants.manifest.splash.backgroundColor,
						},
					]}
				>
					<Image
						style={[styles.image, { resizeMode: imageResizeMode }]}
						source={image}
						onLoadEnd={() => setImageLoaded(true)}
					/>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		height: "100%",
		width: "100%",
	},
});

export default AnimatedSplashScreen;
