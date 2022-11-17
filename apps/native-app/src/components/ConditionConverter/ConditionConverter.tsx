import { useTranslation } from "react-i18next";
import { computeColorFromConditions } from "@Constants/palette";
import { conditionEnum } from "@Types/condition.types";
import Title from "@Components/Title";

interface ConditionConverterProps {
	condition: conditionEnum;
}

const ConditionConverter = ({ condition }: ConditionConverterProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<Title style={[{ color: computeColorFromConditions(condition, "TEXT") }]}>
			{t(`common.conditions.${condition}`)}
		</Title>
	);
};

export default ConditionConverter;
