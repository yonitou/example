import { StyleSheet } from "react-native";
import { SvgXml } from "react-native-svg";
import { targetType } from "@Types/target.types";
import COLORS from "@Constants/palette";

interface TargetIconProps {
	target: targetType;
	fill?: string;
	width?: number;
	height?: number;
}

const TargetIcon = ({ target, fill, width = 24, height = 24 }: TargetIconProps): JSX.Element => {
	if (!target?.svg) return null;
	return (
		<SvgXml xml={target.svg} fill={fill || COLORS.NIGHT[100]} width={width} height={height} style={styles.icon} />
	);
};

const styles = StyleSheet.create({
	icon: {
		marginRight: 8,
	},
});

export default TargetIcon;
