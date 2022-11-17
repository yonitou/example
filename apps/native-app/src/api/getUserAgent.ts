import { Platform } from "react-native";
import * as Device from "expo-device";
import Constants from "expo-constants";

const getUserAgent = (): string => {
	switch (Platform.OS) {
		case "ios":
			return `HygoApp/${Constants.manifest.extra.version} ${Device.osName}/${Device.osVersion} ${Device.deviceName}`;

		case "android":
			return `HygoApp/${Constants.manifest.extra.version} Android/${Device.platformApiLevel} ${Device.manufacturer}/${Device.modelName} ${Device.deviceName}`;

		default:
			return `HygoApp/${Constants.manifest.extra.version} ${Device.osName}/${Device.osVersion} ${Device.deviceName}`;
	}
};

export default getUserAgent;
