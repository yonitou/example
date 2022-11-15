import { components, DropdownIndicatorProps } from "react-select";
import { COLORS } from "@Constants/palette";
import BaseIcons from "@Icons/BaseIcons";

const DropdownIndicator = (props: DropdownIndicatorProps): JSX.Element => {
	return (
		// eslint-disable-next-line
		<components.DropdownIndicator {...props}>
			<BaseIcons.Chevron fill={COLORS.WHITE} width={20} height={20} />
		</components.DropdownIndicator>
	);
};

export default DropdownIndicator;
