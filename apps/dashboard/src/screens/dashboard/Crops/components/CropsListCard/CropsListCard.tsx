import { useContext, useState } from "react";

import styled from "styled-components";
import Button from "@Components/Button";
import { COLORS } from "@Constants/palette";
import BaseIcons from "@Icons/BaseIcons";
import { cropType } from "@Types/crops.types";
import { UserContext } from "@Context/UserContext";
import { CropsScreenContext, ModeEnum } from "@Context/CropScreenContext";
import BaseLoader from "@Components/Loader";
import { SnackbarContext, snackbarTypeEnum } from "@Context/SnackbarContext";
import SearchInput from "@Components/SearchInput";
import { useTranslation } from "react-i18next";
import CropIcon from "@Components/CropIcon";

const StyledCropsList = styled.div`
	flex: 1;
	overflow: hidden;
	display: flex;
	flex-direction: column;

	.wrapper {
		flex: 1;
		overflow: hidden;
		margin: 0 1.6rem;
		display: flex;
		flex-direction: column;
		.header {
			background-color: var(--white);
			padding: 1.6rem;
			border-radius: 0.4rem;
			h5 {
				display: flex;
				align-items: center;
				margin-bottom: 1rem;
				svg {
					margin-right: 0.8rem;
				}
			}
		}
		.crops-wrapper {
			flex: 1;
			overflow: auto;
			.crop {
				display: flex;
				align-items: center;
				background-color: var(--white);
				padding: 1.6rem;
				cursor: pointer;
				margin: 0.8rem 0;
				&:hover {
					background-color: var(--night-10);
				}
			}
		}
	}
	.ctas {
		background-color: var(--white);
		padding: 1.6rem 3rem;
	}
`;

const StyledLoader = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	.wrapper {
		background-color: var(--white);
		width: 100%;
		margin: 0 2.6rem;
		padding: 3.2rem 1.8rem;
		border-radius: 1.6rem;
	}
`;

const CropsListCard = (): JSX.Element => {
	const {
		selectedFields,
		setSelectedFields,
		updateFields,
		setMultiSelectionEnabled,
		resetSelection,
		setCurrentMode,
		loading,
	} = useContext(CropsScreenContext);
	const { t } = useTranslation();
	const { showSnackbar } = useContext(SnackbarContext);
	const { crops, refetchFields } = useContext(UserContext);
	const [searchedCrops, setSearchedCrops] = useState<cropType[]>(crops);

	const onClickCrop = async (crop: cropType): Promise<void> => {
		try {
			await updateFields(selectedFields.map((field) => ({ fieldId: field.id, cropId: crop.id })));
			await refetchFields();
			setCurrentMode(ModeEnum.FIELD_LIST);
			setSelectedFields([]);
			setMultiSelectionEnabled(false);
			showSnackbar(t("common.snackbar.updateCrops.success"), snackbarTypeEnum.SUCCESS);
		} catch (e) {
			showSnackbar(t("common.snackbar.updateCrops.error"), snackbarTypeEnum.ERROR);
			throw e;
		}
	};

	const search = (cropName: string): void => {
		const filteredAndSortedCrops = crops?.filter((crop) =>
			cropName?.length >= 1 ? crop.name.toLowerCase().includes(cropName) : crop
		);

		setSearchedCrops(filteredAndSortedCrops);
	};

	return loading ? (
		<StyledLoader>
			<div className="wrapper">
				<BaseLoader className="loader" message={t("screens.dashboard.cropsListCard.loaderMessage")} />
			</div>
		</StyledLoader>
	) : (
		<StyledCropsList>
			<div className="wrapper">
				<div className="header">
					<h5>
						<BaseIcons.RecycleCrop width={24} height={24} fill={COLORS.NIGHT[100]} />{" "}
						{t("screens.dashboard.cropsListCard.selectedFields", { count: selectedFields?.length })}
					</h5>

					<SearchInput onCustomChange={search} name="crop" />
				</div>
				<div className="crops-wrapper">
					{searchedCrops &&
						searchedCrops.map((crop) => {
							return (
								<div
									className="crop"
									onClick={() => onClickCrop(crop)}
									key={crop.id}
									role="button"
									tabIndex={0}
									onKeyDown={() => onClickCrop(crop)}
								>
									<CropIcon crop={crop} fill={COLORS.NIGHT[100]} />
									<h3>{t(`crops.${crop?.name}`)}</h3>
								</div>
							);
						})}
				</div>
			</div>
			<div className="ctas">
				<Button
					outlined
					color="lake"
					onClick={resetSelection}
					text={t("screens.dashboard.cropsListCard.cancelSelection")}
				/>
			</div>
		</StyledCropsList>
	);
};
export default CropsListCard;
