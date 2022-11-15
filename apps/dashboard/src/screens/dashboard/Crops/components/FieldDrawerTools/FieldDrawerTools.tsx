import styled from "styled-components";
import { useContext } from "react";
import BaseIcons from "@Icons/BaseIcons";
import { CropsScreenContext } from "@Context/CropScreenContext";
import { useTranslation } from "react-i18next";

const StyledFieldDrawerTools = styled.div`
	left: 40%;
	z-index: 10;
	position: absolute;
	bottom: 2.5rem;
	display: flex;
	justify-content: space-between;
	width: 25%;
	margin: auto;
`;

const StyledButton = styled.div`
	background-color: var(--white);
	border-radius: 0.4rem;
	overflow: hidden;
	.wrapper {
		width: 11rem;
		height: 11rem;
		background-color: var(--white);

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		&:hover {
			background-color: var(--night-10);
		}
	}
`;

const FieldDrawerTools = (): JSX.Element => {
	const { t } = useTranslation();
	const { clickedCoordonates, setClickedCoordonates } = useContext(CropsScreenContext);

	const onCancelDrawing = (): void => {
		setClickedCoordonates((prev) => prev && prev.filter((_, index, coords) => index !== coords.length - 1));
	};

	const onRemoveDrawing = (): void => {
		setClickedCoordonates(undefined);
	};

	return (
		<StyledFieldDrawerTools>
			{clickedCoordonates?.length > 1 && (
				<StyledButton onClick={onCancelDrawing}>
					<div className="wrapper">
						<BaseIcons.Undo width={50} height={50} />
						<h3>{t("common.button.cancel")}</h3>
					</div>
				</StyledButton>
			)}
			{clickedCoordonates?.length > 0 && (
				<StyledButton onClick={onRemoveDrawing}>
					<div className="wrapper">
						<BaseIcons.Trash width={50} height={50} />
						<h3>{t("common.button.delete")}</h3>
					</div>
				</StyledButton>
			)}
		</StyledFieldDrawerTools>
	);
};
export default FieldDrawerTools;
