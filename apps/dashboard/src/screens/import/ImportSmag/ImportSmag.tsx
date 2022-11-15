import { Trans, useTranslation } from "react-i18next";
import styled from "styled-components";
import EmptyState from "@Components/EmptyState";
import FormCard from "@Components/FormCard";
import FarmSelector from "@Components/FarmSelector";
import FormHeader from "@Components/FormHeader";
import { COLORS } from "@Constants/palette";
import Loader from "@Components/Loader";

import coopIcon from "@Assets/coop.png";
import BaseIcons from "@Icons/BaseIcons";
import ImportState from "@Components/ImportState";
import InputTip from "@Components/InputTip";
import Button from "@Components/Button";
import { ImportSmagScreenProps } from "./importSmag.types";
import SmagSeasonSelector from "./components/SmagSeasonSelector";
import SmagFarmSelector from "./components/SmagFarmSelector";

const StyledContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	background: var(--gradient-background-2);
	.card {
		box-shadow: 0px 6px 60px rgba(0, 83, 94, 0.05);
		.flow-wrapper {
			margin-top: 2.4rem;
			h3.step {
				margin-bottom: 1.6rem;
			}
			> .input-tip {
				margin-top: 0.8rem;
				margin-bottom: 1.6rem;
			}
			.selectors {
				background-color: var(--night-5);
				padding: 0.8rem;
				border-radius: 0.4rem;
				margin-bottom: 3.2rem;
				.input-tip {
					margin-top: 0.8rem;
				}
				.smag-farm-loader {
					margin-top: 0.8rem;
				}
				.smag-farm-selector {
					margin-top: 0.8rem;
				}
			}
		}
	}
`;

const ImportSmag = ({
	defaultFarm,
	goBack,
	goToDashboard,
	backFromError,
	doImport,
	retryImport,
	onChangeYear,
	error,
	loadingSmagFarms,
	selectedYear,
	success,
	smagFarms,
	selectedFarm,
	onChangeFarm,
	loading,
}: ImportSmagScreenProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<StyledContainer>
			{defaultFarm ? (
				<FormCard className="card">
					<FormHeader
						title={!error && !success && t("screens.importSmag.title")}
						onGoBack={!loading && !error && !success && goBack}
						backIcon={!loading && !error && !success && <BaseIcons.ArrowLeft />}
						subTitle={!loading && !error && !success && t("screens.importSmag.subtitle")}
					/>
					{loading ? (
						<div className="loader-wrapper">
							<Loader className="loader" message={t("screens.import.loaderMessage")} />
						</div>
					) : (
						<>
							{success && (
								<ImportState
									onClick={goToDashboard}
									title={t("screens.import.success.title")}
									primaryBtnText={t("common.button.continue")}
									Icon={<BaseIcons.ParcelleSuccess />}
								/>
							)}
							{error && (
								<ImportState
									onClick={retryImport}
									onCancel={backFromError}
									secondaryBtnText={t("common.button.cancel")}
									subtitle={t("screens.import.error.description")}
									title={t("screens.import.error.title")}
									primaryBtnText={t("common.button.retry")}
									Icon={<BaseIcons.SadDrop />}
								/>
							)}
							{!success && !error && (
								<div className="flow-wrapper">
									<h3 className="step">{t("screens.importSmag.steps.1.title")}</h3>
									<FarmSelector crudActions={false} />
									<InputTip>
										<h5>{t("screens.importSmag.steps.1.inputTip")}</h5>
									</InputTip>
									<h3 className="step">{t("screens.importSmag.steps.2.title")}</h3>
									<div className="selectors">
										<SmagSeasonSelector onChangeYear={onChangeYear} selectedYear={selectedYear} />
										{smagFarms?.length > 0 ? (
											<SmagFarmSelector
												className="smag-farm-selector"
												selectedFarm={selectedFarm}
												smagFarms={smagFarms}
												onChangeFarm={onChangeFarm}
											/>
										) : (
											<>
												{loadingSmagFarms && <Loader className="smag-farm-loader" />}
												{!loadingSmagFarms && selectedYear && (
													<InputTip>
														<Trans i18nKey="screens.importSmag.steps.2.errors">
															<h5>⚠️ No farm has been found for this season.</h5>
															<h5>
																👉 Check your Smag account. If a farm exists on this
																season, contact us.
															</h5>
														</Trans>
													</InputTip>
												)}
											</>
										)}
									</div>
									<Button
										color="tangerine"
										disabled={!selectedFarm || !selectedYear}
										onClick={doImport}
										text={t("screens.import.importBtn")}
									/>
								</div>
							)}
						</>
					)}
				</FormCard>
			) : (
				<EmptyState
					illustration={<img src={coopIcon} alt="ferme" width={100} />}
					title={t("components.emptyState.noDefaultFarm.title")}
					description={t("components.emptyState.noDefaultFarm.description")}
					onClick={goToDashboard}
					btnIcon={<BaseIcons.Parcelle fill={COLORS.WHITE} width={16} height={16} />}
					btnText={t("components.emptyState.noDefaultFarm.btn")}
				/>
			)}
		</StyledContainer>
	);
};

export default ImportSmag;
