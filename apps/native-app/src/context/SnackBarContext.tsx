import { createContext, useState, useCallback, useMemo } from "react";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Snackbar } from "react-native-paper";
import COLORS from "@Constants/palette";
import Title from "@Components/Title";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { VERTICAL_PADDING } from "@Constants/styleValues";

interface SnackbarContextProps {
	showSnackbar?: (text: string, type: SnackTypeEnum, durationValue?: number) => void;
}
export enum SnackTypeEnum {
	OK = "OK",
	ERROR = "ERROR",
}

export const SnackbarContext = createContext<SnackbarContextProps>({});

const SnackbarProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
	const [snackIsVisible, setSnackIsVisible] = useState<boolean>(false);
	const [snackText, setSnackText] = useState<string>("");
	const [snackType, setSnackType] = useState<SnackTypeEnum>();
	const [duration, setDuration] = useState<number>();
	const showSnackbar = useCallback((text: string, type: SnackTypeEnum, durationValue = 3000): void => {
		setSnackIsVisible(false);
		setSnackText(text);
		setSnackType(type);
		setDuration(durationValue);
		setSnackIsVisible(true);
	}, []);

	const value = useMemo(
		(): SnackbarContextProps => ({
			showSnackbar,
		}),
		[showSnackbar]
	);
	const { bottom } = useSafeAreaInsets();

	const position = Math.max(bottom, VERTICAL_PADDING) * 2;
	return (
		<SnackbarContext.Provider value={value}>
			{children}
			<Snackbar
				style={[styles.snackbar, snackStyle[snackType], { bottom: position }]}
				visible={snackIsVisible}
				onDismiss={() => setSnackIsVisible(false)}
				duration={duration}
			>
				<Title style={styles.snackText}>{snackText}</Title>
			</Snackbar>
		</SnackbarContext.Provider>
	);
};

const snackStyle: { [id: string]: StyleProp<ViewStyle> } = {
	OK: { backgroundColor: COLORS.GRASS[100] },
	ERROR: { backgroundColor: COLORS.GASPACHO[100] },
};

const styles = StyleSheet.create({
	snackbar: {
		elevation: 5,
		borderRadius: 4,
	},

	snackText: {
		color: COLORS.WHITE[100],
	},
});

export default SnackbarProvider;
