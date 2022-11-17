import { Image, View, StyleSheet } from "react-native";
import { nozzleFamilyEnum } from "@Types/nozzle.types";
import standardNozzle from "@Assets/equipment/standard.png";
import injectionNozzle from "@Assets/equipment/injection.png";
import lowPressureNozzle from "@Assets/equipment/low-pressure.png";
import calibrateNozzle from "@Assets/equipment/calibrate.png";

interface NozzleFamilyImageProps {
	family: nozzleFamilyEnum;
}
const NozzleFamilyImage = ({ family }: NozzleFamilyImageProps): JSX.Element => {
	const getImage = (nozzlefamily: nozzleFamilyEnum): JSX.Element => {
		switch (nozzlefamily) {
			case nozzleFamilyEnum.STANDARD:
				return <Image source={standardNozzle} style={styles.image} />;
			case nozzleFamilyEnum.INJECTION:
				return <Image source={injectionNozzle} style={styles.image} />;
			case nozzleFamilyEnum.LOW_PRESSURE:
				return <Image source={lowPressureNozzle} style={styles.image} />;
			case nozzleFamilyEnum.CALIBRATE:
				return <Image source={calibrateNozzle} style={styles.image} />;
			default:
				return <Image source={standardNozzle} style={styles.image} />;
		}
	};

	return <View>{getImage(family)}</View>;
};

const styles = StyleSheet.create({
	image: {
		width: 45,
		height: 45,
	},
});

export default NozzleFamilyImage;
