import { components, OptionProps } from "react-select";
import BaseIcons from "@Icons/BaseIcons";

const Option = (props: OptionProps): JSX.Element => {
	const { label } = props;
	return (
		<components.Option {...props}>
			<BaseIcons.User width={24} height={24} />
			{label}
		</components.Option>
	);
};

export default Option;
