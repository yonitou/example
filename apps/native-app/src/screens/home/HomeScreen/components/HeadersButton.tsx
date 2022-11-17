import COLORS from "@Constants/palette";
import { TourGuideZone } from "rn-tourguide";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface HeadersButtonProps {
	onPress: () => void;
	icon: JSX.Element;
	tourZone: number;
	size: number;
	tourText: string;
}

const HeadersButton = ({ onPress, icon, tourZone, size, tourText }: HeadersButtonProps): JSX.Element => {
	return (
		<TourGuideZone zone={tourZone} text={tourText} shape="circle">
			<TouchableOpacity style={[styles.button, { width: size, height: size }]} onPress={onPress}>
				{icon}
			</TouchableOpacity>
		</TourGuideZone>
	);
};

export default HeadersButton;

const styles = StyleSheet.create({
	button: {
		borderRadius: 50,
		backgroundColor: COLORS.WHITE[100],
		justifyContent: "center",
		alignItems: "center",
	},
});
