import { updateSoil } from "@Api/hygoApi";
import Dropdown from "@Components/Dropdown";
import { AuthContext } from "@Context/AuthContext";
import { soilEnum, soilList } from "@Types/soil.types";
import { useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";

const SoilSelector = (): JSX.Element => {
	const { t } = useTranslation();
	const { user, fetchUser } = useContext(AuthContext);
	const soilListData = useMemo(() => soilList.map((s) => ({ label: t(`common.soils.${s}`), value: s })), [t]);

	const onSelectSoil = async (item: { value: string; label: string }): Promise<void> => {
		await updateSoil(item.value as soilEnum);
		await fetchUser();
	};

	return (
		<Dropdown
			value={user?.equipments?.soil}
			onSelect={onSelectSoil}
			placeholder={t("components.soilSelector.placeholder")}
			theme="light"
			data={soilListData}
		/>
	);
};

export default SoilSelector;
