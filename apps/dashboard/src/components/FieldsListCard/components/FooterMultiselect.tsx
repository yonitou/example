import styled from "styled-components";
import { COLORS } from "@Constants/palette";
import Button from "@Components/Button";
import BaseIcons from "@Icons/BaseIcons";
import { useTranslation } from "react-i18next";
import InputTip from "@Components/InputTip";

const StyledFooterMultiSelect = styled.div`
	background-color: var(--white);
	padding: 1.6rem 3rem;
	.input-tip {
		margin-bottom: 0.8rem;
	}
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.8rem;
		.selected-fields {
			display: flex;
			align-items: center;
			svg {
				margin-right: 0.8rem;
			}
		}
		.unselect {
			color: var(--lake-100);
			cursor: pointer;
			&:hover {
				text-decoration: underline;
			}
		}
	}
	button:last-child {
		margin-top: 0.8rem;
	}
`;

interface FooterMultiselectProps {
	numberOfSelectedFields: number;
	reset: () => void;
	onValidateFieldSelection: () => void;
	unSelectAll: () => void;
	withCtasButtons?: boolean;
}
export const FooterMultiselect = ({
	numberOfSelectedFields,
	reset,
	onValidateFieldSelection,
	unSelectAll,
	withCtasButtons = true,
}: FooterMultiselectProps): JSX.Element => {
	const { t } = useTranslation();

	return (
		<StyledFooterMultiSelect>
			{!numberOfSelectedFields && (
				<InputTip>
					<h5>{t("components.fieldsListCard.footerMultiselect.explicabilityCrop")}</h5>
				</InputTip>
			)}
			<div className="header">
				<h5 className="selected-fields">
					<>
						<BaseIcons.RecycleCrop width={24} height={24} fill={COLORS.NIGHT[100]} />{" "}
						{t("components.fieldsListCard.footerMultiselect.fields", {
							count: numberOfSelectedFields,
						})}
					</>
				</h5>
				{!!numberOfSelectedFields && (
					<div className="unselect" onClick={unSelectAll} onKeyDown={unSelectAll} role="button" tabIndex={0}>
						<h5>{t("components.fieldsListCard.footerMultiselect.unselectAll")}</h5>
					</div>
				)}
			</div>
			{withCtasButtons && (
				<>
					<Button
						color="tangerine"
						disabled={!numberOfSelectedFields}
						onClick={onValidateFieldSelection}
						text={t("components.fieldsListCard.footerMultiselect.validateSelection")}
					/>

					<Button
						outlined
						color="tangerine"
						onClick={reset}
						text={t("components.fieldsListCard.footerMultiselect.cancelSelection")}
					/>
				</>
			)}
		</StyledFooterMultiSelect>
	);
};
