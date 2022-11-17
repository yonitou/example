import { View, StyleSheet, ScrollView } from "react-native";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import Header from "@Components/Header";
import SafeArea from "@Components/SafeArea";
import EquipmentReportCard from "@Components/EquipmentReportCard";
import DateReportCard from "@Components/DateReportCard";
import BaseButton from "@Components/BaseButton";
import MapView from "@Components/MapView";
import ProductsReportCard from "@Components/ProductsReportCard";
import ParcellesReportCard from "@Components/ParcellesReportCard";
import NotesReportCard from "@Components/NotesReportCard";
import ModulationReportCard from "@Components/ModulationReportCard";
import COLORS, { GRADIENTS } from "@Constants/palette";
import { LinearGradient } from "expo-linear-gradient";
import KeyboardShift from "@Components/KeyboardShift";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import Spinner from "@Components/Spinner";
import { Feature } from "flagged";
import { featuresEnum } from "@Types/feature.types";
import productFamilies from "@Constants/productFamilies";
import { fontFamilyEnum } from "@Types/font.types";
import TargetsReportCard from "@Components/TargetsReportCard";
import { DoneTaskReportScreenProps } from "./screen.types";

const DoneTaskReportScreen = ({
	selectedDay,
	goNavBack,
	volume,
	goToTargets,
	debit,
	selectedProducts,
	selectedFields,
	goNavCloseAndDelete,
	tankIndications,
	selectedSlot,
	startTime,
	endTime,
	modulation,
	nozzle,
	totalArea,
	onRequestEditDebit,
	onRequestEditNozzle,
	notes,
	goToFields,
	setNotes,
	goToProducts,
	onScrollBeginDrag,
	scrollRef,
	selectedTargets,
	loading,
	productFamily,
	submitting,
	goNavClose,
	taskId,
	saveReport,
}: DoneTaskReportScreenProps): JSX.Element => {
	const { t } = useTranslation();
	const ProductIcon = productFamilies[productFamily];
	return (
		<LinearGradient colors={GRADIENTS.BACKGROUND_1} style={styles.container}>
			<KeyboardShift style={styles.keyboardShift}>
				<Header
					backgroundColor="transparent"
					onBackPress={goNavBack}
					onCancelPress={taskId ? goNavCloseAndDelete : goNavClose}
					cancelType={taskId ? "delete" : "nav"}
					title={productFamily ? t(`products.${productFamily}`) : t("screens.taskReport.title")}
					textStyle={styles.headerTextStyle}
					headerIcon={ProductIcon && <ProductIcon width={24} height={24} fill={COLORS.NIGHT[100]} />}
				/>
				<SafeArea withHorizontalPadding={false}>
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
									<DateReportCard
										selectedDay={selectedDay}
										selectedSlot={selectedSlot}
										startTime={startTime}
										endTime={endTime}
									/>
								</View>
								<Feature name={featuresEnum.OPTIMIZE}>
									<View style={[styles.cardreport, styles.withMargin]}>
										<ModulationReportCard
											modulation={modulation}
											modulationIsActive={
												selectedProducts.filter((p) => p.modulationActive).length > 0
											}
											selectedProducts={selectedProducts}
											showModalSwitchBtns={false}
										/>
									</View>
								</Feature>

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
										selectedFields={_.sortBy(selectedFields, (field) => new Date(field.endTime))}
										onRequestEdit={goToFields}
										totalArea={totalArea}
										isComingTask={false}
										tankIndications={tankIndications}
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

								{/*= ============== Notes sur l'intervention ============== */}
								<View style={[styles.cardreport, styles.withMargin]}>
									<NotesReportCard notes={notes} setNotes={setNotes} scrollRef={scrollRef} />
								</View>
							</ScrollView>
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
	cardreport: {
		backgroundColor: COLORS.WHITE[100],
		padding: 16,
	},
	withMargin: {
		marginBottom: 16,
	},
	keyboardShift: {
		flex: 1,
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

export default DoneTaskReportScreen;
