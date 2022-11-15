import { Dispatch, SetStateAction, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BaseIcons from "@Icons/BaseIcons";
import emptyFieldsImg from "@Assets/crops/empty-fields.png";
import noDefaultFarmImg from "@Assets/crops/no-default-farm.png";
import selectAgriImg from "@Assets/crops/select-agri.png";
import BaseLoader from "@Components/Loader";
import { ModeEnum } from "@Context/CropScreenContext";
import { UserContext } from "@Context/UserContext";
import { fieldType } from "@Types/fields.types";
import { farmType } from "@Types/farm.types";
import { COLORS } from "@Constants/palette";
import { FooterActions } from "./components/FooterActions";
import { FooterMultiselect } from "./components/FooterMultiselect";
import FieldsTreeView from "./components/FieldsTreeView";
import EmptyState from "./components/EmptyState";

interface FieldsListCardProps {
	fields: fieldType[];
	selectedFields: fieldType[];
	multiSelectionEnabled: boolean;
	setSelectedFields: Dispatch<SetStateAction<fieldType[]>>;
	setMultiSelectionEnabled?: Dispatch<SetStateAction<boolean>>;
	resetSelection?: () => void;
	setCurrentMode?: Dispatch<SetStateAction<ModeEnum>>;
	farms: farmType[];
	adminWithoutUserSelected?: boolean;
	withCtasButtons?: boolean;
}

const StyledFieldsList = styled.div`
	margin-top: 1.6rem;
	display: flex;
	flex-direction: column;
	flex: 1;
	overflow: hidden;
	.empty-states {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: auto;
		padding: 1.8rem;
	}
	.curved-arrow {
		position: absolute;
		top: 0;
		right: 2.7rem;
		height: 50%;
	}
`;

const FieldsListCard = ({
	fields,
	selectedFields,
	multiSelectionEnabled,
	setSelectedFields,
	setMultiSelectionEnabled,
	resetSelection,
	setCurrentMode,
	farms,
	withCtasButtons = true,
	adminWithoutUserSelected,
}: FieldsListCardProps): JSX.Element => {
	const { loading } = useContext(UserContext);
	const { t } = useTranslation();
	const navigate = useNavigate();

	const goToImport = (): void => navigate("/import");

	const onClickDraw = (): void => setCurrentMode(ModeEnum.NEW_FIELD);

	const onClickShowCrops = (): void => setCurrentMode(ModeEnum.CROPS_LIST);

	const onClickEditCrops = (): void => setMultiSelectionEnabled(true);

	return (
		<StyledFieldsList>
			{!fields?.length || loading || adminWithoutUserSelected ? (
				<>
					{loading && <BaseLoader />}
					{!loading && (
						<div className="empty-states">
							{/* For users without farms */}
							{!farms.length && !adminWithoutUserSelected && (
								<EmptyState
									title={t("components.fieldsListCard.emptyStates.noDefaultFarm.title")}
									subtitle={t("components.fieldsListCard.emptyStates.noDefaultFarm.subtitle")}
									image={noDefaultFarmImg}
									altImage={t("components.fieldsListCard.emptyStates.noDefaultFarm.title")}
								>
									<BaseIcons.CurvedArrow className="curved-arrow" />
								</EmptyState>
							)}
							{/* For users with farms and no fields */}
							{farms.length > 0 && !adminWithoutUserSelected && (
								<EmptyState
									onClickSecondaryBtn={onClickDraw}
									secondaryBtnText={t("components.fieldsListCard.emptyStates.noFields.secondaryBtn")}
									onClickBtn={goToImport}
									btnIcon={<BaseIcons.Parcelle fill={COLORS.WHITE} width={24} height={24} />}
									secondaryBtnIcon={<BaseIcons.Pencil width={24} height={24} />}
									title={t("components.fieldsListCard.emptyStates.noFields.title")}
									subtitle={t("components.fieldsListCard.emptyStates.noFields.subtitle")}
									altImage={t("components.fieldsListCard.emptyStates.noFields.title")}
									btnText={t("components.fieldsListCard.emptyStates.noFields.btn")}
									image={emptyFieldsImg}
								/>
							)}
							{/* For admins / TC */}
							{adminWithoutUserSelected && (
								<EmptyState
									title={t("components.fieldsListCard.emptyStates.noUserSelected.title")}
									subtitle={t("components.fieldsListCard.emptyStates.noUserSelected.subtitle")}
									altImage={t("components.fieldsListCard.emptyStates.noUserSelected.title")}
									image={selectAgriImg}
								/>
							)}
						</div>
					)}
				</>
			) : (
				<>
					<FieldsTreeView
						fields={fields}
						selectedFields={selectedFields}
						setSelectedFields={setSelectedFields}
						multiSelectionEnabled={multiSelectionEnabled}
					/>
					{multiSelectionEnabled ? (
						<FooterMultiselect
							numberOfSelectedFields={selectedFields?.length}
							reset={resetSelection}
							unSelectAll={() => setSelectedFields([])}
							onValidateFieldSelection={onClickShowCrops}
							withCtasButtons={withCtasButtons}
						/>
					) : (
						<FooterActions onClickChangeCrop={onClickEditCrops} onClickDrawNewField={onClickDraw} />
					)}
				</>
			)}
		</StyledFieldsList>
	);
};
export default FieldsListCard;
