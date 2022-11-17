import { useContext, useMemo } from "react";
import { AuthContext } from "@Context/AuthContext";
import { UserContext } from "@Context/UserContext";
import { useTranslation } from "react-i18next";
import Dropdown from "@Components/Dropdown";
import HygoIcons from "@Icons/HygoIcons";

const UserSelector = (): JSX.Element => {
	const { t } = useTranslation();
	const { signInAsUser, user } = useContext(AuthContext);
	const { coopUsers } = useContext(UserContext);

	const onSelectUser = async (item: { value: string; label: string }): Promise<void> => {
		signInAsUser(parseInt(item.value, 10));
	};

	const coopUsersList = useMemo(
		() =>
			coopUsers?.map((coopUser) => ({
				value: coopUser.id.toString(),
				label: `${coopUser.firstName} ${coopUser.lastName}`,
			})),
		[coopUsers]
	);

	return (
		<Dropdown
			value={user?.userId?.toString()}
			onSelect={onSelectUser}
			theme="dark"
			placeholder={t("components.userSelector.placeholder")}
			Icon={HygoIcons.User}
			data={coopUsersList}
		/>
	);
};

export default UserSelector;
