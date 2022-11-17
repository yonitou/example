import { useEffect, useState, useContext, useCallback } from "react";
import { Camera } from "expo-camera";
import { signInWithBarCode } from "@Api/hygoApi";
import { AuthContext } from "@Context/AuthContext";
import BarCodeScreen from "./BarCodeScreen";
import { BarCodeContainerProps } from "./screen.types";

const BarCodeContainer = ({ navigation }: BarCodeContainerProps): JSX.Element => {
	const [hasCameraPermission, setHasCameraPermission] = useState<boolean>();
	const [scanned, setScanned] = useState<boolean>(false);
	const [tokenLoading, setTokenLoading] = useState<boolean>(false);
	const [codeError, setCodeError] = useState<boolean>(false);
	const [manual, setManual] = useState<boolean>(false);
	const [codeFromScan, setCodeFromScan] = useState<string>();
	const [codeWith8Chars, setCodeWith8Chars] = useState<boolean>(true);

	const { login, hasConnection } = useContext(AuthContext);

	const onGoBack = (): void => navigation.goBack();

	const toggleManualInput = (): void => {
		setManual(!manual);
		setScanned(false);
	};

	const retryScan = (): void => {
		setScanned(false);
		setManual(false);
		setCodeFromScan("");
	};

	const handleBarCodeScanned = useCallback(
		async ({ data }: { data: string }): Promise<void> => {
			setCodeFromScan(data);
			setTokenLoading(true);
			try {
				const token = await signInWithBarCode(data);
				if (token) await login(token, data);
			} catch (error) {
				setCodeError(true);
				setTokenLoading(false);
				setScanned(true);
				!manual &&
					setTimeout(() => {
						setScanned(false);
						setCodeFromScan(null);
					}, 2000);

				if (error?.response?.status !== 401) throw error;
			}
		},
		[login, manual]
	);

	const getPermissionsAsync = useCallback(async (): Promise<void> => {
		const response = await Camera.requestCameraPermissionsAsync();
		setHasCameraPermission(response?.status === "granted");
	}, []);

	useEffect(() => {
		getPermissionsAsync();
	}, [getPermissionsAsync]);

	return (
		<BarCodeScreen
			retryScan={retryScan}
			toggleManualInput={toggleManualInput}
			getPermissionsAsync={getPermissionsAsync}
			handleBarCodeScanned={handleBarCodeScanned}
			setCodeWith8Chars={setCodeWith8Chars}
			codeWith8Chars={codeWith8Chars}
			hasCameraPermission={hasCameraPermission}
			scanned={scanned}
			tokenLoading={tokenLoading}
			codeError={codeError}
			manual={manual}
			onGoBack={onGoBack}
			codeFromScan={codeFromScan}
			hasConnection={hasConnection}
		/>
	);
};

export default BarCodeContainer;
