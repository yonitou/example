import { useContext, useMemo } from "react";
import { UserContext } from "@Context/UserContext";
import HygoIcons from "@Icons/HygoIcons";
import { useTranslation } from "react-i18next";
import Dropdown from "@Components/Dropdown";
import { useFeature } from "flagged";
import { TourGuideZone } from "rn-tourguide";
import ConditionalWrapper from "@Components/ConditionalWrapper";
import { featuresEnum } from "@Types/feature.types";

interface FarmSelectorProps {
	height: number;
}

const FarmSelector = ({ height }: FarmSelectorProps): JSX.Element => {
	const { t } = useTranslation();
	const { defaultFarm, farms, updateDefaultFarm } = useContext(UserContext);
	const hasFarms = useFeature(featuresEnum.FARM_WEATHER);
	const data = useMemo(() => farms?.map((f) => ({ label: f.name, value: f.id.toString() })), [farms]);

	const onSelectFarm = async (item: { value: string; label: string }): Promise<void> => {
		updateDefaultFarm(parseInt(item.value, 10));
	};

	return (
		<ConditionalWrapper
			condition={!!hasFarms}
			wrapper={(children) => (
				<TourGuideZone zone={3} text={t("screens.onboarding.steps.farm")} borderRadius={4}>
					{children}
				</TourGuideZone>
			)}
		>
			<Dropdown
				value={defaultFarm?.id?.toString()}
				height={height}
				onSelect={onSelectFarm}
				disabled={!hasFarms || !defaultFarm}
				Icon={HygoIcons.Barn}
				placeholder={t("components.farmSelector.placeholder")}
				theme="dark"
				data={data}
			/>
		</ConditionalWrapper>
	);
};

export default FarmSelector;
