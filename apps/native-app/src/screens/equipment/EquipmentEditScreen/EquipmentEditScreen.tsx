import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import HygoIcons from "@Icons/HygoIcons";
import EquipmentCard from "@Components/EquipmentCard";
import CircularButton from "@Components/CircularButton";
import QuantitySelector from "@Components/QuantitySelector";
import Header from "@Components/Header";
import BaseButton from "@Components/BaseButton";
import COLORS, { GRADIENTS, NOZZLE_COLORS } from "@Constants/palette";
import KeyboardShift from "@Components/KeyboardShift";
import { getDefaultHeaderHeight } from "@react-navigation/elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SafeArea from "@Components/SafeArea";
import ParagraphSB from "@Components/ParagraphSB";
import Input from "@Components/Input";
import { EquipmentEditScreenProps } from "./screen.types";
import NozzleFamilyList from "./components/NozzleFamilyList";

const EquipmentEditScreen = ({
	onGoBack,
	nozzle,
	handleFamilyClick,
	handleColorClick,
	handleHeightClick,
	submitting,
	handleSpeedChange,
	handlePressureChange,
	handleCreateNozzle,
	handleUpdateNozzle,
	handleDeleteNozzle,
	handleChangeName,
	lastNozzle,
}: EquipmentEditScreenProps): JSX.Element => {
	const { t } = useTranslation();
	const { control } = useForm();
	const isNewNozzle = !nozzle?.id;
	const isNozzleTypeCompleted = !!nozzle?.family;
	const isNozzleCharacteristicsCompleted = !!nozzle?.color && !!nozzle?.height;
	const isNozzleSpeedCompleted = !!nozzle?.speed;
	const isNozzlePressureCompleted = !!nozzle?.pressure;
	const isAllNozzleParamsCompleted =
		!!nozzle?.color &&
		!!nozzle?.family &&
		!!nozzle.height &&
		!!nozzle?.pressure &&
		!!nozzle?.speed &&
		!!nozzle?.name;

	const { top } = useSafeAreaInsets();
	const headerHeight = getDefaultHeaderHeight(
		{
			width: Dimensions.get("window").width,
			height: Dimensions.get("window").height,
		},
		false,
		top
	);

	const headerElementsHeight = headerHeight - top;

	const renderHeightIcon = (): JSX.Element => {
		switch (nozzle?.height) {
			case 75:
				return <HygoIcons.PulvHeight75 />;
			case 50:
				return <HygoIcons.PulvHeight50 />;
			default:
				return <HygoIcons.PulvHeight90 />;
		}
	};
	return (
		<LinearGradient style={styles.container} colors={GRADIENTS.BACKGROUND_2}>
			<KeyboardShift style={styles.container}>
				<Header
					backgroundColor="transparent"
					onBackPress={onGoBack}
					cancelType={!isNewNozzle && !lastNozzle ? "delete" : null}
					onCancelPress={!isNewNozzle && handleDeleteNozzle}
					headerTitleContainerStyle={[styles.inputName]}
					customTitle={
						<Input
							control={control}
							name="name"
							defaultValue={nozzle?.name}
							onChange={handleChangeName}
							textStyle={styles.inputTextStyle}
							style={[{ height: headerElementsHeight }]}
						/>
					}
				/>
				<SafeArea>
					<ScrollView showsVerticalScrollIndicator={false}>
						<EquipmentCard
							icon={<HygoIcons.Nozzle width={24} height={24} fill={COLORS.TANGERINE[100]} />}
							label={t("screens.equipmentEdit.nozzle.type")}
							checked={isNozzleTypeCompleted}
						>
							<NozzleFamilyList familySelected={nozzle?.family} onPress={handleFamilyClick} />
						</EquipmentCard>

						<EquipmentCard
							icon={<HygoIcons.DotBetweenChevron width={24} height={24} fill={COLORS.TANGERINE[100]} />}
							label={t("screens.equipmentEdit.nozzle.characteristics")}
							disabled={!isNozzleTypeCompleted}
							checked={isNozzleCharacteristicsCompleted}
						>
							<View style={styles.characteristicsContainer}>
								<View>
									<ParagraphSB style={styles.characteristicTitle}>
										{t("screens.equipmentEdit.nozzle.color")}
									</ParagraphSB>
									<CircularButton
										large={false}
										backgroundColor={nozzle?.color ? NOZZLE_COLORS[nozzle.color] : undefined}
										onPress={handleColorClick}
										title={t(`common.colors.${nozzle?.color}`)}
									/>
								</View>

								<View>
									<ParagraphSB style={styles.characteristicTitle}>
										{t("screens.equipmentEdit.nozzle.height")}
									</ParagraphSB>
									<CircularButton
										large={false}
										onPress={handleHeightClick}
										title={`${nozzle?.height} ${t("common.units.centimeters")}`}
									>
										{renderHeightIcon()}
									</CircularButton>
								</View>
							</View>
						</EquipmentCard>

						<EquipmentCard
							icon={<HygoIcons.Speed width={24} height={24} fill={COLORS.TANGERINE[100]} />}
							label={t("screens.equipmentEdit.nozzle.velocity")}
							disabled={!isNozzleTypeCompleted || !isNozzleCharacteristicsCompleted}
							checked={isNozzleSpeedCompleted}
						>
							<QuantitySelector
								value={nozzle?.speed}
								onValueChange={handleSpeedChange}
								step={1}
								unit={t("common.units.kmPerHour")}
							/>
						</EquipmentCard>

						<EquipmentCard
							icon={<HygoIcons.NozzlePressure width={24} height={24} fill={COLORS.TANGERINE[100]} />}
							label={t("screens.equipmentEdit.nozzle.pressure")}
							disabled={
								!isNozzleTypeCompleted || !isNozzleCharacteristicsCompleted || !isNozzleSpeedCompleted
							}
							checked={isNozzlePressureCompleted}
						>
							<QuantitySelector
								value={nozzle?.pressure}
								step={0.1}
								onValueChange={handlePressureChange}
								unit={t("common.units.bar")}
							/>
						</EquipmentCard>
					</ScrollView>

					<View style={styles.btnContainer}>
						<BaseButton
							loading={submitting}
							color={COLORS.LAKE}
							disabled={!isAllNozzleParamsCompleted}
							onPress={isNewNozzle ? handleCreateNozzle : handleUpdateNozzle}
						>
							{isNewNozzle
								? t("screens.equipmentEdit.createButton")
								: t("screens.equipmentEdit.updateButton")}
						</BaseButton>
					</View>
				</SafeArea>
			</KeyboardShift>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	inputTextStyle: {
		textAlign: "center",
	},
	characteristicsContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	inputName: {
		flex: 8,
	},
	characteristicTitle: {
		marginBottom: 4,
		color: COLORS.LAKE[100],
	},

	btnContainer: {
		paddingHorizontal: 20,
		backgroundColor: COLORS.WHITE[100],
	},
});

export default EquipmentEditScreen;
