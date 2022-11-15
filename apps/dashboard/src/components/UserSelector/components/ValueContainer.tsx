import { components, ValueContainerProps } from "react-select";
import BaseIcons from "@Icons/BaseIcons";

const ValueContainer = ({ children, ...props }: ValueContainerProps): JSX.Element => (
	// eslint-disable-next-line
	<components.ValueContainer {...props}>
		<BaseIcons.User width={24} height={24} /> {children}
	</components.ValueContainer>
);

export default ValueContainer;
