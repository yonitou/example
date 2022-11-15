import { useContext } from "react";
import { components, ControlProps } from "react-select";
import { ModalsContext } from "@Context/ModalContext";
import { UserContext } from "@Context/UserContext";

const Control = (props: ControlProps): JSX.Element => {
	const { defaultFarm } = useContext(UserContext);
	const { setFarmCreateModalProps } = useContext(ModalsContext);
	const onClick = (): void => {
		if (!defaultFarm)
			setFarmCreateModalProps({
				visibility: true,
				props: {},
			});
	};

	return (
		<div onClick={onClick} tabIndex={0} role="button" onKeyDown={onClick}>
			{/* eslint-disable-next-line */}
			<components.Control {...props} />
		</div>
	);
};

export default Control;
