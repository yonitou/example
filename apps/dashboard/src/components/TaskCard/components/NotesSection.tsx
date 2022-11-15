import TextInput from "@Components/TextInput";
import { COLORS } from "@Constants/palette";
import BaseIcons from "@Icons/BaseIcons";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

interface NotesSectionProps {
	notes: string;
}

const StyledNotesSection = styled.section`
	background-color: var(--white);
	border-radius: 0.4rem;
	padding: 1.6rem;
	flex: 1;
	.title-wrapper {
		display: flex;
		align-items: center;
		h3 {
			margin-left: 0.8rem;
		}
	}
	.notes {
		margin-top: 1.6rem;
	}
`;

const NotesSection = ({ notes }: NotesSectionProps): JSX.Element => {
	const { t } = useTranslation();
	const methods = useForm();
	return (
		<StyledNotesSection>
			<div className="title-wrapper">
				<BaseIcons.Pencil width={24} height={24} fill={COLORS.LAKE[100]} />
				<h3>{t("components.taskCard.notesSection.title")}</h3>
			</div>
			{/* eslint-disable-next-line */}
			<FormProvider {...methods}>
				<div className="notes">
					<TextInput
						name="notes"
						defaultValue={notes}
						placeholder={t("components.taskCard.notesSection.placeholder")}
						disabled
					/>
				</div>
			</FormProvider>
		</StyledNotesSection>
	);
};

export default NotesSection;
