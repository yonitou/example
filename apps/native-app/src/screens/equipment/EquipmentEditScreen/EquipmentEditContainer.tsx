import { useState, useContext, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { nozzleColorsEnum, nozzleFamilyEnum, nozzleType } from "@Types/nozzle.types";
import { ModalsContext } from "@Context/ModalContext";
import { addNozzle, deleteNozzle, updateNozzle, setDefaultNozzle } from "@Api/hygoApi";
import { AuthContext } from "@Context/AuthContext";
import { UserContext } from "@Context/UserContext";
import COLORS from "@Constants/palette";
import { SnackbarContext, SnackTypeEnum } from "@Context/SnackBarContext";
import { UserStatusEnum } from "@Types/auth.types";
import { EquipmentEditContainerProps } from "./screen.types";
import EquipmentEditScreen from "./EquipmentEditScreen";

const EquipmentEditContainer = ({ navigation, route }: EquipmentEditContainerProps): JSX.Element => {
	const { t } = useTranslation();
	const { setColorSelectorModalProps, setConfirmationModalProps, setNozzleHeightSelectorModalProps } =
		useContext(ModalsContext);
	const { fetchNozzles } = useContext(UserContext);
	const { showSnackbar } = useContext(SnackbarContext);
	const { status, fetchUser } = useContext(AuthContext);
	const [nozzle, setNozzle] = useState<nozzleType>(
		route?.params?.nozzle ||
			({
				name: t("screens.equipmentEdit.nozzleDefaultName"),
				height: 70,
				color: nozzleColorsEnum.BLUE,
			} as nozzleType)
	);
	const [submitting, setSubmitting] = useState<boolean>(false);

	const lastNozzle = route?.params?.lastNozzle;
	const fromModulation = route.params?.fromModulation;
	const fromReport = route.params?.fromReport;

	const handleColorClick = (): void =>
		setColorSelectorModalProps({
			visibility: true,
			props: {
				onColorChange: (color: nozzleColorsEnum) => setNozzle((prev) => ({ ...prev, color })),
			},
		});

	const handleHeightClick = (): void =>
		setNozzleHeightSelectorModalProps({
			visibility: true,
			props: {
				defaultValue: nozzle?.height,
				setInput: (height: number) => setNozzle((prev) => ({ ...prev, height })),
			},
		});

	const handleDeleteNozzle = async (): Promise<void> => {
		await deleteNozzle(nozzle?.id);
		await fetchNozzles();
		navigation.goBack();
	};

	const handleChangeName = (name: string): void => {
		setNozzle((prev) => ({ ...prev, name }));
	};

	const handleCreateNozzle = async (): Promise<void> => {
		const firstSetup = status === UserStatusEnum.NEED_EQUIPMENT;
		setSubmitting(true);
		try {
			const { id } = await addNozzle({ ...nozzle });
			await fetchNozzles();
			if (fromModulation || fromReport || firstSetup) {
				await setDefaultNozzle(id);
				await fetchUser();
				if (fromReport || fromModulation) route.params.nozzleAddCallback(id.toString());
			}

			navigation.goBack();
			showSnackbar(t("common.snackbar.createNozzle.success"), SnackTypeEnum.OK);
		} catch (e) {
			setSubmitting(false);
			showSnackbar(t("common.snackbar.createNozzle.error"), SnackTypeEnum.ERROR);
		}
	};

	const handleUpdateNozzle = async (): Promise<void> => {
		setSubmitting(true);
		try {
			await updateNozzle(nozzle);
			await fetchNozzles();

			navigation.goBack();
			showSnackbar(t("common.snackbar.updateNozzle.success"), SnackTypeEnum.OK);
		} catch (e) {
			setSubmitting(false);
			showSnackbar(t("common.snackbar.createNozzle.error"), SnackTypeEnum.ERROR);
		}
	};

	const handleFamilyClick = (family: nozzleFamilyEnum): void => setNozzle((prev) => ({ ...prev, family }));

	const onGoBack = (): void => {
		setConfirmationModalProps({
			visibility: true,
			props: {
				title: t("modals.leaveNozzleScreen.title"),
				confirmLabel: t("common.button.yes"),
				dismissLabel: t("common.button.no"),
				btnColorPalette: COLORS.LAKE,
				handleConfirm: () => navigation.goBack(),
			},
		});
	};

	const confirmDeleteNozzle = (): void => {
		setConfirmationModalProps({
			visibility: true,
			props: {
				title: t("modals.deleteNozzle.title"),
				confirmLabel: t("common.button.yes"),
				dismissLabel: t("common.button.no"),
				btnColorPalette: COLORS.GASPACHO,
				handleConfirm: handleDeleteNozzle,
			},
		});
	};

	const handleSpeedChange = useCallback((speed: number): void => setNozzle((prev) => ({ ...prev, speed })), []);

	const handlePressureChange = useCallback(
		(pressure: number): void => setNozzle((prev) => ({ ...prev, pressure })),
		[]
	);

	return (
		<EquipmentEditScreen
			lastNozzle={lastNozzle}
			submitting={submitting}
			nozzle={nozzle}
			onGoBack={onGoBack}
			handleFamilyClick={handleFamilyClick}
			handleChangeName={handleChangeName}
			handleColorClick={handleColorClick}
			handleHeightClick={handleHeightClick}
			handleSpeedChange={handleSpeedChange}
			handlePressureChange={handlePressureChange}
			handleCreateNozzle={handleCreateNozzle}
			handleUpdateNozzle={handleUpdateNozzle}
			handleDeleteNozzle={confirmDeleteNozzle}
		/>
	);
};

export default EquipmentEditContainer;
