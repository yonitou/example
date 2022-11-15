import { components, ValueContainerProps } from "react-select";
import CropIcon from "@Components/CropIcon";
import { COLORS } from "@Constants/palette";
import { useContext } from "react";
import { UserContext } from "@Context/UserContext";

const ValueContainer = ({ children, ...props }: ValueContainerProps): JSX.Element => {
	const { crops } = useContext(UserContext);
	const crop = crops.find(
		(c) => c.id.toString() === (props.getValue()?.[0] as { value: string; label: string })?.value
	);
	return (
		// eslint-disable-next-line
		<components.ValueContainer {...props}>
			<CropIcon crop={crop} fill={COLORS.NIGHT[100]} /> {children}
		</components.ValueContainer>
	);
};

export default ValueContainer;
