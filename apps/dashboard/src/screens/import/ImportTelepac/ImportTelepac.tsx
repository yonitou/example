import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Loader from "@Components/Loader";
import FarmSelector from "@Components/FarmSelector";
import coopIcon from "@Assets/coop.png";
import BaseIcons from "@Icons/BaseIcons";
import FormCard from "@Components/FormCard";
import FormHeader from "@Components/FormHeader";
import Button from "@Components/Button";
import { COLORS } from "@Constants/palette";
import EmptyState from "@Components/EmptyState";
import ImportState from "@Components/ImportState";
import { ImportTelepacScreenProps } from "./importTelepac.types";
import ImportDropzone from "./components/ImportDropzone";

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
			a {
				font-size: 1.4rem;
				font-family: "Nunito Bold";
				color: var(--lake-100);
				text-decoration: none;
				margin: 0.8rem 0;
				display: block;
				&:hover {
					text-decoration: underline;
				}
			}
			.dropzone {
				margin-top: 1.6rem;
			}

			button {
				margin-top: 1.6rem;
			}
		}
		.loader-wrapper {
			.loader {
				margin-top: 3.2rem;
			}
		}
	}
`;

const ImportTelepac = ({
	error,
	success,
	enableButton,
	handleImport,
	isImporting,
	handleChangeDropzone,
	inputFile,
	goBack,
	defaultFarm,
	goToDashboard,
	backFromError,
	retryImport,
}: ImportTelepacScreenProps): JSX.Element => {
	const { t } = useTranslation();

	return (
		<StyledContainer>
			{defaultFarm ? (
				<FormCard className="card">
					<FormHeader
						title={!error && !success && t("screens.importTelepac.title")}
						onGoBack={!isImporting && !error && !success && goBack}
						backIcon={!isImporting && !error && !success && <BaseIcons.ArrowLeft />}
					/>
					{isImporting ? (
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
									<FarmSelector crudActions={false} />
									<ImportDropzone
										onChange={handleChangeDropzone}
										file={inputFile}
										className="dropzone"
									/>
									<a
										href="https://www.alvie.fr/fr/exports-parcelles"
										target="_blank"
										rel="noreferrer"
									>
										{t("screens.importTelepac.helperLink")}
									</a>
									<Button
										color="tangerine"
										disabled={!enableButton}
										onClick={handleImport}
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

export default ImportTelepac;
