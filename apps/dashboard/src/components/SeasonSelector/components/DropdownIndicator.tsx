import { COLORS } from "@Constants/palette";
import BaseIcons from "@Icons/BaseIcons";
import { components, DropdownIndicatorProps } from "react-select";

const DropdownIndicator = (props: DropdownIndicatorProps): JSX.Element => {
	return (
		<components.DropdownIndicator {...props}>
			<BaseIcons.Chevron fill={COLORS.NIGHT[100]} width={20} height={20} />
		</components.DropdownIndicator>
	);
};

export default DropdownIndicator;
