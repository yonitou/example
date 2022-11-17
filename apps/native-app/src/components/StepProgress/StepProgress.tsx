import { StyleSheet, View } from "react-native";
import HygoIcons from "@Icons/HygoIcons";
import COLORS from "@Constants/palette";
import Title from "@Components/Title";
import { Fragment } from "react";

interface StepProgressProps {
	title: string;
	step: 1 | 2 | 3;
	totalSteps: 1 | 2 | 3;
}
const StepProgress = ({ step, title, totalSteps }: StepProgressProps): JSX.Element => {
	return (
		<View style={styles.headerBody}>
			<View style={styles.stepper}>
				{Array.from({ length: totalSteps }).map((_, index, arr) => {
					const key = `key-${index}`;

					return (
						<Fragment key={key}>
							{step === index + 1 ? (
								<HygoIcons.WaterFill fill={COLORS.TANGERINE[100]} width={16} height={16} />
							) : (
								<HygoIcons.CircleContained
									fill={step > index + 1 ? COLORS.TANGERINE[100] : COLORS.NIGHT[25]}
									width={6.5}
									height={6.5}
								/>
							)}
							{index < arr.length - 1 && (
								<HygoIcons.Line
									stroke={step > index + 1 ? COLORS.TANGERINE[100] : COLORS.NIGHT[25]}
									style={styles.iconLine}
									width={32}
									height={1}
								/>
							)}
						</Fragment>
					);
				})}
			</View>
			<Title style={styles.headerTitle}>{title}</Title>
		</View>
	);
};

const styles = StyleSheet.create({
	headerBody: {
		alignItems: "center",
	},
	headerTitle: {
		marginTop: 4,
	},
	stepper: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	iconLine: {
		marginHorizontal: 5,
	},
});

export default StepProgress;
