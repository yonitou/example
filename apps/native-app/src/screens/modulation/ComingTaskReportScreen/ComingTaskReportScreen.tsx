import { View, StyleSheet, ScrollView } from "react-native";
import { Feature } from "flagged";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import Header from "@Components/Header";
import productFamilies from "@Constants/productFamilies";
import BaseButton from "@Components/BaseButton";
import SafeArea from "@Components/SafeArea";
import EquipmentReportCard from "@Components/EquipmentReportCard";
import ModulationReportCard from "@Components/ModulationReportCard";
import TaskMetricsReportCard from "@Components/TaskMetricsReportCard";
import MapView from "@Components/MapView";
import ProductsReportCard from "@Components/ProductsReportCard";
import ParcellesReportCard from "@Components/ParcellesReportCard";
import NotesReportCard from "@Components/NotesReportCard";
import Spinner from "@Components/Spinner";
import KeyboardShift from "@Components/KeyboardShift";
import COLORS, { GRADIENTS } from "@Constants/palette";
import TargetsReportCard from "@Components/TargetsReportCard";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import { featuresEnum } from "@Types/feature.types";
import { fontFamilyEnum } from "@Types/font.types";
import { ComingTaskReportScreenProps } from "./screen.types";

const ComingTaskReportScreen = ({
	modulationOfTheSelectedSlot,
	conditionsOfTheSelectedSlot,
	debit,
	notes,
	nozzle,
	selectedProducts,
	scrollRef,
	productFamily,
	onScrollBeginDrag,
	selectedFields,
	submitting,
	tankIndications,
	updateProducts,
	selectedSlot,
	metricsOfTheSelectedSlot,
	selectedDay,
	setNotes,
	goToTargets,
	goNavBack,
	volume,
	taskId,
	saveReport,
	totalArea,
	goToProducts,
	goNavCloseAndDelete,
	goToFields,
	selectedTargets,
	goNavClose,
	goToSlots,
	loading,
	onRequestEditDebit,
	onRequestEditNozzle,
}: ComingTaskReportScreenProps): JSX.Element => {
	const { t } = useTranslation();
	const ProductIcon = productFamilies[productFamily];
	return (
		<LinearGradient colors={GRADIENTS.BACKGROUND_1} style={styles.container}>
			<KeyboardShift style={styles.keyboardShift}>
				<Header
					title={productFamily ? t(`products.${productFamily}`) : t("screens.taskReport.title")}
					backgroundColor="transparent"
					onBackPress={goNavBack}
					textStyle={styles.headerTextStyle}
					headerIcon={ProductIcon && <ProductIcon width={24} height={24} fill={COLORS.NIGHT[100]} />}
					onCancelPress={taskId ? goNavCloseAndDelete : goNavClose}
					cancelType={taskId ? "delete" : "nav"}
				/>
				<SafeArea withHorizontalPadding={false}>
					{/*= ============== Metrics =============== */}
					{loading ? (
						<Spinner />
					) : (
						<>
							<ScrollView
								showsVerticalScrollIndicator={false}
								ref={scrollRef}
								onScrollBeginDrag={onScrollBeginDrag}
							>
								<View style={[styles.cardreport, styles.withMargin]}>
									<TaskMetricsReportCard
										selectedDay={selectedDay}
										metricsOfTheSelectedSlot={metricsOfTheSelectedSlot}
										selectedSlot={selectedSlot}
										conditionsOfTheSelectedSlot={conditionsOfTheSelectedSlot}
										onRequestEdit={goToSlots}
										tankIndications={tankIndications}
									/>
								</View>

								{/*= ============== Modulation =============== */}
								<Feature name={featuresEnum.OPTIMIZE}>
									<View style={[styles.cardreport, styles.withMargin]}>
										<ModulationReportCard
											modulation={modulationOfTheSelectedSlot}
											modulationIsActive={selectedProducts.some((p) => p.modulationActive)}
											updateProducts={updateProducts}
											selectedProducts={selectedProducts}
										/>
									</View>
								</Feature>

								<>
									{/*= ============== Products ============== */}
									<View style={[styles.cardreport, styles.withMargin]}>
										<ProductsReportCard
											selectedProducts={selectedProducts}
											onRequestEdit={goToProducts}
											totalArea={totalArea}
											volume={volume}
										/>
									</View>
									{tankIndications?.configuration?.withTargets && (
										<View style={[styles.cardreport, styles.withMargin]}>
											<TargetsReportCard
												selectedTargets={selectedTargets}
												onRequestEdit={goToTargets}
											/>
										</View>
									)}
									{/*= ============== Parcelles ============== */}
									<View style={[styles.cardreport, styles.withMargin]}>
										<ParcellesReportCard
											selectedFields={selectedFields}
											tankIndications={tankIndications}
											onRequestEdit={goToFields}
											totalArea={totalArea}
											isComingTask
										/>
									</View>

									<View style={styles.withMargin}>
										<MapView selectedFields={selectedFields} />
									</View>

									{/*= ============== Equipement de pulverisation ============== */}
									<View style={[styles.cardreport, styles.withMargin]}>
										<EquipmentReportCard
											debit={debit}
											nozzle={nozzle}
											onRequestEditDebit={onRequestEditDebit}
											onRequestEditNozzle={onRequestEditNozzle}
										/>
									</View>
								</>

								{/*= ============== Notes sur l'intervention ============== */}
								<View style={[styles.cardreport, styles.withMargin]}>
									<NotesReportCard notes={notes} setNotes={setNotes} scrollRef={scrollRef} />
								</View>
							</ScrollView>
							{/*= ============== End ============== */}

							<View style={styles.btnSavePulvView}>
								<BaseButton onPress={saveReport} color={COLORS.LAKE} loading={submitting}>
									{t("screens.taskReport.button")}
								</BaseButton>
							</View>
						</>
					)}
				</SafeArea>
			</KeyboardShift>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	keyboardShift: {
		flex: 1,
	},
	withMargin: {
		marginBottom: 16,
	},
	cardreport: {
		backgroundColor: COLORS.WHITE[100],
		padding: 16,
	},

	btnSavePulvView: {
		paddingHorizontal: HORIZONTAL_PADDING,
	},
	headerTextStyle: {
		fontFamily: fontFamilyEnum.AvenirBlack,
		fontSize: 24,
		color: COLORS.NIGHT[100],
	},
});

export default ComingTaskReportScreen;
