import { useContext, useEffect, useState } from "react";
import { getCoopUsers } from "@Api/hygoApi";
import { AuthContext } from "@Context/AuthContext";
import { coopUsertype } from "@Types/user.types";
import { sortArrayByAlphabet } from "@Utils/sortArrayByAlphabet";

interface UseCoopUserReturnType {
	coopUsers: coopUsertype[];
}
const useCoopUsers = (): UseCoopUserReturnType => {
	const { admin } = useContext(AuthContext);
	const [coopUsers, setCoopUsers] = useState<coopUsertype[]>([]);

	useEffect(() => {
		const getCoopsList = async (): Promise<void> => {
			try {
				const fetchedUsers = await getCoopUsers();
				const fetchedUsersSorted = fetchedUsers?.sort(sortArrayByAlphabet("firstName"));
				setCoopUsers(fetchedUsersSorted);
			} catch (e) {
				setCoopUsers([]);
				throw e;
			}
		};
		if (admin) getCoopsList();
	}, [admin]);

	return {
		coopUsers,
	};
};

export default useCoopUsers;
