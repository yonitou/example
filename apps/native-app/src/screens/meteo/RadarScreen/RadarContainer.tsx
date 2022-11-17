import RadarScreen from "./RadarScreen";
import { RadarContainerProps } from "./screen.types";

const RadarContainer = ({ navigation }: RadarContainerProps): JSX.Element => {
	const onNavBack = (): void => navigation.goBack();

	return <RadarScreen onNavBack={onNavBack} />;
};

export default RadarContainer;
