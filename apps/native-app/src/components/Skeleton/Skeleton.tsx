import { useEffect } from "react";
import { View, StyleSheet, Animated, Easing, StyleProp, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);

interface SkeletonProps {
	style?: StyleProp<ViewStyle>;
	width: number;
	height: number;
}

const Skeleton = ({ style, width, height }: SkeletonProps): JSX.Element => {
	const animatedValue = new Animated.Value(0);

	useEffect(() => {
		Animated.loop(
			Animated.timing(animatedValue, {
				toValue: 1,
				duration: 600,
				easing: Easing.linear,
				useNativeDriver: true,
			})
		).start();
	});

	const translateX = animatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: [-width * 2, width * 2],
	});

	return (
		<View style={[styles.container, { width, height }, style]}>
			<AnimatedLG
				colors={[
					"hsla(190, 14%, 91%, 1)",
					"hsla(180, 13%, 95%, 1)",
					"hsla(180, 13%, 95%, 1)",
					"hsla(190, 14%, 91%, 1)",
				]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				style={{
					...StyleSheet.absoluteFillObject,
					transform: [{ translateX }],
				}}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		overflow: "hidden",
		backgroundColor: "hsla(190, 14%, 91%, 1)",
		borderRadius: 4,
	},
});

export default Skeleton;
