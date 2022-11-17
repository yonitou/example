import { useState } from "react";
import * as Updates from "expo-updates";
import NewUpdateScreen from "./NewUpdateScreen";
import { NewUpdateContainerProps } from "./screen.types";

const NewUpdateContainer = ({ onError }: NewUpdateContainerProps): JSX.Element => {
	const [updating, setUpdating] = useState(false);
	const doUpdate = async (): Promise<void> => {
		setUpdating(true);
		try {
			const { isNew } = await Updates.fetchUpdateAsync();
			if (isNew) await Updates.reloadAsync();
			else {
				onError();
				setUpdating(false);
			}
		} catch (e) {
			onError();
			setUpdating(false);
		}
	};

	return <NewUpdateScreen updating={updating} doUpdate={doUpdate} />;
};

export default NewUpdateContainer;
