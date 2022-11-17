import { useContext } from "react";
import Constants from "expo-constants";
import * as Updates from "expo-updates";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "@Context/AuthContext";
import { UserContext } from "@Context/UserContext";
import { SettingsContainerProps } from "./screen.types";
import SettingsScreen from "./SettingsScreen";

const SettingsContainer = ({ navigation }: SettingsContainerProps): JSX.Element => {
	const onNavBack = (): void => navigation.goBack();
	const { admin } = useContext(AuthContext);
	const { hveMode, updateHveMode } = useContext(UserContext);

	const onDeleteLocalData = async (): Promise<void> => {
		await AsyncStorage.clear();
		Updates.reloadAsync();
	};

	return (
		<SettingsScreen
			onNavBack={onNavBack}
			hveMode={hveMode}
			updateHveMode={updateHveMode}
			admin={admin}
			onDeleteLocalData={onDeleteLocalData}
			appEnv={Constants.manifest.extra.appEnv}
		/>
	);
};

export default SettingsContainer;
