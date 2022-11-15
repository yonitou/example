import { useContext, useEffect, useState } from "react";
import { getCoopUsers } from "@Api/api";
import { AuthContext } from "@Context/AuthContext";
import { coopUsertype } from "@Types/user.types";

interface UseCoopUserReturnType {
	coopUsers: coopUsertype[];
}
export const useCoopUsers = (): UseCoopUserReturnType => {
	const { admin } = useContext(AuthContext);
	const [coopUsers, setCoopUsers] = useState<coopUsertype[]>([]);

	useEffect(() => {
		const getCoopsUsersList = async (): Promise<void> => {
			const fetchedUsers = await getCoopUsers();
			const fetchedUsersSorted = fetchedUsers?.sort((a, b) => a.firstName.localeCompare(b.firstName));
			setCoopUsers(fetchedUsersSorted);
		};
		if (admin) getCoopsUsersList();
	}, [admin]);

	return {
		coopUsers,
	};
};
