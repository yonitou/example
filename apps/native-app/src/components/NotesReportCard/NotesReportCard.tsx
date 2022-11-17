import { Dispatch, RefObject, SetStateAction } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import HygoIcons from "@Icons/HygoIcons";
import COLORS from "@Constants/palette";
import Title from "@Components/Title";
import Input from "@Components/Input";
import { useForm } from "react-hook-form";

interface NotesReportCardProps {
	notes: string;
	setNotes: Dispatch<SetStateAction<string>>;
	scrollRef: RefObject<ScrollView>;
}

const NotesReportCard = ({ notes, setNotes, scrollRef }: NotesReportCardProps): JSX.Element => {
	const { t } = useTranslation();
	const { control } = useForm();
	const handleChange = (text: string): void => {
		setNotes(text);
	};
	return (
		<>
			<View style={styles.header}>
				<View style={styles.sidesWrapper}>
					<HygoIcons.Edit fill={COLORS.LAKE[100]} width={24} height={24} />
					<Title style={styles.title}>{t("components.notesReportCard.title")}</Title>
				</View>
			</View>

			<Input
				control={control}
				containerStyle={styles.inputContainer}
				name="notes"
				placeholder={t("components.notesReportCard.placeholder")}
				onChange={handleChange}
				defaultValue={notes}
				style={styles.input}
				autoCapitalize="sentences"
				autoCorrect
				multiline
				textStyle={styles.textInput}
				handleFocusOrBlur={(value) => value && scrollRef.current.scrollToEnd({ animated: true })}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	header: {
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
	},
	title: {
		marginLeft: 8,
	},

	sidesWrapper: {
		alignItems: "center",
		flexDirection: "row",
	},
	textInput: {
		textAlignVertical: "top",
	},
	input: {
		paddingTop: 5,
		height: 100,
	},
	inputContainer: {
		marginTop: 16,
	},
});

export default NotesReportCard;
