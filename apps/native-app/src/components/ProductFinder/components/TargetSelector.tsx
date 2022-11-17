import HygoIcons from "@Icons/HygoIcons";
import { targetType } from "@Types/target.types";
import BaseButton from "@Components/BaseButton";
import TargetIcon from "@Components/TargetIcon";
import COLORS from "@Constants/palette";
import { useCallback, useContext, useEffect, useState } from "react";
import { ModalsContext } from "@Context/ModalContext";
import { useTranslation } from "react-i18next";

interface TargetSelectorProps {
	selectedTargets: targetType[];
	onSelectTargets: (targets: targetType[]) => void;
	targetsModalOpened?: boolean;
}

const TargetSelector = ({ selectedTargets, onSelectTargets, targetsModalOpened }: TargetSelectorProps): JSX.Element => {
	const { t } = useTranslation();
	const { setTargetSelectorModalProps } = useContext(ModalsContext);
	const [modalOpenedByDefault, setModalOpenedByDefault] = useState<boolean>(targetsModalOpened);
	const targetToDisplay = selectedTargets?.[0];
	const hasSelectedTargets = selectedTargets?.length > 0;

	const getLabel = (): string => {
		if (!hasSelectedTargets) return t("components.productFinder.components.targetSelector.addTarget");
		if (selectedTargets?.length > 1) return t("components.productFinder.components.targetSelector.multiTargets");
		return targetToDisplay?.name;
	};

	const openTargetsModal = useCallback((): void => {
		setTargetSelectorModalProps({
			visibility: true,
			props: {
				initialTargets: selectedTargets,
				onSubmit: onSelectTargets,
			},
		});
	}, [selectedTargets, setTargetSelectorModalProps, onSelectTargets]);

	useEffect(() => {
		if (modalOpenedByDefault) {
			openTargetsModal();
			setModalOpenedByDefault(false);
		}
	}, [modalOpenedByDefault, openTargetsModal]);

	return (
		<BaseButton
			color={COLORS.TANGERINE}
			fillIcon
			outlined={!selectedTargets?.length}
			centered={false}
			onPress={openTargetsModal}
			Icon={
				!hasSelectedTargets || selectedTargets?.length > 1
					? HygoIcons.Aim
					: ({ fill, width, height }) =>
							TargetIcon({
								target: targetToDisplay,
								fill: fill.toString(),
								width: parseInt(width.toString(), 10),
								height: parseInt(height.toString(), 10),
							})
			}
		>
			{getLabel()}
		</BaseButton>
	);
};

export default TargetSelector;
