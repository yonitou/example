import { StyleSheet, View, Image, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import { Camera } from "expo-camera";
import ConditionalWrapper from "@Components/ConditionalWrapper";
import Spinner from "@Components/Spinner";
import HygoIcons from "@Icons/HygoIcons";
import Title from "@Components/Title";
import ErrorComponent from "@Components/ErrorComponent";
import COLORS, { GRADIENTS } from "@Constants/palette";
import Header from "@Components/Header";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import barCodeImage from "@Assets/authentication/barcode.png";
import SwitchButton from "@Components/SwitchButton";
import { BarCodeScreenProps } from "./screen.types";
import OTPInput from "./components/OTPInput";

const BarCodeScreen = ({
	hasCameraPermission,
	scanned,
	tokenLoading,
	codeError,
	manual,
	getPermissionsAsync,
	handleBarCodeScanned,
	toggleManualInput,
	retryScan,
	onGoBack,
	codeFromScan,
	hasConnection,
	codeWith8Chars,
	setCodeWith8Chars,
}: BarCodeScreenProps): JSX.Element => {
	const { t } = useTranslation();
	const hasError = scanned && codeError;

	if (!hasConnection)
		return (
			<ErrorComponent
				icon={<HygoIcons.NoNetworkDrop fill={COLORS.LAKE[100]} />}
				title={t("screens.error.noNetwork.title")}
				description={t("screens.error.noNetwork.description")}
				retryButton={false}
			/>
		);
	return (
		<>
			{hasCameraPermission === false && (
				<ErrorComponent
					icon={<HygoIcons.SadDrop colors={GRADIENTS.LAKE_GRAD} />}
					title={t("screens.error.noCameraPermissions.title")}
					description={t("screens.error.noCameraPermissions.description")}
					onClick={getPermissionsAsync}
				/>
			)}

			{hasCameraPermission && (
				<Camera
					onBarCodeScanned={scanned || tokenLoading ? undefined : handleBarCodeScanned}
					style={StyleSheet.absoluteFill}
				>
					<View style={styles.header}>
						<Header
							backgroundColor="transparent"
							textStyle={styles.text}
							title={t("screens.barcode.title")}
							onBackPress={onGoBack}
						/>
						<View style={styles.barCodeNoticeWrapper}>
							<Image source={barCodeImage} style={styles.barCodeNoticePicto} />
							<Title style={styles.barCodeNotice}>{t("screens.barcode.helper")}</Title>
						</View>
					</View>
					{!manual && (
						<View style={styles.centerWrapper}>
							<View style={styles.centerSides} />
							<View style={styles.centerMiddleSquare}>{tokenLoading && <Spinner />}</View>
							<View style={styles.centerSides} />
						</View>
					)}

					<View style={styles.OTPInputWrapper}>
						<ConditionalWrapper
							condition={!manual}
							wrapper={(children) => (
								<TouchableOpacity activeOpacity={1} onPress={toggleManualInput}>
									{children}
								</TouchableOpacity>
							)}
						>
							<>
								<OTPInput
									error={hasError}
									success={false}
									pinCount={codeWith8Chars ? 8 : 6}
									selectionColor={COLORS.NIGHT[100]}
									focus={manual}
									editable={!hasError}
									noticeStyle={styles.inputNotice}
									handleInputFilled={(value) => handleBarCodeScanned({ data: value })}
									errorNotice={t("screens.barcode.error")}
									successNotice={t("screens.barcode.success")}
									handlePress={manual && retryScan}
									buttonText={manual && t("screens.barcode.button")}
									data={!manual && codeFromScan}
								/>
								<View style={styles.switchButtonWrapper}>
									<SwitchButton
										value={codeWith8Chars}
										onValueChange={setCodeWith8Chars}
										title={t("screens.barcode.switchLabel")}
										textStyle={styles.switchLabel}
									/>
								</View>
							</>
						</ConditionalWrapper>

						{manual && tokenLoading && <Spinner />}
					</View>
				</Camera>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	header: {
		backgroundColor: COLORS.NIGHT[50],
	},

	barCodeNoticeWrapper: {
		flexDirection: "row",
		paddingHorizontal: HORIZONTAL_PADDING,
		alignItems: "center",
		marginBottom: 16,
	},
	switchLabel: {
		color: COLORS.WHITE[100],
	},
	barCodeNotice: {
		flex: 1,
		color: COLORS.WHITE[100],
	},
	inputNotice: {
		color: COLORS.WHITE[100],
		marginTop: 16,
		textAlign: "center",
	},
	switchButtonWrapper: {
		marginTop: 16,
	},
	text: {
		color: COLORS.WHITE[100],
	},

	barCodeNoticePicto: {
		width: 85,
		height: 75,
		marginRight: 16,
	},
	centerWrapper: {
		height: 270,
		flexDirection: "row",
		backgroundColor: "transparent",
	},
	centerSides: {
		backgroundColor: COLORS.NIGHT[50],
		flex: 1,
	},
	centerMiddleSquare: {
		width: Dimensions.get("window").width - 100,
	},
	OTPInputWrapper: {
		paddingTop: 50,
		backgroundColor: COLORS.NIGHT[50],
		flex: 1,
		paddingHorizontal: HORIZONTAL_PADDING,
	},
});

export default BarCodeScreen;
