import { Modal as NativeModal, StyleSheet, View, TouchableOpacity } from "react-native";
import COLORS from "@Constants/palette";
import Title from "@Components/Title";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HORIZONTAL_PADDING, VERTICAL_PADDING } from "@Constants/styleValues";
import KeyboardShift from "@Components/KeyboardShift";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export interface ModalPropsType {
	title?: string;
	children?: JSX.Element | JSX.Element[];
	modalVisible?: boolean;
	modalFlex?: number;
	hideModal?: () => void;
	icon?: JSX.Element;
	customTitle?: JSX.Element;
	withBackdrop?: boolean;
}

const Modal = ({
	modalVisible,
	hideModal,
	title,
	children,
	icon,
	modalFlex,
	withBackdrop = true,
	customTitle,
}: ModalPropsType): JSX.Element => {
	const marginLeftTitle = icon ? 8 : 0;
	const { bottom } = useSafeAreaInsets();
	const paddingBottom = Math.max(VERTICAL_PADDING, bottom);

	return (
		<>
			<View style={[withBackdrop ? styles.backdrop : null, modalVisible && StyleSheet.absoluteFill]} />
			<NativeModal animationType="slide" transparent visible={modalVisible} onRequestClose={hideModal}>
				<KeyboardShift style={styles.keyboardShift}>
					<TouchableOpacity onPress={hideModal} style={styles.touchableOpacityView} />
					<View style={{ flex: modalFlex, ...styles.modalView, paddingBottom }}>
						<GestureHandlerRootView style={{ flex: modalFlex }}>
							{customTitle ??
								(title && (
									<View style={styles.titleWrapper}>
										{icon}
										<Title style={{ marginLeft: marginLeftTitle }}>{title}</Title>
									</View>
								))}

							{children}
						</GestureHandlerRootView>
					</View>
				</KeyboardShift>
			</NativeModal>
		</>
	);
};

const styles = StyleSheet.create({
	keyboardShift: {
		flex: 1,
	},
	backdrop: {
		backgroundColor: COLORS.NIGHT[50],
	},
	modalView: {
		borderTopRightRadius: 16,
		paddingTop: 16,
		borderTopLeftRadius: 16,
		backgroundColor: COLORS.WHITE[100],
	},
	touchableOpacityView: {
		flex: 1,
	},
	titleWrapper: {
		paddingHorizontal: HORIZONTAL_PADDING,
		paddingBottom: 16,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default Modal;
