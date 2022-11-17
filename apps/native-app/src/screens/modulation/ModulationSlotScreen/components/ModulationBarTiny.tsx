import { StyleSheet, View } from "react-native";
import { conditionEnum } from "@Types/condition.types";
import { computeColorFromConditions } from "@Constants/palette";

const NUM_ITEMS = 24;

interface ModulationBarTinyProps {
	sizes: conditionEnum[];
}

const ModulationBarTiny = ({ sizes }: ModulationBarTinyProps): JSX.Element => {
	return (
		<View style={styles.container}>
			{[...Array(NUM_ITEMS).keys()].map((i) => {
				const isLast = i === [...Array(NUM_ITEMS).keys()].length - 1;
				const marginRight = isLast ? 0 : 0.5;
				return (
					<View
						key={i}
						style={[
							styles.item,
							{
								backgroundColor: computeColorFromConditions(sizes?.[i]),
								marginRight,
							},
						]}
					/>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		width: "100%",
		height: 12,
	},
	item: {
		flex: 1,
	},
});

export default ModulationBarTiny;
