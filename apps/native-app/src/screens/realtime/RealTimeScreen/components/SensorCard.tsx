import ParagraphSB from "@Components/ParagraphSB";
import Title from "@Components/Title";
import COLORS from "@Constants/palette";
import { StyleSheet, View } from "react-native";

interface SensorCardProps {
	title: string;
	description: string;
	Asset: JSX.Element;
}

const SensorCard = ({ title, description, Asset }: SensorCardProps): JSX.Element => {
	return (
		<View style={styles.sensorContainer}>
			{Asset}
			<View style={styles.sensorText}>
				<Title style={styles.sensorTitle}>{title}</Title>
				<ParagraphSB style={styles.sensorDescription}>{description}</ParagraphSB>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	sensorContainer: {
		shadowColor: COLORS.NIGHT[100],
		shadowOffset: {
			width: 0,
			height: 6,
		},
		shadowOpacity: 0.1,
		shadowRadius: 12,
		elevation: 3,
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		padding: 16,
		backgroundColor: COLORS.WHITE[100],
		borderRadius: 8,
	},

	sensorTitle: {
		marginBottom: 2,
	},
	sensorText: {
		marginLeft: 13,
		flex: 1,
	},
	sensorDescription: {
		color: COLORS.NIGHT[50],
	},
});

export default SensorCard;
