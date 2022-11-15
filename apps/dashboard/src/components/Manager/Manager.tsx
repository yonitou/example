import styled from "styled-components";
import FarmSelector from "@Components/FarmSelector";

interface ManagerProps {
	showFarmSelector?: boolean;
	children: JSX.Element | JSX.Element[];
	withCrudActions?: boolean;
	className?: string;
}

const StyledManager = styled.div`
	position: relative;
	background: var(--gradient-light-grey);
	width: 39rem;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	height: 100%;
	.farm-selector-container {
		padding: 1.6rem 1.3rem;
	}
`;

const Manager = ({
	children,
	showFarmSelector = true,
	withCrudActions = true,
	className,
}: ManagerProps): JSX.Element => {
	return (
		<StyledManager className={className}>
			{showFarmSelector && (
				<div className="farm-selector-container">
					<FarmSelector crudActions={withCrudActions} />
				</div>
			)}

			{children}
		</StyledManager>
	);
};

export default Manager;
