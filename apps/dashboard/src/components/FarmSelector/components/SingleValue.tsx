import { components, SingleValueProps } from "react-select";
import BaseIcons from "@Icons/BaseIcons";

const SingleValue = ({ children, ...props }: SingleValueProps): JSX.Element => (
	<components.SingleValue {...props}>
		<BaseIcons.Barn width={24} height={24} /> {children}
	</components.SingleValue>
);

export default SingleValue;
