import React from "react";
import COLORS from "@Constants/palette";
import { View, StyleSheet } from "react-native";
import { SvgProps } from "react-native-svg";
import Title from "@Components/Title";
import { TourGuideZone } from "rn-tourguide";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

interface MainFlowButtonProps {
	onPress: () => void;
	InnerIcon: React.FC<SvgProps>;
	tourText: string;
	tourZone: number;
	colors: string[];
	title: string;
	disabled: boolean;
	xStart: number;
	xEnd: number;
}

const MainFlowButton = ({
	onPress,
	InnerIcon,
	disabled,
	tourText,
	colors,
	title,
	xStart,
	xEnd,
	tourZone,
}: MainFlowButtonProps): JSX.Element => {
	return (
		<View style={styles.container}>
			<TourGuideZone zone={tourZone} text={tourText}>
				<TouchableOpacity onPress={onPress} disabled={disabled}>
					<LinearGradient
						colors={colors}
						style={styles.btn}
						start={{ x: xStart, y: 0 }}
						end={{ x: xEnd, y: 1 }}
						locations={[0.03, 1]}
					>
						<InnerIcon fill={COLORS.WHITE[100]} height={24} width={24} />
						<Title style={styles.text}>{title}</Title>
					</LinearGradient>
				</TouchableOpacity>
			</TourGuideZone>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	btn: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		paddingVertical: 16,
	},
	text: {
		marginLeft: 8,
		color: COLORS.WHITE[100],
	},
});

export default MainFlowButton;
