import { Controller, FormProvider } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import styled from "styled-components";
import { PLAN_STATUS_COLORS } from "@Constants/palette";
import FormCard from "@Components/FormCard";
import FormHeader from "@Components/FormHeader";
import Button from "@Components/Button";
import InputTip from "@Components/InputTip";
import SelectInput from "@Components/SelectInput";
import GooglePlacesAutocomplete from "@Components/GooglePlacesAutocomplete";
import BaseIcons from "@Icons/BaseIcons";
import { AccountProps } from "./account.types";
import OADSmag from "./components/OADSmag";

const StyledContainer = styled.div<{ planStatusColor: string }>`
	height: 100%;
	background: var(--gradient-background-2);
	display: flex;
	flex-direction: column;

	justify-content: space-between;
	.card {
		width: 50%;
		overflow: auto;
		height: auto;
		margin: 0 auto;
		.content {
			section {
				margin-top: 3.2rem;

				h3.labels {
					margin-bottom: 1.6rem;
					color: var(--lake-100);
				}
				.plan-wrapper {
					display: flex;
					align-items: center;
					img {
						margin-right: 1.6rem;
					}
					.plan-details {
						flex: 1;
						h3 {
							color: ${(props) => props.planStatusColor};
						}
					}
				}
				.modal-btn {
					margin: 1.6rem 0;
				}
				.input-wrapper {
					margin-bottom: 3.2rem;
					&:last-child {
						margin-bottom: 0;
					}
					.input-tip {
						margin-top: 1.6rem;
					}
				}
			}
		}
	}
	.footer {
		background: var(--white);
		width: 100%;
		padding: 2.4rem 0;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 10rem;
		button {
			width: 20rem;
			margin: 0 1.2rem;
		}
	}
`;

const Account = ({
	methods,
	plan,
	onSubmit,
	coops,
	onClickPricing,
	onCancel,
	hasFarmWeather,
	loading,
	planStatus,
	onClickManageSubscription,
	smagSectionRef,
	openAccountDeleteModal,
}: AccountProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<StyledContainer planStatusColor={PLAN_STATUS_COLORS[planStatus]}>
			<FormCard className="card">
				<FormHeader title={t("screens.account.title")} />
				<div className="content">
					{plan && (
						<section>
							<h3 className="labels">{t("screens.account.subscription.title")}</h3>
							<div className="plan-wrapper">
								<img src={plan.image} alt={plan.i18nId} width={100} />
								<div className="plan-details">
									<h2>HYGO {t(`plans.${plan.i18nId}.name`)}</h2>
									<h3>{t(`plans.status.${planStatus}`)}</h3>
									<p>{t(`plans.${plan.i18nId}.description`)}</p>
								</div>
							</div>
							<Button
								text={t("screens.account.subscription.editSubscriptionBtn")}
								onClick={onClickManageSubscription}
								color="tangerine"
								className="modal-btn"
							/>
							<Button
								text={t("screens.account.subscription.pricingBtn")}
								onClick={onClickPricing}
								outlined
								color="tangerine"
							/>
						</section>
					)}
					<section>
						<h3 className="labels">{t("screens.account.myDetails.title")}</h3>

						<FormProvider {...methods}>
							<div className="input-wrapper">
								<Controller
									control={methods.control}
									rules={{
										required: { value: true, message: t("common.inputs.coop.errors.required") },
									}}
									name="coop"
									render={({
										field: { onChange, onBlur, value, name, ref },
										fieldState: { error },
									}) => {
										return (
											<SelectInput
												name={name}
												inputRef={ref}
												onBlur={onBlur}
												onChange={onChange}
												value={value}
												label={t("common.inputs.coop.label")}
												placeholder={t("common.inputs.coop.placeholder")}
												error={error}
												options={coops.map((c) => ({
													value: c.id.toString(),
													label: c.name,
												}))}
												searchable
											/>
										);
									}}
								/>
								<InputTip>
									<h5>
										<Trans i18nKey="common.inputs.coop.inputTip">
											By linking your organism, you are authorizing their people to access your
											HYGO data.
											<br /> If you&apos;re not concerned, select &quos;I&apos;m independant&quos;
										</Trans>
									</h5>
								</InputTip>
							</div>

							<div className="input-wrapper">
								<GooglePlacesAutocomplete
									error={methods.formState.errors.googleAutocomplete}
									rules={{
										required: { value: true, message: t("common.inputs.location.errors.required") },
									}}
									name="googleAutocomplete"
									onChange={(v) => methods.setValue("location", v)}
									label={t("common.inputs.location.label")}
									placeholder={t("common.inputs.location.placeholder")}
								/>
								<InputTip>
									<h5>{t("common.inputs.location.inputTip")}</h5>
								</InputTip>
							</div>
						</FormProvider>
					</section>
					{hasFarmWeather && (
						<section ref={smagSectionRef}>
							<h3 className="labels">{t("screens.account.myOad.title")}</h3>
							<OADSmag />
						</section>
					)}
					<section>
						<Button
							text={t("screens.account.deleteAccountBtn")}
							onClick={openAccountDeleteModal}
							color="gaspacho"
							icon={<BaseIcons.Trash width={16} height={16} />}
							outlined
						/>
					</section>
				</div>
			</FormCard>
			<div className="footer">
				<Button outlined color="tangerine" text={t("common.button.cancel")} onClick={onCancel} />
				<Button
					color="tangerine"
					text={t("common.button.save")}
					onClick={methods.handleSubmit(onSubmit)}
					loading={loading}
				/>
			</div>
		</StyledContainer>
	);
};

export default Account;
