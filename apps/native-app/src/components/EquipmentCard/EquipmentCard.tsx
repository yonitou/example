import { StyleSheet, View } from "react-native";
import HygoIcons from "@Icons/HygoIcons";
import COLORS from "@Constants/palette";
import Title from "@Components/Title";

interface EquipmentCardProps {
	icon: JSX.Element;
	label: string;
	checked?: boolean;
	disabled?: boolean;
	withCheckIcon?: boolean;
	children?: JSX.Element;
	withMarginBottom?: boolean;
}

const EquipmentCard = ({
	icon,
	label,
	checked,
	disabled,
	children,
	withCheckIcon = true,
	withMarginBottom = true,
}: EquipmentCardProps): JSX.Element => {
	const containerOpacity = disabled ? 0.5 : 1;
	const marginBottom = withMarginBottom ? 16 : 0;
	return (
		<View style={[styles.container, { opacity: containerOpacity, marginBottom }]}>
			<View style={styles.header}>
				<View style={styles.titleWrapper}>
					{icon}
					<Title style={styles.title}>{label}</Title>
				</View>

				{withCheckIcon && (
					<HygoIcons.CheckContained
						width={24}
						height={24}
						fill={checked ? COLORS.LAKE[100] : COLORS.NIGHT[10]}
					/>
				)}
			</View>
			<View>{children}</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.WHITE[100],
		borderRadius: 4,
		padding: 8,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 8,
	},
	title: {
		marginLeft: 8,
		color: COLORS.LAKE[100],
	},
	titleWrapper: {
		alignItems: "center",
		flexDirection: "row",
	},
});

export default EquipmentCard;
