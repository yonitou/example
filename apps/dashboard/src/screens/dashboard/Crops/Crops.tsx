import { useContext } from "react";
import styled from "styled-components";
import MapView from "@Components/MapView";
import FieldsListCard from "@Components/FieldsListCard";
import { CropsScreenContext, ModeEnum } from "@Context/CropScreenContext";
import { AuthContext } from "@Context/AuthContext";
import { UserContext } from "@Context/UserContext";
import Manager from "@Components/Manager";
import { OADContext, smagStepEnum } from "@Context/OADContext";
import { CropsProps } from "./crops.types";

import FieldDescriptionCard from "./components/FieldDescriptionCard";
import NewFieldCard from "./components/NewFieldCard";
import FieldDrawerTools from "./components/FieldDrawerTools";
import CropsListCard from "./components/CropsListCard";
import SmagTooltip from "./components/SmagTooltip";

const StyledContainer = styled.div`
	background-color: var(--white);
	height: 100%;
	position: relative;
	.map-container {
		position: absolute;
		top: 0;
		left: 39rem;
		bottom: 0;
		right: 0;
		height: 100%;
		z-index: 0;
	}
	.version {
		position: absolute;
		top: 0.8rem;
		right: 0.8rem;
		z-index: 1;
		color: var(--white);
	}
`;

const Crops = ({ lastSelectedField, multiSelectionEnabled, currentMode }: CropsProps): JSX.Element => {
	const {
		loading,
		fields,
		selectedFields,
		setSelectedFields,
		setMultiSelectionEnabled,
		resetSelection,
		setCurrentMode,
	} = useContext(CropsScreenContext);
	const { farms } = useContext(UserContext);
	const { smagOnboardingStep, loggedInSmag } = useContext(OADContext);
	const { farmerSelected, admin } = useContext(AuthContext);
	const adminWithoutUserSelected = admin && !farmerSelected;

	return (
		<StyledContainer>
			{process.env.REACT_APP_VERSION && <p className="version">HYGO v.{process.env.REACT_APP_VERSION}</p>}
			<div className="map-container">
				<MapView />
				{currentMode === ModeEnum.FIELD_LIST && lastSelectedField && !multiSelectionEnabled && (
					<FieldDescriptionCard selectedField={lastSelectedField} />
				)}
			</div>

			{currentMode === ModeEnum.FIELD_LIST && (
				<Manager showFarmSelector={!adminWithoutUserSelected && !loading}>
					{loggedInSmag && smagOnboardingStep === smagStepEnum.SHOW_IMPORT_TOOLTIP && <SmagTooltip />}
					<FieldsListCard
						fields={fields}
						selectedFields={selectedFields}
						multiSelectionEnabled={multiSelectionEnabled}
						setSelectedFields={setSelectedFields}
						setMultiSelectionEnabled={setMultiSelectionEnabled}
						resetSelection={resetSelection}
						setCurrentMode={setCurrentMode}
						farms={farms}
						adminWithoutUserSelected={adminWithoutUserSelected}
					/>
				</Manager>
			)}
			{currentMode === ModeEnum.CROPS_LIST && (
				<Manager>
					<CropsListCard />
				</Manager>
			)}

			{(currentMode === ModeEnum.NEW_FIELD || currentMode === ModeEnum.UPDATE_FIELD) && (
				<>
					<Manager>
						<NewFieldCard />
					</Manager>
					<FieldDrawerTools />
				</>
			)}
		</StyledContainer>
	);
};
export default Crops;
