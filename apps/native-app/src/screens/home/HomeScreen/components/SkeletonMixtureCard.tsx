import { View, StyleSheet, Dimensions } from "react-native";
import Skeleton from "@Components/Skeleton";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";

const SkeletonMixtureCard = (): JSX.Element => {
	return (
		<>
			<View style={styles.topContainer}>
				<Skeleton height={40} width={120} />
				<View style={styles.smallSkeletonsContainer}>
					<Skeleton height={50} width={50} />
					<Skeleton height={50} width={50} style={styles.withMargin} />
					<Skeleton height={50} width={50} />
				</View>
			</View>
			<Skeleton height={60} width={Dimensions.get("window").width - HORIZONTAL_PADDING * 2} />
		</>
	);
};
export default SkeletonMixtureCard;

const styles = StyleSheet.create({
	topContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 8,
	},
	smallSkeletonsContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	withMargin: {
		marginHorizontal: 8,
	},
});
