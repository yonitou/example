import { components, OptionProps } from "react-select";
import { useContext } from "react";
import { UserContext } from "@Context/UserContext";
import CropIcon from "@Components/CropIcon";
import { COLORS } from "@Constants/palette";

const Option = ({ label, data, ...props }: OptionProps): JSX.Element => {
	const { crops } = useContext(UserContext);
	const crop = crops.find((c) => c.id.toString() === (data as { value: string; label: string })?.value);
	return (
		<components.Option {...props} label={label} data={data}>
			<CropIcon crop={crop} fill={COLORS.NIGHT[100]} />
			{label}
		</components.Option>
	);
};

export default Option;
