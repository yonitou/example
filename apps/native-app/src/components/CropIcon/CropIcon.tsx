import { StyleSheet } from "react-native";
import { cropType } from "@Types/crop.types";
import { SvgXml } from "react-native-svg";

interface CropIconProps {
	crop: cropType;
	fill: string;
	width?: number;
	height?: number;
}

const CropIcon = ({ crop, fill, width = 24, height = 24 }: CropIconProps): JSX.Element => {
	if (!crop?.svg) return null;
	return <SvgXml xml={crop.svg} fill={fill} width={width} height={height} style={styles.icon} />;
};

const styles = StyleSheet.create({
	icon: {
		marginRight: 8,
	},
});

export default CropIcon;
