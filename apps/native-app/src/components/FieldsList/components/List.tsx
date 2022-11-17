import Accordion from "@Components/Accordion";
import COLORS from "@Constants/palette";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import HygoIcons from "@Icons/HygoIcons";
import { cropType } from "@Types/crop.types";
import { fieldType } from "@Types/field.types";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import AccordionSummary from "./AccordionSummary";
import FieldItem from "./FieldItem";

interface ListProps {
	crop: cropType;
	fields: fieldType[];
	selection: boolean;
	selectedFieldIds: number[];
	onSelect: (f: fieldType) => void;
	onUnSelect: (f: fieldType) => void;
	onPressField: (f: fieldType) => void;
	isLast: boolean;
}

const List = ({
	crop,
	fields,
	isLast,
	selection,
	selectedFieldIds,
	onPressField,
	onUnSelect,
	onSelect,
}: ListProps): JSX.Element => {
	const [opened, setOpened] = useState<boolean>(selection);

	const isCropCheck = fields?.every((field: fieldType) => selectedFieldIds?.find((id) => id === field.id));
	const isIndeterminate = fields?.some((field: fieldType) => selectedFieldIds?.find((id) => id === field.id));

	const getCheckboxIcon = (): JSX.Element => {
		if (isCropCheck) return <HygoIcons.RectChecked width={32} height={32} fill={COLORS.LAKE[100]} />;
		if (isIndeterminate) return <HygoIcons.RemoveSubstractSign width={32} height={32} fill={COLORS.LAKE[100]} />;
		return <HygoIcons.RectUnChecked width={32} height={32} fill={COLORS.NIGHT[50]} />;
	};

	const onClickCropCheckbox = (): void => {
		setOpened(!isCropCheck);
		fields?.forEach((field) => (isCropCheck ? onUnSelect(field) : onSelect(field)));
	};

	const isSelectedFields = (field: fieldType): boolean => Boolean(selectedFieldIds?.find((id) => id === field.id));

	const onClickFieldCheckbox = (field: fieldType): void => {
		isSelectedFields(field) ? onUnSelect(field) : onSelect(field);
	};

	useEffect(() => {
		setOpened(selection);
	}, [selection]);

	const marginBottom = isLast ? 24 : 4;
	return (
		<Accordion
			containerStyle={{ ...styles.fieldCard, marginBottom }}
			chevronColor={COLORS.NIGHT[100]}
			opened={opened}
			summary={
				<AccordionSummary
					selection={selection}
					crop={crop}
					getCheckboxIcon={getCheckboxIcon}
					onClickCropCheckbox={onClickCropCheckbox}
				/>
			}
		>
			{fields?.map((field, index, arr) => {
				const isLastField = index === arr.length - 1;

				return (
					<FieldItem
						selection={selection}
						isLast={isLastField}
						onClickFieldCheckbox={onClickFieldCheckbox}
						field={field}
						onPressField={onPressField}
						isSelected={isSelectedFields(field)}
						key={field.id}
						area={field.area / 10000}
					/>
				);
			})}
		</Accordion>
	);
};

const styles = StyleSheet.create({
	fieldCard: {
		marginHorizontal: HORIZONTAL_PADDING,
		padding: 16,
		borderRadius: 8,
		shadowColor: COLORS.NIGHT[50],
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.19,
		shadowRadius: 5.62,
		elevation: 6,
	},
});

export default List;
