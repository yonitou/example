import COLORS from "@Constants/palette";
import HygoIcons from "@Icons/HygoIcons";
import { useEffect, useState } from "react";

import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface AccordionProps {
	summary: JSX.Element;
	children: JSX.Element | JSX.Element[];
	chevronColor: string;
	opened?: boolean;
	containerStyle?: StyleProp<ViewStyle>;
	onOpen?: () => void;
}

const Accordion = ({
	summary,
	children,
	chevronColor,
	opened,
	containerStyle,
	onOpen,
}: AccordionProps): JSX.Element => {
	const [open, setOpen] = useState(opened);

	const marginBottom = open ? 16 : 0;
	const chevronAngle = open ? 90 : 0;

	const onClick = (): void => {
		setOpen(!open);
		if (!open) onOpen && onOpen();
	};

	useEffect(() => {
		setOpen(opened);
	}, [opened]);

	return (
		<View style={[styles.container, containerStyle]}>
			<TouchableOpacity style={[styles.accordionTitle, { marginBottom }]} onPress={onClick} activeOpacity={1}>
				{summary}
				<HygoIcons.ChevronRight
					width={24}
					height={24}
					fill={chevronColor}
					style={{ transform: [{ rotate: `${chevronAngle}deg` }] }}
				/>
			</TouchableOpacity>
			{open && children}
		</View>
	);
};

const styles = StyleSheet.create({
	accordionTitle: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	container: {
		backgroundColor: COLORS.WHITE[100],
	},
});

export default Accordion;
